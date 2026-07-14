import { NextResponse } from 'next/server'
import { recordPageview } from '@/lib/analytics-store'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const path = typeof body?.path === 'string' && body.path ? body.path.slice(0, 200) : '/'

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  await recordPageview({ path, ip, userAgent })

  return NextResponse.json({ ok: true }, { headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS })
}
