import Link from 'next/link'
import { ArrowRight, Activity, Server, LayoutDashboard, Newspaper } from 'lucide-react'
import { PortalShell } from '@/components/portal-shell'
import { listInternalSystems, listDashboards } from '@/lib/systems-store'
import { getSummary, hasAnyData } from '@/lib/analytics-store'
import { getPortalShellProps, hasPermission } from '@/lib/session'

async function getMetricsTeaser() {
  const gotData = await hasAnyData()
  if (!gotData) return 'Sem dados ainda'
  const { pageviews } = await getSummary(7)
  return `${pageviews.toLocaleString('pt-PT')} visitas nos últimos 7 dias`
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

  return (
    <PortalShell
      userName={session.name}
      isAdmin={session.role === 'admin'}
      pendingCount={pendingCount}
    >
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-mint">
          Portal interno
        </p>
        <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Para onde quer ir?
        </h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-ink-soft">
          Cada área tem o seu próprio espaço — escolha um painel para continuar.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {panels.map((panel) => {
          const Icon = panel.icon
          const cardClassName =
            'group flex flex-col rounded-2xl border border-line bg-paper p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-all hover:border-mint/40 hover:shadow-xl hover:shadow-black/20'
          const cardContent = (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint/10 text-mint">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-serif text-xl font-semibold text-foreground">
                {panel.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {panel.description}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                  {panel.teaser}
                </span>
                <ArrowRight className="h-4 w-4 text-line transition-all group-hover:translate-x-0.5 group-hover:text-mint" />
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
              >
                {cardContent}
              </a>
            )
          }

          return (
            <Link key={panel.href} href={panel.href} className={cardClassName}>
              {cardContent}
            </Link>
          )
        })}
      </div>
    </PortalShell>
  )
}
