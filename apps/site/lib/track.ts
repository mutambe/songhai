// Envia um evento de conversão para o painel de métricas do portal.
// Os nomes têm de constar da lista branca em apps/portal/lib/events-store.ts.
export type TrackedEvent = 'lead' | 'whatsapp_click' | 'calculator_use' | 'diagnostico_start'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export function trackEvent(event: TrackedEvent) {
  if (typeof window === 'undefined') return
  fetch(`${PORTAL_URL}/api/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: window.location.pathname, event }),
    keepalive: true,
  }).catch(() => {})
}
