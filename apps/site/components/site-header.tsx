'use client'

import { useState } from 'react'
import { NavLink } from '@/components/nav-link'
import { LockKeyhole, Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { PillButton } from '@/components/pill-button'
import { ThemeToggle } from '@/components/theme-toggle'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

const NAV = [
  { label: 'Soluções', href: '/#solucoes' },
  { label: 'Sectores', href: '/#sectores' },
  { label: 'Preços', href: '/precos' },
  { label: 'Método', href: '/#metodo' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
]

// Barra lisa e fixa no topo: marca, poucos links, uma acção. Fica sempre à mão para
// voltar ao início ou mudar de secção. Fundo sólido, sem vidro, sem linha e sem sombra;
// o scroll-padding do html impede-a de tapar o título das secções.
export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-2 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="https://wa.me/258848986002"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-bold text-foreground transition-colors hover:text-[var(--field-gold)]"
          >
            +258 84 898 6002
          </a>
          {/* Acesso discreto ao Portal interno da equipa. */}
          <a
            href={PORTAL_URL}
            aria-label="Entrar no Portal"
            title="Entrar no Portal"
            className="inline-flex h-9 w-9 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"
          >
            <LockKeyhole className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <PillButton href="/diagnostico" variant="gold" className="py-2.5">
            Diagnóstico grátis
          </PillButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center bg-foreground/10 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-background lg:hidden">
          <nav className="mx-auto flex max-w-[1600px] flex-col px-5 pb-5 pt-2" aria-label="Móvel">
            {NAV.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-2xl font-black tracking-normal text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4">
              <PillButton
                href="/diagnostico"
                variant="gold"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Diagnóstico grátis
              </PillButton>
            </div>
            <a
              href={PORTAL_URL}
              className="mt-4 inline-flex items-center gap-2 py-2 text-base text-foreground/70 transition-colors hover:text-foreground"
            >
              <LockKeyhole className="h-4 w-4" />
              Entrar no Portal
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
