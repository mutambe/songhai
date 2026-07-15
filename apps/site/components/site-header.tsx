'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogIn, Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { PillButton } from '@/components/pill-button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Serviços', href: '/#solucoes' },
  { label: 'Setores', href: '/#setores' },
  { label: 'Método', href: '/#metodo' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
]

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-line/70 bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <ThemeToggle />
          <a
            href={PORTAL_URL}
            className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-foreground"
          >
            <LogIn className="h-4 w-4" />
            Entrar
          </a>
          <PillButton href="/contacto">Falar connosco</PillButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-background/95 backdrop-blur-md md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4"
            aria-label="Móvel"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-ink-soft transition-colors hover:bg-paper hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={PORTAL_URL}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base text-ink-soft transition-colors hover:bg-paper hover:text-foreground"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </a>
            <div className="px-3 pt-2">
              <PillButton
                href="/contacto"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Falar connosco
              </PillButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
