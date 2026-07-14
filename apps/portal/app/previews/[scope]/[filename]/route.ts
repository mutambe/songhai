import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Mesmo motivo do /app/dashboards/[filename]/route.ts: imagens de
// pré-visualização enviadas depois do arranque do servidor não são vistas
// pela pasta "public" estática em produção (build standalone).
const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ scope: string; filename: string }> },
) {
  const { scope, filename } = await params

  if (scope !== 'systems' && scope !== 'dashboards') {
    return NextResponse.json({ error: 'Inválido.' }, { status: 400 })
  }
  if (!/^[a-z0-9-]+\.(jpe?g|png|webp|gif)$/i.test(filename)) {
    return NextResponse.json({ error: 'Ficheiro inválido.' }, { status: 400 })
  }

  const ext = path.extname(filename).toLowerCase()
  const filePath = path.join(process.cwd(), 'public', 'previews', scope, filename)
  try {
    const content = await fs.readFile(filePath)
    return new NextResponse(content, {
      headers: { 'Content-Type': CONTENT_TYPES[ext] || 'application/octet-stream' },
    })
  } catch {
    return NextResponse.json({ error: 'Imagem não encontrada.' }, { status: 404 })
  }
}
