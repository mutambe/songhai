import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import {
  countAdmins,
  deleteUser,
  findUserById,
  setUserPermissions,
  setUserRole,
} from '@/lib/auth-store'

export async function PATCH(
  request: Request,
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

  const body = await request.json().catch(() => null)

  if (body?.role !== undefined) {
    if (body.role !== 'admin' && body.role !== 'member') {
      return NextResponse.json({ error: 'Role inválida.' }, { status: 400 })
    }
    if (target.role === 'admin' && body.role !== 'admin' && countAdmins() <= 1) {
      return NextResponse.json(
        { error: 'Tem de haver pelo menos um administrador.' },
        { status: 400 },
      )
    }
    if (id === session.sub && body.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não pode remover a sua própria permissão de administrador.' },
        { status: 400 },
      )
    }
    setUserRole(id, body.role)
  }

  if (body?.permissions !== undefined) {
    const p = body.permissions
    setUserPermissions(id, {
      canViewMetrics: !!p.canViewMetrics,
      canViewSystems: !!p.canViewSystems,
      canViewDashboards: !!p.canViewDashboards,
    })
  }

  const updated = findUserById(id)!
  return NextResponse.json({
    user: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      status: updated.status,
      createdAt: updated.createdAt,
      lastLoginAt: updated.lastLoginAt,
      permissions: updated.permissions,
    },
  })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const { id } = await params
  if (id === session.sub) {
    return NextResponse.json({ error: 'Não pode remover a sua própria conta.' }, { status: 400 })
  }

  const target = findUserById(id)
  if (target?.role === 'admin' && countAdmins() <= 1) {
    return NextResponse.json(
      { error: 'Tem de haver pelo menos um administrador.' },
      { status: 400 },
    )
  }

  const deleted = deleteUser(id)
  if (!deleted) {
    return NextResponse.json({ error: 'Utilizador não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
