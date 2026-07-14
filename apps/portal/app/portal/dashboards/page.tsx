import { PortalShell } from '@/components/portal-shell'
import { BackToHub } from '@/components/back-to-hub'
import { DashboardsSection } from '@/components/dashboards-section'
import { listDashboards } from '@/lib/systems-store'
import { requirePermission } from '@/lib/session'

export default async function DashboardsPage() {
  const [{ session, pendingCount }, dashboards] = await Promise.all([
    requirePermission('canViewDashboards'),
    listDashboards(),
  ])

  return (
    <PortalShell
      userName={session.name}
      isAdmin={session.role === 'admin'}
      pendingCount={pendingCount}
    >
      <BackToHub />
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-mint">
          Dashboards de clientes
        </p>
        <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Relatórios partilhados com clientes
        </h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-ink-soft">
          Links públicos do PowerBI ou dashboards em ficheiro HTML.
        </p>
      </div>
      <DashboardsSection initialDashboards={dashboards} />
    </PortalShell>
  )
}
