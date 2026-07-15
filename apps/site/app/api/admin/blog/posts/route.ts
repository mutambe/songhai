import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import type { BlogPost } from '@/lib/blog'
import { createPost, listPosts } from '@/lib/blog-store'

function validatePost(body: unknown): body is Omit<BlogPost, 'slug'> & { slug?: string } {
  if (!body || typeof body !== 'object') return false
  const p = body as Record<string, unknown>
  return (
    typeof p.title === 'string' &&
    p.title.trim().length > 0 &&
    typeof p.excerpt === 'string' &&
    typeof p.category === 'string' &&
    Array.isArray(p.tags) &&
    (p.status === 'draft' || p.status === 'published') &&
    typeof p.publishedAt === 'string' &&
    typeof p.readingTime === 'string' &&
    typeof p.author === 'string' &&
    typeof p.gradient === 'string' &&
    typeof p.content === 'object' &&
    p.content !== null
  )
}

export async function GET() {
  const admin = await getAdminSession()
  if (!admin) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const posts = await listPosts()
  return NextResponse.json({ posts })
}

export async function POST(request: Request) {
  const admin = await getAdminSession()
  if (!admin) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const body = await request.json().catch(() => null)
  if (!validatePost(body)) {
    return NextResponse.json({ error: 'Dados do artigo inválidos.' }, { status: 400 })
  }

  try {
    const post = await createPost(body, admin.name)
    return NextResponse.json({ post }, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Não foi possível criar o artigo.' },
      { status: 400 },
    )
  }
}
