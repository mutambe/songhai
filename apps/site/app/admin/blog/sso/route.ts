import { NextResponse } from 'next/server'
import { setAdminCookie } from '@/lib/admin-auth'
import { verifyBlogSsoToken } from '@/lib/sso'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'
// Não usar `request.url` como base do redirecionamento final: atrás de um
// proxy reverso (Traefik), o servidor Next.js pode ver o pedido através do
// endereço interno do container, não do domínio público — o que produzia
// um redirecionamento para o container em vez de para o site real.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  const identity = verifyBlogSsoToken(token)

  if (!identity) {
    return NextResponse.redirect(`${PORTAL_URL}/portal`)
  }

  await setAdminCookie(identity)
  return NextResponse.redirect(`${SITE_URL}/admin/blog`)
}
