import { notFound } from 'next/navigation'
import { PortalShell } from '@/components/portal-shell'
import { BackToHub } from '@/components/back-to-hub'
import { EmbedViewer } from '@/components/embed-viewer'
import { getInternalSystemById } from '@/lib/systems-store'
import { requirePermission } from '@/lib/session'

export default async function SystemViewerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [{ session, pendingCount }, system] = await Promise.all([
    requirePermission('canViewSystems'),
    getInternalSystemById(id),
  ])

  if (!system) notFound()

  return (
    <PortalShell
      userName={session.name}
      isAdmin={session.role === 'admin'}
      pendingCount={pendingCount}
    >
      <BackToHub />
      <EmbedViewer title={system.name} description={system.description} href={system.href} />
    </PortalShell>
  )
}
