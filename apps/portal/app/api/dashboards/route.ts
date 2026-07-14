import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import {
  addDashboard,
  isValidPreviewImage,
  listDashboards,
  savePreviewImage,
  slugify,
} from '@/lib/systems-store'
import { getSession, hasPermission } from '@/lib/session'

const DASHBOARDS_DIR = path.join(process.cwd(), 'public', 'dashboards')
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function GET() {
  const session = await getSession()
  if (!session || !hasPermission(session, 'canViewDashboards')) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const dashboards = await listDashboards()
  return NextResponse.json({ dashboards })
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

  const type = formData.get('type')
  const name = formData.get('name')
  const description = formData.get('description')

  if (
    (type !== 'powerbi' && type !== 'html') ||
    typeof name !== 'string' ||
    !name.trim()
  ) {
    return NextResponse.json(
      { error: 'Nome e tipo são obrigatórios.' },
      { status: 400 },
    )
  }

  const trimmedName = name.trim()
  const trimmedDescription = typeof description === 'string' ? description.trim() : ''

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

  if (type === 'powerbi') {
    const href = formData.get('href')
    if (typeof href !== 'string' || !href.trim()) {
      return NextResponse.json(
        { error: 'O link do PowerBI é obrigatório.' },
        { status: 400 },
      )
    }
    let url: URL
    try {
      url = new URL(href.trim())
    } catch {
      return NextResponse.json({ error: 'Link inválido.' }, { status: 400 })
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return NextResponse.json({ error: 'Link inválido.' }, { status: 400 })
    }

    const dashboard = await addDashboard({
      name: trimmedName,
      description: trimmedDescription,
      type: 'powerbi',
      href: url.toString(),
      previewImage,
    })
    return NextResponse.json({ dashboard }, { status: 201 })
  }

  // type === 'html'
  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'Selecione um ficheiro HTML.' },
      { status: 400 },
    )
  }
  if (!file.name.toLowerCase().endsWith('.html') && !file.name.toLowerCase().endsWith('.htm')) {
    return NextResponse.json(
      { error: 'O ficheiro tem de ser .html ou .htm.' },
      { status: 400 },
    )
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'O ficheiro excede o limite de 5MB.' },
      { status: 400 },
    )
  }

  await fs.mkdir(DASHBOARDS_DIR, { recursive: true })
  const slug = `${slugify(trimmedName)}-${Date.now().toString(36)}`
  const filename = `${slug}.html`
  const bytes = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(path.join(DASHBOARDS_DIR, filename), bytes)

  const dashboard = await addDashboard({
    name: trimmedName,
    description: trimmedDescription,
    type: 'html',
    href: `/dashboards/${filename}`,
    previewImage,
  })
  return NextResponse.json({ dashboard }, { status: 201 })
}
