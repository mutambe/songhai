import { NextResponse } from 'next/server'
import { consumePasswordResetToken, forceChangePassword } from '@/lib/auth-store'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const token = typeof body?.token === 'string' ? body.token : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!token || !password) {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'A senha deve ter pelo menos 8 caracteres.' }, { status: 400 })
  }

  const userId = consumePasswordResetToken(token)
  if (!userId) {
    return NextResponse.json({ error: 'Link inválido ou expirado.' }, { status: 400 })
  }

  forceChangePassword(userId, password)
  return NextResponse.json({ ok: true })
}
