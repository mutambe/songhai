import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/mailer'
import { isRateLimited, registerFailedAttempt } from '@/lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Link público da Calendly — não é sensível, pode ficar hardcoded.
const CALENDLY_URL = 'https://calendly.com/songhai-limitada/30min'

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(`diagnostico:${ip}`)) {
    return NextResponse.json(
      { error: 'Demasiados pedidos. Tente novamente dentro de alguns minutos.' },
      { status: 429 },
    )
  }
  registerFailedAttempt(`diagnostico:${ip}`)

  const body = await request.json().catch(() => null)
  const name = asString(body?.name)
  const email = asString(body?.email)
  const company = asString(body?.company)
  const challenges = asStringArray(body?.challenges)
  const otherChallenge = asString(body?.otherChallenge)
  const sector = asString(body?.sector)
  const teamSize = asString(body?.teamSize)
  const preferredTime = asString(body?.preferredTime)

  if (!name || !email || !company) {
    return NextResponse.json({ error: 'Preencha todos os campos obrigatórios.' }, { status: 400 })
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
  }

  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL
  if (!notifyTo) {
    console.error('[diagnostico] CONTACT_NOTIFY_EMAIL não está definida.')
    return NextResponse.json({ error: 'Não foi possível enviar o pedido.' }, { status: 500 })
  }

  const allChallenges = [...challenges, ...(otherChallenge ? [`Outro: ${otherChallenge}`] : [])]

  try {
    await sendMail({
      to: notifyTo,
      subject: `Novo pedido de diagnóstico grátis — ${name} (${company})`,
      text: [
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `Empresa: ${company}`,
        `Setor: ${sector || '(não indicado)'}`,
        `Tamanho da equipa: ${teamSize || '(não indicado)'}`,
        `Horário preferido: ${preferredTime || '(não indicado)'}`,
        `Desafios: ${allChallenges.length ? allChallenges.join(', ') : '(não indicado)'}`,
      ].join('\n'),
      replyTo: email,
    })

    await sendMail({
      to: email,
      subject: 'Recebemos o seu pedido de diagnóstico grátis — SONGHAI',
      text: `Olá ${name},\n\nObrigado pelo interesse. Escolha o melhor horário para a conversa de 30 minutos aqui:\n${CALENDLY_URL}\n\nSem custo. Sem compromisso.`,
    }).catch((err) => console.error('[diagnostico] Falha ao enviar confirmação ao visitante:', err))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[diagnostico] Falha ao enviar e-mail:', err)
    return NextResponse.json({ error: 'Não foi possível enviar o pedido. Tente novamente.' }, { status: 500 })
  }
}
