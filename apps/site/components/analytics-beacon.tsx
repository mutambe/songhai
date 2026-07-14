'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export function AnalyticsBeacon() {
  const pathname = usePathname()

  useEffect(() => {
    fetch(`${PORTAL_URL}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {})
  }, [pathname])

  return null
}
