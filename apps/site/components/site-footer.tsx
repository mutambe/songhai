import Link from 'next/link'
import { Logo } from '@/components/logo'

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
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo className="text-primary-foreground" />
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Poupe tempo. Automatize processos. Cresça mais rápido.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Serviços
          </h3>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            {SERVICES.map((s) => (
              <li key={s}>
                <Link
                  href="/#solucoes"
                  className="transition-colors hover:text-primary-foreground"
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
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            {COMPANY.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Legal
          </h3>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li>
              <Link
                href="/contacto"
                className="transition-colors hover:text-primary-foreground"
              >
                Contactar
              </Link>
            </li>
            <li>
              <Link
                href="/privacidade"
                className="transition-colors hover:text-primary-foreground"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="transition-colors hover:text-primary-foreground"
              >
                Termos de Serviço
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-primary-foreground/60 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} SONGHAI. Todos os direitos reservados.</p>
          <p>Desenvolvido pela Songhai</p>
        </div>
      </div>
    </footer>
  )
}
