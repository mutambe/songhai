import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import {
  ALLOWED_EMAIL_DOMAIN,
  createUserByAdmin,
  findUserByEmail,
  listAllUsers,
  type UserRole,
} from '@/lib/auth-store'

function serializeUser(u: ReturnType<typeof listAllUsers>[number]) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
    permissions: u.permissions,
    twoFactorExempt: u.twoFactorExempt,
  }
}

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const users = listAllUsers().map(serializeUser)

  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const body = await request.json().catch(() => null)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const role: UserRole = body?.role === 'admin' ? 'admin' : 'member'

  if (!name || !email) {
    return NextResponse.json({ error: 'Preencha o nome e o e-mail.' }, { status: 400 })
  }
  if (!email.endsWith(ALLOWED_EMAIL_DOMAIN)) {
    return NextResponse.json(
      { error: `Só são permitidos e-mails ${ALLOWED_EMAIL_DOMAIN}.` },
      { status: 400 },
    )
  }
  if (findUserByEmail(email)) {
    return NextResponse.json({ error: 'Já existe uma conta com este e-mail.' }, { status: 409 })
  }

  const { user, tempPassword } = createUserByAdmin({ name, email, role })

  return NextResponse.json({ user: serializeUser(user), tempPassword }, { status: 201 })
}
