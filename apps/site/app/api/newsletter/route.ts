import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/mailer'
import { addSubscriber } from '@/lib/subscribers'
import { isRateLimited, registerFailedAttempt } from '@/lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(`newsletter:${ip}`)) {
    return NextResponse.json(
      { error: 'Demasiados pedidos. Tente novamente dentro de alguns minutos.' },
      { status: 429 },
    )
  }
  registerFailedAttempt(`newsletter:${ip}`)

  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
  }

  const result = await addSubscriber(email)

  if (result === 'added') {
    const notifyTo = process.env.CONTACT_NOTIFY_EMAIL
    if (notifyTo) {
      sendMail({
        to: notifyTo,
        subject: 'Nova subscrição da newsletter',
        text: `Novo subscritor: ${email}`,
      }).catch((err) => console.error('[newsletter] Falha ao notificar:', err))
    }

    sendMail({
      to: email,
      subject: 'Subscrição confirmada — SONGHAI',
      text: 'Obrigado por subscrever! Vai receber artigos práticos sobre IA e automação diretamente no seu e-mail.',
    }).catch((err) => console.error('[newsletter] Falha ao enviar confirmação:', err))
  }

  return NextResponse.json({ ok: true })
}
