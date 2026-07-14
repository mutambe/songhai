import { NextResponse } from 'next/server'
import { enableTotp, findUserById, getTotpSecret, updateLastLogin } from '@/lib/auth-store'
import { createSessionCookie, resolveTwoFactorContext } from '@/lib/session'
import { verifyTotpCode } from '@/lib/two-factor'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const token = typeof body?.token === 'string' ? body.token : undefined
  const code = typeof body?.code === 'string' ? body.code : ''

  const context = await resolveTwoFactorContext(token)
  if (!context) {
    return NextResponse.json({ error: 'Sessão expirada. Entre novamente.' }, { status: 401 })
  }

  const user = findUserById(context.userId)
  const secret = getTotpSecret(context.userId)
  if (!user || !secret) {
    return NextResponse.json({ error: 'Configure primeiro a aplicação autenticadora.' }, { status: 400 })
  }

  if (!code || !verifyTotpCode(user.email, secret, code)) {
    return NextResponse.json({ error: 'Código inválido.' }, { status: 400 })
  }

  enableTotp(user.id)

  if (context.mode === 'login') {
    updateLastLogin(user.id)
    await createSessionCookie({ sub: user.id, name: user.name, email: user.email, role: user.role })
    return NextResponse.json({ ok: true, sessionCreated: true })
  }

  return NextResponse.json({ ok: true })
}
