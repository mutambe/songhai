import Link from 'next/link'
import { ArrowRight, Activity, Server, LayoutDashboard, Newspaper } from 'lucide-react'
import { PortalShell } from '@/components/portal-shell'
import { EagleMark } from '@/components/eagle-mark'
import { listInternalSystems, listDashboards } from '@/lib/systems-store'
import { getSummary, hasAnyData } from '@/lib/analytics-store'
import { getPortalShellProps, hasPermission } from '@/lib/session'

async function getMetricsTeaser() {
  const gotData = await hasAnyData()
  if (!gotData) return 'Sem dados ainda'
  const { pageviews } = await getSummary(7)
  return `${pageviews.toLocaleString('pt-PT')} visitas nos últimos 7 dias`
}

// Saudação e data na hora de Maputo (o servidor pode estar noutro fuso).
function maputoGreeting() {
  const now = new Date()
  const hour = Number(
    new Intl.DateTimeFormat('pt-PT', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Africa/Maputo' }).format(now),
  )
  const greeting = hour < 12 ? 'Bom dia' : hour < 19 ? 'Boa tarde' : 'Boa noite'
  const today = new Intl.DateTimeFormat('pt-PT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Africa/Maputo',
  }).format(now)
  return { greeting, today }
}

export default async function PortalHubPage() {
  const [{ session, pendingCount }, systems, dashboards, metricsTeaser] = await Promise.all([
    getPortalShellProps(),
    listInternalSystems(),
    listDashboards(),
    getMetricsTeaser(),
  ])

  const panels = [
    {
      href: '/portal/metricas',
      icon: Activity,
      title: 'Métricas',
      description: 'Visitas e páginas mais vistas do site principal.',
      teaser: metricsTeaser,
      visible: hasPermission(session, 'canViewMetrics'),
      external: false,
    },
    {
      href: '/portal/sistemas',
      icon: Server,
      title: 'Sistemas internos',
      description: 'CRM, ERP, infraestrutura e outras ferramentas da equipa.',
      teaser:
        systems.length === 0
          ? 'Nenhum registado'
          : `${systems.length} sistema${systems.length === 1 ? '' : 's'} registado${systems.length === 1 ? '' : 's'}`,
      visible: hasPermission(session, 'canViewSystems'),
      external: false,
    },
    {
      href: '/portal/dashboards',
      icon: LayoutDashboard,
      title: 'Dashboards de clientes',
      description: 'Relatórios PowerBI e dashboards HTML partilhados com clientes.',
      teaser:
        dashboards.length === 0
          ? 'Nenhum registado'
          : `${dashboards.length} dashboard${dashboards.length === 1 ? '' : 's'} registado${dashboards.length === 1 ? '' : 's'}`,
      visible: hasPermission(session, 'canViewDashboards'),
      external: false,
    },
    {
      href: '/api/blog-sso',
      icon: Newspaper,
      title: 'Blog',
      description: 'Publicar e editar artigos do blog do site principal.',
      teaser: 'Abre numa nova aba · acesso de administrador',
      visible: session.role === 'admin',
      external: true,
    },
  ].filter((panel) => panel.visible)

  const { greeting, today } = maputoGreeting()
  const firstName = session.name.split(' ')[0]

  return (
    <PortalShell
      userName={session.name}
      isAdmin={session.role === 'admin'}
      pendingCount={pendingCount}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="rise text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Portal interno · {today}
          </p>
          <h1
            className="rise mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl"
            style={{ ['--d' as string]: '0.05s' }}
          >
            {greeting}, {firstName}.
          </h1>
          <p
            className="rise mt-3 text-pretty text-base leading-relaxed text-ink-soft"
            style={{ ['--d' as string]: '0.1s' }}
          >
            Escolha uma área para continuar.
          </p>
        </div>
        <p className="rise text-sm text-ink-soft" style={{ ['--d' as string]: '0.15s' }}>
          <span className="font-serif text-2xl font-semibold text-foreground">{panels.length}</span>{' '}
          {panels.length === 1 ? 'área disponível' : 'áreas disponíveis'}
        </p>
      </div>

      <div className="gold-rule mt-10 h-px w-full opacity-50" />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {panels.map((panel, index) => {
          const Icon = panel.icon
          const cardClassName =
            'rise group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper/80 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:shadow-[0_24px_60px_-24px_rgba(212,176,102,0.25)]'
          const cardContent = (
            <>
              <EagleMark className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 text-gold/[4%] transition-colors duration-300 group-hover:text-gold/[9%]" />
              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky/20 bg-sky/10 text-sky transition-colors group-hover:border-gold/40 group-hover:bg-gold/10 group-hover:text-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-serif text-sm font-semibold text-gold/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h2 className="relative mt-6 font-serif text-xl font-semibold text-foreground">
                {panel.title}
              </h2>
              <p className="relative mt-1.5 text-sm leading-relaxed text-ink-soft">
                {panel.description}
              </p>
              <div className="flex-1" />
              <div className="relative mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                  {panel.teaser}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-mint-ink">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </>
          )

          if (panel.external) {
            return (
              <a
                key={panel.href}
                href={panel.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
                style={{ ['--d' as string]: `${0.15 + index * 0.06}s` }}
              >
                {cardContent}
              </a>
            )
          }

          return (
            <Link
              key={panel.href}
              href={panel.href}
              className={cardClassName}
              style={{ ['--d' as string]: `${0.15 + index * 0.06}s` }}
            >
              {cardContent}
            </Link>
          )
        })}
      </div>
    </PortalShell>
  )
}
