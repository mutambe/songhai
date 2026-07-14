import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/mailer'
import { isRateLimited, registerFailedAttempt } from '@/lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { error: 'Demasiados pedidos. Tente novamente dentro de alguns minutos.' },
      { status: 429 },
    )
  }
  registerFailedAttempt(`contact:${ip}`) // reutilizado como contador genérico por IP

  const body = await request.json().catch(() => null)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const company = typeof body?.company === 'string' ? body.company.trim() : ''
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Preencha todos os campos obrigatórios.' }, { status: 400 })
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
  }

  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL
  if (!notifyTo) {
    console.error('[contacto] CONTACT_NOTIFY_EMAIL não está definida.')
    return NextResponse.json({ error: 'Não foi possível enviar a mensagem.' }, { status: 500 })
  }

  try {
    await sendMail({
      to: notifyTo,
      subject: `Novo contacto do site — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\nEmpresa: ${company || '(não indicado)'}\n\nMensagem:\n${message}`,
      replyTo: email,
    })

    await sendMail({
      to: email,
      subject: 'Recebemos a sua mensagem — SONGHAI',
      text: `Olá ${name},\n\nObrigado pelo seu contacto. A equipa Songhai vai responder num prazo de 24 horas.\n\nA sua mensagem:\n${message}`,
    }).catch((err) => console.error('[contacto] Falha ao enviar confirmação ao visitante:', err))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contacto] Falha ao enviar e-mail:', err)
    return NextResponse.json({ error: 'Não foi possível enviar a mensagem. Tente novamente.' }, { status: 500 })
  }
}
