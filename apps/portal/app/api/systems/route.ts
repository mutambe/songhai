import { NextResponse } from 'next/server'
import {
  addInternalSystem,
  isValidPreviewImage,
  listInternalSystems,
  savePreviewImage,
  slugify,
  validateHref,
} from '@/lib/systems-store'
import { getSession, hasPermission } from '@/lib/session'

export async function GET() {
  const session = await getSession()
  if (!session || !hasPermission(session, 'canViewSystems')) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const systems = await listInternalSystems()
  return NextResponse.json({ systems })
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

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

  const validHref = validateHref(href.trim())
  if (!validHref) {
    return NextResponse.json({ error: 'Link inválido.' }, { status: 400 })
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

  const system = await addInternalSystem({
    name: trimmedName,
    description: typeof description === 'string' ? description.trim() : '',
    href: validHref,
    previewImage,
  })

  return NextResponse.json({ system }, { status: 201 })
}
