import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { setUserStatus } from '@/lib/auth-store'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)
  const action = body?.action

  if (action !== 'approve' && action !== 'reject') {
    return NextResponse.json({ error: 'Ação inválida.' }, { status: 400 })
  }

  const user = setUserStatus(id, action === 'approve' ? 'approved' : 'rejected')
  if (!user) {
    return NextResponse.json({ error: 'Utilizador não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
