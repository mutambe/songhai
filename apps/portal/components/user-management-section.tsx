'use client'

import { useMemo, useState } from 'react'
import { Check, Copy, KeyRound, Search, ShieldOff, Trash2, UserCog, UserPlus, X } from 'lucide-react'
import { Modal } from '@/components/modal'

type Role = 'admin' | 'member'
type Status = 'pending' | 'approved' | 'rejected'

type Permissions = {
  canViewMetrics: boolean
  canViewSystems: boolean
  canViewDashboards: boolean
}

type ManagedUser = {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  createdAt: string
  lastLoginAt: string | null
  permissions: Permissions
  twoFactorExempt: boolean
}

const STATUS_LABEL: Record<Status, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Recusado',
}

const STATUS_BADGE: Record<Status, string> = {
  pending: 'bg-gold/15 text-gold',
  approved: 'bg-mint/15 text-mint',
  rejected: 'bg-red-500/15 text-red-400',
}

const PERMISSION_FIELDS: { key: keyof Permissions; label: string }[] = [
  { key: 'canViewMetrics', label: 'Métricas' },
  { key: 'canViewSystems', label: 'Sistemas' },
  { key: 'canViewDashboards', label: 'Dashboards' },
]

export function UserManagementSection({
  initialUsers,
  currentUserId,
}: {
  initialUsers: ManagedUser[]
  currentUserId: string
}) {
  const [users, setUsers] = useState(initialUsers)
  const [query, setQuery] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [tempPassword, setTempPassword] = useState<{ email: string; password: string } | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [resetSentTo, setResetSentTo] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    )
  }, [users, query])

  const patchUser = async (id: string, body: Record<string, unknown>) => {
    setBusyId(id)
    setError('')
    try {
      const res = await fetch(`/api/auth/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível atualizar o utilizador.')
      setUsers((prev) => prev.map((u) => (u.id === id ? json.user : u)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível atualizar o utilizador.')
    } finally {
      setBusyId(null)
    }
  }

  const handleRoleChange = (user: ManagedUser, role: Role) => {
    patchUser(user.id, { role })
  }

  const handlePermissionToggle = (user: ManagedUser, key: keyof Permissions) => {
    patchUser(user.id, {
      permissions: { ...user.permissions, [key]: !user.permissions[key] },
    })
  }

  const handleTwoFactorExemptToggle = (user: ManagedUser) => {
    patchUser(user.id, { twoFactorExempt: !user.twoFactorExempt })
  }

  const handleCreateUser = async (input: { name: string; email: string; role: Role }) => {
    setError('')
    const res = await fetch('/api/auth/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Não foi possível criar o utilizador.')
    setUsers((prev) => [json.user, ...prev])
    setCreateOpen(false)
    setTempPassword({ email: json.user.email, password: json.tempPassword })
  }

  const handleApproval = async (user: ManagedUser, action: 'approve' | 'reject') => {
    setBusyId(user.id)
    setError('')
    try {
      const res = await fetch(`/api/auth/pending/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error(json?.error || 'Não foi possível concluir a ação.')
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, status: action === 'approve' ? 'approved' : 'rejected' } : u,
        ),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível concluir a ação.')
    } finally {
      setBusyId(null)
    }
  }

  const handleResetPassword = async (user: ManagedUser) => {
    setBusyId(user.id)
    setError('')
    try {
      const res = await fetch(`/api/auth/users/${user.id}/reset-password`, { method: 'POST' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível repor a senha.')
      setResetSentTo(user.email)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível repor a senha.')
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (user: ManagedUser) => {
    if (!window.confirm(`Remover a conta de ${user.name}? Esta ação não pode ser desfeita.`)) return
    setBusyId(user.id)
    setError('')
    try {
      const res = await fetch(`/api/auth/users/${user.id}`, { method: 'DELETE' })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error(json?.error || 'Não foi possível remover o utilizador.')
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível remover o utilizador.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por nome ou e-mail..."
            className="w-full rounded-full border border-line bg-sand py-2.5 pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
          />
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Novo utilizador
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {filtered.length === 0 && (
        <p className="text-sm text-ink-soft">Nenhum utilizador corresponde à pesquisa.</p>
      )}

      {filtered.map((user) => {
        const isSelf = user.id === currentUserId
        const isBusy = busyId === user.id
        return (
          <div
            key={user.id}
            className="rounded-2xl border border-line bg-paper p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-15px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">
                  {user.name}
                  {isSelf && <span className="ml-2 text-xs font-normal text-ink-soft">(você)</span>}
                </p>
                <p className="text-sm text-ink-soft">{user.email}</p>
                <p className="mt-2 flex items-center gap-2 text-xs text-ink-soft">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ${STATUS_BADGE[user.status]}`}
                  >
                    {STATUS_LABEL[user.status]}
                  </span>
                  <span className="capitalize">{user.role === 'admin' ? 'Administrador' : 'Membro'}</span>
                  {user.lastLoginAt &&
                    `· último acesso em ${new Date(user.lastLoginAt).toLocaleDateString('pt-PT')}`}
                </p>
              </div>

              {user.status === 'pending' ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleApproval(user, 'approve')}
                    disabled={isBusy}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Aprovar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApproval(user, 'reject')}
                    disabled={isBusy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-red-400/40 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    Recusar
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {user.status === 'rejected' && (
                    <button
                      type="button"
                      onClick={() => handleApproval(user, 'approve')}
                      disabled={isBusy}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-mint/40 hover:text-mint disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Aprovar
                    </button>
                  )}
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user, e.target.value as Role)}
                    disabled={isBusy || isSelf}
                    className="rounded-full border border-line bg-sand px-3 py-2 text-sm text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="member">Membro</option>
                    <option value="admin">Administrador</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleResetPassword(user)}
                    disabled={isBusy}
                    title="Repor senha"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    Repor senha
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(user)}
                    disabled={isBusy || isSelf}
                    title="Remover utilizador"
                    className="inline-flex items-center justify-center rounded-full border border-line p-2 text-ink-soft transition-colors hover:border-red-400/40 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {user.status === 'approved' && (
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ink-soft">
                  <UserCog className="h-3.5 w-3.5" />
                  Painéis com acesso
                </span>
                {PERMISSION_FIELDS.map((field) => (
                  <label key={field.key} className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={user.permissions[field.key]}
                      onChange={() => handlePermissionToggle(user, field.key)}
                      disabled={isBusy}
                      className="h-4 w-4 rounded border-line accent-mint disabled:cursor-not-allowed"
                    />
                    {field.label}
                  </label>
                ))}
              </div>
            )}

            {user.status === 'approved' && (
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-4">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={user.twoFactorExempt}
                    onChange={() => handleTwoFactorExemptToggle(user)}
                    disabled={isBusy}
                    className="h-4 w-4 rounded border-line accent-mint disabled:cursor-not-allowed"
                  />
                  <ShieldOff className="h-3.5 w-3.5 text-ink-soft" />
                  Conta raiz — não exigir 2FA no login
                </label>
                {!user.twoFactorExempt && (
                  <span className="text-xs text-ink-soft">2FA obrigatório</span>
                )}
              </div>
            )}
          </div>
        )
      })}

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Novo utilizador">
        <CreateUserForm onCreate={handleCreateUser} onCancel={() => setCreateOpen(false)} />
      </Modal>

      <Modal
        open={!!tempPassword}
        onClose={() => setTempPassword(null)}
        title="Senha temporária gerada"
      >
        {tempPassword && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-ink-soft">
              Partilhe esta senha com <span className="text-foreground">{tempPassword.email}</span>{' '}
              por um canal seguro. Vai ter de a trocar no próximo login.
            </p>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-sand px-4 py-3">
              <code className="text-sm tracking-wide text-foreground">{tempPassword.password}</code>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(tempPassword.password)}
                className="text-ink-soft transition-colors hover:text-mint"
                aria-label="Copiar senha"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!resetSentTo}
        onClose={() => setResetSentTo(null)}
        title="Link de reposição enviado"
      >
        {resetSentTo && (
          <p className="text-sm leading-relaxed text-ink-soft">
            Foi enviado um e-mail para <span className="text-foreground">{resetSentTo}</span> com um
            link para definir uma nova senha, válido por 1 hora.
          </p>
        )}
      </Modal>
    </div>
  )
}

function CreateUserForm({
  onCreate,
  onCancel,
}: {
  onCreate: (input: { name: string; email: string; role: Role }) => Promise<void>
  onCancel: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('member')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onCreate({ name, email, role })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar o utilizador.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div>
        <label htmlFor="new-user-name" className="mb-2 block text-sm font-medium text-foreground">
          Nome
        </label>
        <input
          id="new-user-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
          className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
        />
      </div>

      <div>
        <label htmlFor="new-user-email" className="mb-2 block text-sm font-medium text-foreground">
          E-mail
        </label>
        <input
          id="new-user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nome@songhai.cc"
          required
          className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
        />
      </div>

      <div>
        <label htmlFor="new-user-role" className="mb-2 block text-sm font-medium text-foreground">
          Papel
        </label>
        <select
          id="new-user-role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none"
        >
          <option value="member">Membro</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <p className="text-xs leading-relaxed text-ink-soft">
        A conta fica já aprovada, com uma senha temporária gerada automaticamente — vai poder
        copiá-la a seguir para partilhar com a pessoa. Vai ter de a trocar (e configurar 2FA) no
        primeiro login.
      </p>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-line px-5 py-2.5 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'A criar...' : 'Criar utilizador'}
        </button>
      </div>
    </form>
  )
}
