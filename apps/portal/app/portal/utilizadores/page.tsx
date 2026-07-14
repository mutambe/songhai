import { PortalShell } from '@/components/portal-shell'
import { BackToHub } from '@/components/back-to-hub'
import { UserManagementSection } from '@/components/user-management-section'
import { listAllUsers, countPendingUsers } from '@/lib/auth-store'
import { requireAdmin } from '@/lib/session'

export default async function UtilizadoresPage() {
  const session = await requireAdmin()
  const users = listAllUsers().map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
    permissions: u.permissions,
  }))
  const pendingCount = countPendingUsers()

  return (
    <PortalShell userName={session.name} isAdmin pendingCount={pendingCount}>
      <BackToHub />
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-mint">
          Gestão de utilizadores
        </p>
        <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Equipa e acessos
        </h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-ink-soft">
          Aprove pedidos, atribua papéis, controle a que painéis cada pessoa acede e reponha senhas.
        </p>
      </div>
      <UserManagementSection initialUsers={users} currentUserId={session.sub} />
    </PortalShell>
  )
}
