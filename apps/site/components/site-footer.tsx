import Link from 'next/link'
import { Logo } from '@/components/logo'
import { SocialIcon } from '@/components/social-icon'
import { SOCIAL_PROFILES } from '@/lib/social'
import { BUSINESS, OPENING_HOURS } from '@/lib/business'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

const SERVICES = [
  'Agentes de IA de Texto',
  'Agentes de IA de Voz',
  'Automação de Processos',
  'Consultoria de IA',
  'Formação em IA',
]

const COMPANY = [
  { label: 'Método Songhai', href: '/#metodo' },
  { label: 'Setores', href: '/#setores' },
  { label: 'Preços', href: '/precos' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
]

export function SiteFooter() {
  return (
    <footer className="bg-panel text-panel-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo className="text-panel-foreground" />
          <p className="max-w-xs text-sm leading-relaxed text-panel-foreground/70">
            Poupe tempo. Automatize processos. Cresça mais rápido.
          </p>
          <ul className="flex gap-3">
            {SOCIAL_PROFILES.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`SONGHAI no ${s.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-panel-foreground/15 text-panel-foreground/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <SocialIcon network={s.name} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Serviços
          </h3>
          <ul className="space-y-3 text-sm text-panel-foreground/70">
            {SERVICES.map((s) => (
              <li key={s}>
                <Link
                  href="/#solucoes"
                  className="transition-colors hover:text-panel-foreground"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Empresa
          </h3>
          <ul className="space-y-3 text-sm text-panel-foreground/70">
            {COMPANY.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="transition-colors hover:text-panel-foreground"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-panel-foreground/70">
            <li>
              <address className="not-italic leading-relaxed">
                {BUSINESS.streetAddress}
                <br />
                {BUSINESS.locality}, {BUSINESS.country}
              </address>
            </li>
            <li className="leading-relaxed">
              {OPENING_HOURS.map((h) => (
                <span key={h.label} className="block">
                  {h.label}: {h.display}
                </span>
              ))}
            </li>
            <li>
              <a
                href="https://wa.me/258848986002"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-panel-foreground"
              >
                WhatsApp: +258 84 898 6002
              </a>
            </li>
            <li>
              <a
                href="mailto:info@songhai.cc"
                className="transition-colors hover:text-panel-foreground"
              >
                info@songhai.cc
              </a>
            </li>
            <li>
              <Link
                href="/contacto"
                className="transition-colors hover:text-panel-foreground"
              >
                Contactar
              </Link>
            </li>
            <li>
              <Link
                href="/privacidade"
                className="transition-colors hover:text-panel-foreground"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <a
                href={PORTAL_URL}
                className="transition-colors hover:text-panel-foreground"
              >
                Entrar no Portal
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-panel-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-panel-foreground/60 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} {BUSINESS.legalName}. Todos os direitos reservados.</p>
          <p>Desenvolvido pela Songhai</p>
        </div>
      </div>
    </footer>
  )
}
