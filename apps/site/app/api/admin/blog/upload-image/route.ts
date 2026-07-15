import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin-auth'
import { isValidBlogImage, saveBlogImage } from '@/lib/blog-images'

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const formData = await request.formData().catch(() => null)
  const file = formData?.get('image')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Selecione uma imagem.' }, { status: 400 })
  }
  if (!isValidBlogImage(file)) {
    return NextResponse.json(
      { error: 'Imagem inválida. Use JPG, PNG, WEBP ou GIF até 5MB.' },
      { status: 400 },
    )
  }

  const url = await saveBlogImage(file)
  return NextResponse.json({ url })
}
