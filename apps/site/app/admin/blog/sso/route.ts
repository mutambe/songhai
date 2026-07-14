import { NextResponse } from 'next/server'
import { setAdminCookie } from '@/lib/admin-auth'
import { verifyBlogSsoToken } from '@/lib/sso'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  const identity = verifyBlogSsoToken(token)

  if (!identity) {
    return NextResponse.redirect(`${PORTAL_URL}/portal`)
  }

  await setAdminCookie(identity)
  return NextResponse.redirect(new URL('/admin/blog', request.url))
}
