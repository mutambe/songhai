import { NextResponse } from 'next/server'
import {
  deleteInternalSystem,
  isValidPreviewImage,
  savePreviewImage,
  slugify,
  updateInternalSystem,
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

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof href !== 'string' ||
    !href.trim()
  ) {
    return NextResponse.json(
      { error: 'Nome e link são obrigatórios.' },
      { status: 400 },
    )
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
    previewImage = await savePreviewImage('systems', slugify(trimmedName), image)
  }

  const system = await updateInternalSystem(id, {
    name: trimmedName,
    description: typeof description === 'string' ? description.trim() : '',
    href: href.trim(),
    previewImage,
  })

  if (!system) {
    return NextResponse.json({ error: 'Sistema não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ system })
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
  const removed = await deleteInternalSystem(id)

  if (!removed) {
    return NextResponse.json({ error: 'Sistema não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
