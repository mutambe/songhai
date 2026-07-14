import { NextResponse } from 'next/server'
import { consumeEmailOtp, enableEmail2fa, findUserById, updateLastLogin } from '@/lib/auth-store'
import { createSessionCookie, resolveTwoFactorContext } from '@/lib/session'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const token = typeof body?.token === 'string' ? body.token : undefined
  const code = typeof body?.code === 'string' ? body.code : ''

  const context = await resolveTwoFactorContext(token)
  if (!context) {
    return NextResponse.json({ error: 'Sessão expirada. Entre novamente.' }, { status: 401 })
  }

  const user = findUserById(context.userId)
  if (!user) {
    return NextResponse.json({ error: 'Utilizador não encontrado.' }, { status: 404 })
  }

  if (!code || !consumeEmailOtp(user.id, code)) {
    return NextResponse.json({ error: 'Código inválido ou expirado.' }, { status: 400 })
  }

  enableEmail2fa(user.id)

  if (context.mode === 'login') {
    updateLastLogin(user.id)
    await createSessionCookie({ sub: user.id, name: user.name, email: user.email, role: user.role })
    return NextResponse.json({ ok: true, sessionCreated: true })
  }

  return NextResponse.json({ ok: true })
}
