import { PortalShell } from '@/components/portal-shell'
import { BackToHub } from '@/components/back-to-hub'
import { MetricsPanel } from '@/components/metrics-panel'
import { requirePermission } from '@/lib/session'

export default async function MetricasPage() {
  const { session, pendingCount } = await requirePermission('canViewMetrics')

  return (
    <PortalShell
      userName={session.name}
      isAdmin={session.role === 'admin'}
      pendingCount={pendingCount}
    >
      <BackToHub />
      <MetricsPanel />
    </PortalShell>
  )
}
