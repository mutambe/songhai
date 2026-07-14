import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { listAllUsers } from '@/lib/auth-store'

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const users = listAllUsers().map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
    permissions: u.permissions,
  }))

  return NextResponse.json({ users })
}
