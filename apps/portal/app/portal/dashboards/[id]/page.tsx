import { notFound } from 'next/navigation'
import { PortalShell } from '@/components/portal-shell'
import { BackToHub } from '@/components/back-to-hub'
import { DashboardViewer } from '@/components/dashboard-viewer'
import { getDashboardById } from '@/lib/systems-store'
import { requirePermission } from '@/lib/session'

export default async function DashboardViewerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [{ session, pendingCount }, dashboard] = await Promise.all([
    requirePermission('canViewDashboards'),
    getDashboardById(id),
  ])

  if (!dashboard) notFound()

  return (
    <PortalShell
      userName={session.name}
      isAdmin={session.role === 'admin'}
      pendingCount={pendingCount}
    >
      <BackToHub />
      <DashboardViewer dashboard={dashboard} />
    </PortalShell>
  )
}
