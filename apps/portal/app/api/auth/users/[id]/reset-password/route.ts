import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { adminResetPassword, findUserById } from '@/lib/auth-store'

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

  const tempPassword = adminResetPassword(id)
  return NextResponse.json({ tempPassword })
}
