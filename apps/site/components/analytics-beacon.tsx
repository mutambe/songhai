'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export function AnalyticsBeacon() {
  const pathname = usePathname()

useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get('utm_source') || undefined
  const utmCampaign = params.get('utm_campaign') || undefined

          fetch(`${PORTAL_URL}/api/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: pathname, referrer: document.referrer, utmSource, utmCampaign }),
            keepalive: true,
          }).catch(() => {})
}, [pathname])

return null
}
