import type { ReactNode } from 'react'
import { Server, LayoutDashboard, Activity } from 'lucide-react'
import { Logo } from '@/components/logo'
import { EagleMark } from '@/components/eagle-mark'

const AREAS = [
  { icon: Server, label: 'Sistemas internos' },
  { icon: LayoutDashboard, label: 'Dashboards de clientes' },
  { icon: Activity, label: 'Métricas do site' },
]

/**
 * Ecrã de acesso (login, registo, recuperação, 2FA): painel de marca à
 * esquerda e o formulário à direita. Em ecrãs pequenos fica só o formulário,
 * com o logótipo por cima.
 */
export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <main className="relative grid min-h-screen bg-background lg:grid-cols-[1.05fr_1fr]">
      {/* Painel de marca */}
      <aside className="relative hidden overflow-hidden border-r border-line bg-indigo-deep lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div aria-hidden="true" className="songhai-backdrop pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="songhai-grid pointer-events-none absolute inset-0" />
        <EagleMark className="pointer-events-none absolute -bottom-24 -right-28 h-[560px] w-[560px] text-gold/[7%]" />

        <div className="rise relative">
          <Logo href="https://songhai.cc" />
        </div>

        <div className="relative max-w-md">
          <p className="rise text-xs font-semibold uppercase tracking-[0.2em] text-gold" style={{ ['--d' as string]: '0.05s' }}>
            Portal interno
          </p>
          <h2
            className="rise mt-4 text-balance font-serif text-4xl font-semibold leading-[1.1] text-foreground xl:text-5xl"
            style={{ ['--d' as string]: '0.1s' }}
          >
            Poupe tempo. Automatize processos. Cresça mais rápido.
          </h2>
          <div className="gold-rule rise mt-8 h-px w-40" style={{ ['--d' as string]: '0.15s' }} />
          <ul className="rise mt-8 space-y-3" style={{ ['--d' as string]: '0.2s' }}>
            {AREAS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-ink-soft">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-sky/10 text-sky">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <p className="rise relative text-xs text-ink-soft/70" style={{ ['--d' as string]: '0.25s' }}>
          SONGHAI, Lda · Praceta dos Namarais, nº 63 · Maputo
        </p>
      </aside>

      {/* Formulário */}
      <section className="relative flex items-center justify-center overflow-hidden px-5 py-12">
        <div aria-hidden="true" className="songhai-backdrop pointer-events-none absolute inset-0 opacity-60 lg:opacity-30" />
        <div className="relative w-full max-w-md">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo href="https://songhai.cc" />
          </div>

          <div className="rise rounded-3xl border border-line bg-paper/90 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-10">
            <div className="gold-rule mb-6 h-px w-16" />
            <h1 className="text-balance font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{subtitle}</p>

            <div className="mt-8">{children}</div>
          </div>

          {footer && <p className="mt-6 text-center text-sm text-ink-soft">{footer}</p>}
        </div>
      </section>
    </main>
  )
}
