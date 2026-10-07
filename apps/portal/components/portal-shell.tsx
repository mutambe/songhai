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
    <div className="relative flex min-h-screen flex-col bg-background">
      <div aria-hidden="true" className="songhai-backdrop pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="songhai-grid pointer-events-none fixed inset-x-0 top-0 z-0 h-[520px]" />
      <EagleMark className="pointer-events-none fixed -bottom-40 -right-32 z-0 h-[620px] w-[620px] text-gold/[5%]" />

      <header className="sticky top-0 z-40 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Logo href="/portal" />

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/portal/utilizadores"
                className="relative inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-gold/50 hover:text-foreground"
              >
                <Users className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Utilizadores</span>
                {pendingCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-semibold text-mint-ink">
                    {pendingCount}
                  </span>
                )}
              </Link>
            )}
            <div className="hidden items-center gap-2.5 rounded-full border border-line py-1 pl-1 pr-4 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-xs font-semibold text-mint-ink">
                {initials}
              </span>
              <span className="text-sm text-foreground">{userName}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-gold/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              {loggingOut ? 'A sair...' : 'Sair'}
            </button>
          </div>
        </div>
        <div className="gold-rule h-px w-full opacity-60" />
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 py-10 lg:px-8 lg:py-14">
        {children}
      </main>

      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-5 pb-8 text-xs text-ink-soft/70 sm:flex-row lg:px-8">
        <span>© {new Date().getFullYear()} SONGHAI, Lda · Portal interno</span>
        <span>Poupe tempo. Automatize processos. Cresça mais rápido.</span>
      </footer>
    </div>
  )
}
