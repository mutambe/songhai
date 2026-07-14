import { PortalShell } from '@/components/portal-shell'
import { BackToHub } from '@/components/back-to-hub'
import { InternalSystemsSection } from '@/components/internal-systems-section'
import { listInternalSystems } from '@/lib/systems-store'
import { requirePermission } from '@/lib/session'

export default async function SistemasPage() {
  const [{ session, pendingCount }, systems] = await Promise.all([
    requirePermission('canViewSystems'),
    listInternalSystems(),
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
          Sistemas internos
        </p>
        <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Ferramentas da equipa Songhai
        </h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-ink-soft">
          CRM, ERP, infraestrutura e outros sistemas usados internamente.
        </p>
      </div>
      <InternalSystemsSection initialSystems={systems} />
    </PortalShell>
  )
}
