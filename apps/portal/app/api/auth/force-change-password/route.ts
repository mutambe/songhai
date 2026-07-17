import { NextResponse } from 'next/server'
import { findUserById, forceChangePassword, resolveNextAuthStep, updateLastLogin } from '@/lib/auth-store'
import { verifyPreAuthToken, signPreAuthToken } from '@/lib/session-core'
import { createSessionCookie } from '@/lib/session'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const token = typeof body?.token === 'string' ? body.token : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  const payload = token ? await verifyPreAuthToken(token) : null
  if (!payload || payload.step !== 'password-change') {
    return NextResponse.json({ error: 'Sessão de login expirada. Entre novamente.' }, { status: 401 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'A senha deve ter pelo menos 8 caracteres.' }, { status: 400 })
  }

  const user = findUserById(payload.sub)
  if (!user) {
    return NextResponse.json({ error: 'Utilizador não encontrado.' }, { status: 404 })
  }

  forceChangePassword(user.id, password)

  const next = resolveNextAuthStep(user)
  if (next.step === '2fa-enroll') {
    const enrollToken = await signPreAuthToken({ sub: user.id, step: '2fa-enroll' })
    return NextResponse.json({ step: '2fa-enroll', token: enrollToken })
  }
  if (next.step === '2fa-verify') {
    const verifyToken = await signPreAuthToken({ sub: user.id, step: '2fa-verify' })
    return NextResponse.json({ step: '2fa-verify', token: verifyToken, methods: next.methods })
  }

  updateLastLogin(user.id)
  await createSessionCookie({ sub: user.id, name: user.name, email: user.email, role: user.role })
  return NextResponse.json({ ok: true })
}
