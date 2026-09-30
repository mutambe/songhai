import Link from 'next/link'
import { Logo } from '@/components/logo'

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
                Área de cliente
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-panel-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-panel-foreground/60 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} SONGHAI. Todos os direitos reservados.</p>
          <p>Desenvolvido pela Songhai</p>
        </div>
      </div>
    </footer>
  )
}
