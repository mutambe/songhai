'use client'

import { useState } from 'react'
import { BarChart3, Code2, ExternalLink, ImagePlus, Pencil, Plus, Trash2 } from 'lucide-react'
import { Modal } from '@/components/modal'
import type { Dashboard, DashboardType } from '@/lib/systems-store'

export function DashboardsSection({
  initialDashboards,
}: {
  initialDashboards: Dashboard[]
}) {
  const [dashboards, setDashboards] = useState(initialDashboards)
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<DashboardType>('powerbi')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [href, setHref] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [editing, setEditing] = useState<Dashboard | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const resetForm = () => {
    setName('')
    setDescription('')
    setHref('')
    setFile(null)
    setImage(null)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Preencha o nome do dashboard.')
      return
    }
    if (type === 'powerbi' && !href.trim()) {
      setError('Cole o link público do PowerBI.')
      return
    }
    if (type === 'html' && !file) {
      setError('Selecione um ficheiro .html.')
      return
    }

    const formData = new FormData()
    formData.set('type', type)
    formData.set('name', name)
    formData.set('description', description)
    if (type === 'powerbi') {
      formData.set('href', href)
    } else if (file) {
      formData.set('file', file)
    }
    if (image) formData.set('image', image)

    setLoading(true)
    try {
      const res = await fetch('/api/dashboards', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro ao registar o dashboard.')

      setDashboards((prev) => [...prev, json.dashboard])
      resetForm()
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registar o dashboard.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editing) return
    setError('')

    if (!name.trim()) {
      setError('Preencha o nome do dashboard.')
      return
    }
    if (editing.type === 'powerbi' && !href.trim()) {
      setError('Cole o link público do PowerBI.')
      return
    }

    const formData = new FormData()
    formData.set('name', name)
    formData.set('description', description)
    if (editing.type === 'powerbi') formData.set('href', href)
    if (image) formData.set('image', image)

    setLoading(true)
    try {
      const res = await fetch(`/api/dashboards/${editing.id}`, { method: 'PATCH', body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro ao atualizar o dashboard.')

      setDashboards((prev) => prev.map((d) => (d.id === json.dashboard.id ? json.dashboard : d)))
      setEditing(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar o dashboard.')
    } finally {
      setLoading(false)
    }
  }

  const openEdit = (dashboard: Dashboard) => {
    setEditing(dashboard)
    setName(dashboard.name)
    setDescription(dashboard.description)
    setHref(dashboard.type === 'powerbi' ? dashboard.href : '')
    setImage(null)
    setError('')
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apagar este dashboard? Esta ação não pode ser desfeita.')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/dashboards/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error || 'Erro ao apagar o dashboard.')
      }
      setDashboards((prev) => prev.filter((d) => d.id !== id))
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Erro ao apagar o dashboard.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="mt-8">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => {
            resetForm()
            setOpen(true)
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" />
          Adicionar dashboard
        </button>
      </div>

      {dashboards.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint">
            <BarChart3 className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
            Nenhum dashboard de cliente configurado ainda
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Registe um link público do PowerBI ou envie um ficheiro HTML.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dashboards.map((dashboard) => {
            const Icon = dashboard.type === 'powerbi' ? BarChart3 : Code2
            return (
              <div
                key={dashboard.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-all hover:border-mint/40 hover:shadow-xl hover:shadow-black/20"
              >
                <a href={dashboard.href} target="_blank" rel="noopener noreferrer" className="flex flex-1 flex-col">
                  {dashboard.previewImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={dashboard.previewImage}
                      alt={`Pré-visualização de ${dashboard.name}`}
                      className="aspect-video w-full object-cover"
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ExternalLink className="h-4 w-4 text-line transition-colors group-hover:text-mint" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                      {dashboard.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {dashboard.description || (dashboard.type === 'powerbi' ? 'Dashboard PowerBI' : 'Dashboard HTML')}
                    </p>
                    <span className="mt-4 inline-flex w-fit items-center rounded-full bg-paper-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink-soft">
                      {dashboard.type === 'powerbi' ? 'PowerBI' : 'HTML'}
                    </span>
                  </div>
                </a>
                <div className="flex items-center gap-2 border-t border-line px-6 pb-6 pt-4">
                  <button
                    type="button"
                    onClick={() => openEdit(dashboard)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-paper-muted hover:text-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(dashboard.id)}
                    disabled={deletingId === dashboard.id}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {deletingId === dashboard.id ? 'A apagar...' : 'Apagar'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Adicionar dashboard">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="grid grid-cols-2 gap-2 rounded-full border border-line bg-sand p-1">
            <button
              type="button"
              onClick={() => setType('powerbi')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                type === 'powerbi' ? 'bg-primary text-primary-foreground' : 'text-ink-soft'
              }`}
            >
              Link PowerBI
            </button>
            <button
              type="button"
              onClick={() => setType('html')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                type === 'html' ? 'bg-primary text-primary-foreground' : 'text-ink-soft'
              }`}
            >
              Ficheiro HTML
            </button>
          </div>

          <div>
            <label htmlFor="dash-name" className="mb-2 block text-sm font-medium text-foreground">
              Nome do cliente/dashboard
            </label>
            <input
              id="dash-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Cliente XPTO — Vendas"
              required
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          <div>
            <label htmlFor="dash-desc" className="mb-2 block text-sm font-medium text-foreground">
              Descrição
            </label>
            <input
              id="dash-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Curta descrição (opcional)"
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          {type === 'powerbi' ? (
            <div>
              <label htmlFor="dash-href" className="mb-2 block text-sm font-medium text-foreground">
                Link público do PowerBI
              </label>
              <input
                id="dash-href"
                type="url"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="https://app.powerbi.com/view?r=..."
                required
                className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
              />
              <p className="mt-2 text-xs text-ink-soft">
                Use o link gerado em "Publicar na Web" do PowerBI.
              </p>
            </div>
          ) : (
            <div>
              <label htmlFor="dash-file" className="mb-2 block text-sm font-medium text-foreground">
                Ficheiro HTML
              </label>
              <input
                id="dash-file"
                type="file"
                accept=".html,.htm"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                required
                className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none file:mr-3 file:rounded-full file:border-0 file:bg-mint/15 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-mint transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
              />
              <p className="mt-2 text-xs text-ink-soft">Máximo 5MB.</p>
            </div>
          )}

          <div>
            <label htmlFor="dash-image" className="mb-2 block text-sm font-medium text-foreground">
              Imagem de pré-visualização (opcional)
            </label>
            <input
              id="dash-image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none file:mr-3 file:rounded-full file:border-0 file:bg-mint/15 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-mint transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
            <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
              <ImagePlus className="h-3.5 w-3.5" />
              Ex.: screenshot do dashboard. Máximo 5MB.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'A registar...' : 'Registar dashboard'}
          </button>
        </form>
      </Modal>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title="Editar dashboard">
        <form onSubmit={handleUpdate} className="space-y-4">
          {error && <p className="text-sm text-red-400">{error}</p>}

          <div>
            <label htmlFor="dash-edit-name" className="mb-2 block text-sm font-medium text-foreground">
              Nome do cliente/dashboard
            </label>
            <input
              id="dash-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          <div>
            <label htmlFor="dash-edit-desc" className="mb-2 block text-sm font-medium text-foreground">
              Descrição
            </label>
            <input
              id="dash-edit-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          {editing?.type === 'powerbi' && (
            <div>
              <label htmlFor="dash-edit-href" className="mb-2 block text-sm font-medium text-foreground">
                Link público do PowerBI
              </label>
              <input
                id="dash-edit-href"
                type="url"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                required
                className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
              />
            </div>
          )}

          {editing?.type === 'html' && (
            <p className="text-xs text-ink-soft">
              O ficheiro HTML não pode ser substituído aqui — apague e crie um novo dashboard
              para trocar o ficheiro.
            </p>
          )}

          <div>
            <label htmlFor="dash-edit-image" className="mb-2 block text-sm font-medium text-foreground">
              Imagem de pré-visualização
            </label>
            {editing?.previewImage && !image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={editing.previewImage}
                alt=""
                className="mb-2 aspect-video w-full rounded-lg object-cover"
              />
            ) : null}
            <input
              id="dash-edit-image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none file:mr-3 file:rounded-full file:border-0 file:bg-mint/15 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-mint transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
            <p className="mt-2 text-xs text-ink-soft">
              Escolha um novo ficheiro para substituir a imagem atual. Máximo 5MB.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'A guardar...' : 'Guardar alterações'}
          </button>
        </form>
      </Modal>
    </section>
  )
}
