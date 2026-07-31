import { NextResponse } from 'next/server'
import { recordPageview } from '@/lib/analytics-store'
import { recordEvent, recordCampaign } from '@/lib/events-store'
import { isRateLimited, registerFailedAttempt } from '@/lib/rate-limit'

// Generoso de proposito: e um endpoint publico sem sessao, para nao
// travar um visitante real a navegar por varias paginas - so trava um
// disparo anormal de pedidos (flood/bot).
const TRACK_MAX_ATTEMPTS = 60
const TRACK_WINDOW_MS = 60 * 1000

// Sem NEXT_PUBLIC_SITE_ORIGIN definido, cai no dominio real em vez de "*" -
// evita que qualquer site de terceiros consiga escrever pageviews falsos
// caso a variavel seja esquecida em producao.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin':
  process.env.NEXT_PUBLIC_SITE_ORIGIN || process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://songhai.cc',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

const limitKey = `track:${ip}`
  if (isRateLimited(limitKey, TRACK_MAX_ATTEMPTS, TRACK_WINDOW_MS)) {
    return NextResponse.json({ error: 'Demasiados pedidos.' }, { status: 429, headers: CORS_HEADERS })
  }
  registerFailedAttempt(limitKey, TRACK_WINDOW_MS)

const body = await request.json().catch(() => null)
  const path = typeof body?.path === 'string' && body.path ? body.path.slice(0, 200) : '/'
  const referrer = typeof body?.referrer === 'string' && body.referrer ? body.referrer.slice(0, 300) : undefined
  const userAgent = request.headers.get('user-agent') || 'unknown'

await recordPageview({ path, ip, userAgent, referrer })

const event = typeof body?.event === 'string' && body.event ? body.event.slice(0, 50) : undefined
  if (event) {
    await recordEvent(event)
  }

const utmSource = typeof body?.utmSource === 'string' && body.utmSource ? body.utmSource.slice(0, 100) : undefined
  const utmCampaign =
    typeof body?.utmCampaign === 'string' && body.utmCampaign ? body.utmCampaign.slice(0, 100) : undefined
  if (utmSource) {
    await recordCampaign(utmSource, utmCampaign)
  }

return NextResponse.json({ ok: true }, { headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS })
}
