import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { createPasswordResetToken, findUserById } from '@/lib/auth-store'
import { sendMail } from '@/lib/mailer'

// Mesma base usada no "esqueci a senha" — nunca construir a partir de
// request.url (atrás de um proxy reverso isso aponta para o container).
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const { id } = await params
  const target = findUserById(id)
  if (!target) {
    return NextResponse.json({ error: 'Utilizador não encontrado.' }, { status: 404 })
  }

  // Em vez de gerar uma senha temporária e devolvê-la na resposta (fica
  // sujeita a qualquer log que capture corpos de pedidos/respostas),
  // envia-se um link de reposição de uso único — o mesmo mecanismo do
  // fluxo público de "esqueci a senha".
  const token = createPasswordResetToken(target.id)
  const resetUrl = `${PORTAL_URL}/repor-senha?token=${token}`
  try {
    await sendMail({
      to: target.email,
      subject: 'A sua senha foi reposta — Portal Songhai',
      text: `Olá ${target.name},\n\nUm administrador repôs a sua senha. Defina uma nova aqui (válido por 1 hora):\n\n${resetUrl}\n\nSe não esperava este e-mail, contacte um administrador.`,
    })
  } catch (err) {
    console.error('[reset-password admin] Falha ao enviar e-mail:', err)
    return NextResponse.json({ error: 'Não foi possível enviar o e-mail de reposição.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, email: target.email })
}
