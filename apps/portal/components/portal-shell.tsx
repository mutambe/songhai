'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogOut, Users } from 'lucide-react'
import { Logo } from '@/components/logo'
import { EagleMark } from '@/components/eagle-mark'

export function PortalShell({
  userName = 'Equipa Songhai',
  isAdmin = false,
  pendingCount = 0,
  children,
}: {
  userName?: string
  isAdmin?: boolean
  pendingCount?: number
  children: ReactNode
}) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      router.push('/login')
      router.refresh()
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 0%, rgba(47,230,171,0.17), transparent 70%), radial-gradient(50% 40% at 90% 100%, rgba(200,155,60,0.14), transparent 70%)',
        }}
      />
      <EagleMark className="pointer-events-none fixed -right-16 -top-16 z-0 h-[420px] w-[420px] text-mint/[6%]" />
      <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Logo href="/portal" />

          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                href="/portal/utilizadores"
                className="relative inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground"
              >
                <Users className="h-3.5 w-3.5" />
                Utilizadores
                {pendingCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-mint-ink">
                    {pendingCount}
                  </span>
                )}
              </Link>
            )}
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint text-xs font-semibold text-mint-ink">
                {initials}
              </span>
              <span className="text-sm text-ink-soft">{userName}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              {loggingOut ? 'A sair...' : 'Sair'}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
        {children}
      </main>
    </div>
  )
}
