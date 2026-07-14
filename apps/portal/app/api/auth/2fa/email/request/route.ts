import { NextResponse } from 'next/server'
import { findUserById, setEmailOtp } from '@/lib/auth-store'
import { resolveTwoFactorContext } from '@/lib/session'
import { generateEmailCode } from '@/lib/two-factor'
import { sendMail } from '@/lib/mailer'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const token = typeof body?.token === 'string' ? body.token : undefined

  const context = await resolveTwoFactorContext(token)
  if (!context) {
    return NextResponse.json({ error: 'Sessão expirada. Entre novamente.' }, { status: 401 })
  }

  const user = findUserById(context.userId)
  if (!user) {
    return NextResponse.json({ error: 'Utilizador não encontrado.' }, { status: 404 })
  }

  const code = generateEmailCode()
  setEmailOtp(user.id, code)

  try {
    await sendMail({
      to: user.email,
      subject: 'O seu código de verificação — Portal Songhai',
      text: `Olá ${user.name},\n\nO seu código de verificação é: ${code}\n\nVálido por 10 minutos. Se não foi você a pedir isto, ignore este e-mail.`,
    })
  } catch (err) {
    console.error('[2fa-email] Falha ao enviar e-mail:', err)
    return NextResponse.json({ error: 'Não foi possível enviar o código. Tente novamente.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
