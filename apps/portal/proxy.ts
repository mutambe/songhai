import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session-core'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  const session = token ? await verifySessionToken(token) : null

  if (!session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (request.nextUrl.pathname.startsWith('/portal/utilizadores') && session.role !== 'admin') {
    return NextResponse.redirect(new URL('/portal', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path*'],
}
