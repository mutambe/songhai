import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Servido por rota própria (lê o disco a cada pedido), não pela pasta
// "public" estática: em produção (build standalone), o servidor só serve
// ficheiros que já existiam em "public" no momento em que arrancou —
// imagens enviadas por upload depois disso dariam 404. Mesmo problema já
// corrigido no songhai-portal para dashboards/previews.
const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params

  if (!/^[a-z0-9-]+\.(jpe?g|png|webp|gif)$/i.test(filename)) {
    return NextResponse.json({ error: 'Ficheiro inválido.' }, { status: 400 })
  }

  const ext = path.extname(filename).toLowerCase()
  const filePath = path.join(process.cwd(), 'data', 'blog-images', filename)
  try {
    const content = await fs.readFile(filePath)
    return new NextResponse(content, {
      headers: { 'Content-Type': CONTENT_TYPES[ext] || 'application/octet-stream' },
    })
  } catch {
    return NextResponse.json({ error: 'Imagem não encontrada.' }, { status: 404 })
  }
}
