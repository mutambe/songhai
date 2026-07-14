import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { listPendingUsers } from '@/lib/auth-store'

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const users = listPendingUsers().map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt,
  }))

  return NextResponse.json({ users })
}
