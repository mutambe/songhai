import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_COOKIE, verifyAdminToken } from '@/lib/admin-auth'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export function proxy(request: NextRequest) {
  // O handoff de SSO faz a sua própria verificação (token assinado na URL).
  if (request.nextUrl.pathname === '/admin/blog/sso') {
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value
  if (!verifyAdminToken(token)) {
    return NextResponse.redirect(`${PORTAL_URL}/portal`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/blog/:path*'],
}
