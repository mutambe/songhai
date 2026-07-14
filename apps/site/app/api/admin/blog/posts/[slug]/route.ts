import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { deletePost, getPost, updatePost } from '@/lib/blog-store'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 })
  }
  return NextResponse.json({ post })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const admin = await getAdminSession()
  if (!admin) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const { slug } = await params
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }
  // O slug identifica o URL do artigo e não pode ser alterado por esta rota.
  delete (body as Record<string, unknown>).slug

  const post = await updatePost(slug, body, admin.name)
  if (!post) {
    return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 })
  }
  return NextResponse.json({ post })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const { slug } = await params
  const removed = await deletePost(slug)
  if (!removed) {
    return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
