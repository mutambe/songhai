import { NextResponse } from 'next/server'
import { createPasswordResetToken, findUserByEmail } from '@/lib/auth-store'
import { sendMail } from '@/lib/mailer'

// Não usar `request.url`/origin como base do link: atrás de um proxy
// reverso (Traefik), o servidor pode ver o pedido através do endereço
// interno do container em vez do domínio público.
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

  if (!email) {
    return NextResponse.json({ error: 'Indique o seu e-mail.' }, { status: 400 })
  }

  const user = findUserByEmail(email)
  if (user && user.status === 'approved') {
    const token = createPasswordResetToken(user.id)
    const resetUrl = `${PORTAL_URL}/repor-senha?token=${token}`
    console.log(`[recuperar-senha] Pedido para ${email} — a enviar e-mail.`)
    await sendMail({
      to: email,
      subject: 'Repor a sua senha — Portal Songhai',
      text: `Olá ${user.name},\n\nPediu para repor a sua senha no Portal Songhai. Use o link abaixo (válido por 1 hora):\n\n${resetUrl}\n\nSe não foi você a pedir isto, ignore este e-mail.`,
    }).then(() => {
      console.log(`[recuperar-senha] E-mail enviado com sucesso para ${email}.`)
    }).catch((err) => console.error(`[recuperar-senha] Falha ao enviar e-mail para ${email}:`, err))
  } else {
    console.log(
      `[recuperar-senha] Pedido para ${email} ignorado — ${
        !user ? 'nenhuma conta com este e-mail' : `conta existe mas status é "${user.status}" (não "approved")`
      }.`,
    )
  }

  // Resposta idêntica quer o e-mail exista ou não, para não revelar contas registadas.
  return NextResponse.json({ ok: true })
}
