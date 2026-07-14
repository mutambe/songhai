'use client'

import { useState } from 'react'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export function LogoutButton() {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/admin/blog/logout', { method: 'POST' })
    } finally {
      window.location.href = `${PORTAL_URL}/portal`
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? 'A sair...' : 'Sair'}
    </button>
  )
}
