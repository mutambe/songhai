import { NextResponse } from 'next/server'
import { ALLOWED_EMAIL_DOMAIN, createUser, findUserByEmail } from '@/lib/auth-store'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Preencha todos os campos obrigatórios.' }, { status: 400 })
  }
  if (!email.endsWith(ALLOWED_EMAIL_DOMAIN)) {
    return NextResponse.json(
      { error: `O registo está limitado a e-mails ${ALLOWED_EMAIL_DOMAIN}.` },
      { status: 400 },
    )
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'A senha deve ter pelo menos 8 caracteres.' }, { status: 400 })
  }
  if (findUserByEmail(email)) {
    return NextResponse.json({ error: 'Já existe uma conta com este e-mail.' }, { status: 409 })
  }

  const user = createUser({ name, email, password })

  return NextResponse.json({ status: user.status }, { status: 201 })
}
