import { NextResponse } from 'next/server'
import {
  deleteDashboard,
  isValidPreviewImage,
  savePreviewImage,
  slugify,
  updateDashboard,
} from '@/lib/systems-store'
import { getSession } from '@/lib/session'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const { id } = await params
  const formData = await request.formData().catch(() => null)
  if (!formData) {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }

  const name = formData.get('name')
  const description = formData.get('description')
  const href = formData.get('href')

  if (typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'O nome é obrigatório.' }, { status: 400 })
  }

  if (typeof href === 'string' && href.trim()) {
    try {
      const url = new URL(href.trim())
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        return NextResponse.json({ error: 'Link inválido.' }, { status: 400 })
      }
    } catch {
      return NextResponse.json({ error: 'Link inválido.' }, { status: 400 })
    }
  }

  const trimmedName = name.trim()
  let previewImage: string | undefined

  const image = formData.get('image')
  if (image instanceof File && image.size > 0) {
    if (!isValidPreviewImage(image)) {
      return NextResponse.json(
        { error: 'Imagem inválida. Use JPG, PNG, WEBP ou GIF até 5MB.' },
        { status: 400 },
      )
    }
    previewImage = await savePreviewImage('dashboards', slugify(trimmedName), image)
  }

  const dashboard = await updateDashboard(id, {
    name: trimmedName,
    description: typeof description === 'string' ? description.trim() : '',
    href: typeof href === 'string' ? href.trim() : undefined,
    previewImage,
  })

  if (!dashboard) {
    return NextResponse.json({ error: 'Dashboard não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ dashboard })
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
  const removed = await deleteDashboard(id)

  if (!removed) {
    return NextResponse.json({ error: 'Dashboard não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
