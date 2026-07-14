import { NextResponse } from 'next/server'
import { findUserById, forceChangePassword, updateLastLogin } from '@/lib/auth-store'
import { verifyPreAuthToken } from '@/lib/session-core'
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

  // 2FA está temporariamente desativado — por configurar mais tarde.
  updateLastLogin(user.id)
  await createSessionCookie({ sub: user.id, name: user.name, email: user.email, role: user.role })
  return NextResponse.json({ ok: true })
}
