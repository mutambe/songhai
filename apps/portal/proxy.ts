import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session-core'

// Não usar `request.url` como base de redirecionamentos: atrás de um proxy
// reverso (Traefik), isto pode refletir o endereço interno do container em
// vez do domínio público.
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  const session = token ? await verifySessionToken(token) : null

  if (!session) {
    const loginUrl = new URL('/login', PORTAL_URL)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (request.nextUrl.pathname.startsWith('/portal/utilizadores') && session.role !== 'admin') {
    return NextResponse.redirect(new URL('/portal', PORTAL_URL))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path*'],
}
