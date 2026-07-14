import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Serve os dashboards HTML enviados por upload a partir do disco em cada
// pedido. Não pode depender da pasta "public" estática: em produção
// (build standalone), o servidor só serve os ficheiros que já existiam em
// "public" no momento em que arrancou — um upload feito depois fica
// invisível para essa rota estática e devolve 404.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params

  // Só nomes de ficheiro simples (sem barras nem "..") — protege contra
  // path traversal.
  if (!/^[a-z0-9-]+\.html?$/i.test(filename)) {
    return NextResponse.json({ error: 'Ficheiro inválido.' }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), 'public', 'dashboards', filename)
  try {
    const content = await fs.readFile(filePath)
    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch {
    return NextResponse.json({ error: 'Dashboard não encontrado.' }, { status: 404 })
  }
}
