import { NextResponse } from 'next/server'
import { findUserByEmail, verifyPassword, updateLastLogin, resolveNextAuthStep } from '@/lib/auth-store'
import { signPreAuthToken } from '@/lib/session-core'
import { createSessionCookie } from '@/lib/session'
import { isRateLimited, registerFailedAttempt, clearAttempts } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!email || !password) {
    return NextResponse.json({ error: 'Preencha o e-mail e a senha.' }, { status: 400 })
  }

  if (isRateLimited(email)) {
    return NextResponse.json(
      { error: 'Demasiadas tentativas. Tente novamente dentro de alguns minutos.' },
      { status: 429 },
    )
  }

  const user = findUserByEmail(email)
  const valid = user ? verifyPassword(password, user.passwordHash) : false

  if (!user || !valid) {
    registerFailedAttempt(email)
    return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 })
  }

  if (user.status === 'pending') {
    return NextResponse.json(
      { error: 'A sua conta ainda aguarda aprovação de um administrador.' },
      { status: 403 },
    )
  }
  if (user.status === 'rejected') {
    return NextResponse.json({ error: 'O acesso a esta conta foi negado.' }, { status: 403 })
  }

  clearAttempts(email)

  if (user.mustChangePassword) {
    const token = await signPreAuthToken({ sub: user.id, step: 'password-change' })
    return NextResponse.json({ step: 'password-change', token })
  }

  const next = resolveNextAuthStep(user)
  if (next.step === '2fa-enroll') {
    const token = await signPreAuthToken({ sub: user.id, step: '2fa-enroll' })
    return NextResponse.json({ step: '2fa-enroll', token })
  }
  if (next.step === '2fa-verify') {
    const token = await signPreAuthToken({ sub: user.id, step: '2fa-verify' })
    return NextResponse.json({ step: '2fa-verify', token, methods: next.methods })
  }

  updateLastLogin(user.id)
  await createSessionCookie({ sub: user.id, name: user.name, email: user.email, role: user.role })
  return NextResponse.json({ ok: true })
}
