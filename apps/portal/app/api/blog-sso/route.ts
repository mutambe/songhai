import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { createBlogSsoToken } from '@/lib/sso'

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://songhai.cc'

export async function GET(request: Request) {
  const session = await getSession()
  if (!session || session.role !== 'admin') {
    return NextResponse.redirect(new URL('/portal', request.url))
  }

  const token = createBlogSsoToken({
    sub: session.sub,
    name: session.name,
    email: session.email,
  })

  return NextResponse.redirect(`${MAIN_SITE_URL}/admin/blog/sso?token=${token}`)
}
