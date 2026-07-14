'use client'

import { useState } from 'react'
import { ExternalLink, ImagePlus, Pencil, Plus, Server, Trash2 } from 'lucide-react'
import { Modal } from '@/components/modal'
import { getIcon } from '@/lib/icon-map'
import type { InternalSystem } from '@/lib/systems-store'

export function InternalSystemsSection({
  initialSystems,
}: {
  initialSystems: InternalSystem[]
}) {
  const [systems, setSystems] = useState(initialSystems)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [href, setHref] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [editing, setEditing] = useState<InternalSystem | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const resetForm = () => {
    setName('')
    setDescription('')
    setHref('')
    setImage(null)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !href.trim()) {
      setError('Preencha o nome e o link.')
      return
    }

    const formData = new FormData()
    formData.set('name', name)
    formData.set('description', description)
    formData.set('href', href)
    if (image) formData.set('image', image)

    setLoading(true)
    try {
      const res = await fetch('/api/systems', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro ao registar o sistema.')

      setSystems((prev) => [...prev, json.system])
      resetForm()
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registar o sistema.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editing) return
    setError('')

    if (!name.trim() || !href.trim()) {
      setError('Preencha o nome e o link.')
      return
    }

    const formData = new FormData()
    formData.set('name', name)
    formData.set('description', description)
    formData.set('href', href)
    if (image) formData.set('image', image)

    setLoading(true)
    try {
      const res = await fetch(`/api/systems/${editing.id}`, { method: 'PATCH', body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro ao atualizar o sistema.')

      setSystems((prev) => prev.map((s) => (s.id === json.system.id ? json.system : s)))
      setEditing(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar o sistema.')
    } finally {
      setLoading(false)
    }
  }

  const openEdit = (system: InternalSystem) => {
    setEditing(system)
    setName(system.name)
    setDescription(system.description)
    setHref(system.href)
    setImage(null)
    setError('')
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apagar este sistema? Esta ação não pode ser desfeita.')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/systems/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error || 'Erro ao apagar o sistema.')
      }
      setSystems((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Erro ao apagar o sistema.')
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
          Adicionar sistema
        </button>
      </div>

      {systems.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint">
            <Server className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
            Nenhum sistema interno registado ainda
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Use "Adicionar sistema" para registar o link do CRM, ERP, ou qualquer outra
            ferramenta interna.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => {
            const Icon = getIcon(system.icon)
            return (
              <div
                key={system.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-all hover:border-mint/40 hover:shadow-xl hover:shadow-black/20"
              >
                <a href={system.href} target="_blank" rel="noopener noreferrer" className="flex flex-1 flex-col">
                  {system.previewImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={system.previewImage}
                      alt={`Pré-visualização de ${system.name}`}
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
                      {system.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {system.description}
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-2 border-t border-line px-6 pb-6 pt-4">
                  <button
                    type="button"
                    onClick={() => openEdit(system)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-paper-muted hover:text-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(system.id)}
                    disabled={deletingId === system.id}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {deletingId === system.id ? 'A apagar...' : 'Apagar'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Adicionar sistema">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-400">{error}</p>}

          <div>
            <label htmlFor="sys-name" className="mb-2 block text-sm font-medium text-foreground">
              Nome
            </label>
            <input
              id="sys-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Metabase"
              required
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          <div>
            <label htmlFor="sys-desc" className="mb-2 block text-sm font-medium text-foreground">
              Descrição
            </label>
            <input
              id="sys-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Curta descrição do sistema"
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          <div>
            <label htmlFor="sys-href" className="mb-2 block text-sm font-medium text-foreground">
              Link
            </label>
            <input
              id="sys-href"
              type="url"
              value={href}
              onChange={(e) => setHref(e.target.value)}
              placeholder="https://..."
              required
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          <div>
            <label htmlFor="sys-image" className="mb-2 block text-sm font-medium text-foreground">
              Imagem de pré-visualização (opcional)
            </label>
            <input
              id="sys-image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none file:mr-3 file:rounded-full file:border-0 file:bg-mint/15 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-mint transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
            <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
              <ImagePlus className="h-3.5 w-3.5" />
              Ex.: screenshot do painel. Máximo 5MB.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'A registar...' : 'Registar sistema'}
          </button>
        </form>
      </Modal>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title="Editar sistema">
        <form onSubmit={handleUpdate} className="space-y-4">
          {error && <p className="text-sm text-red-400">{error}</p>}

          <div>
            <label htmlFor="sys-edit-name" className="mb-2 block text-sm font-medium text-foreground">
              Nome
            </label>
            <input
              id="sys-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          <div>
            <label htmlFor="sys-edit-desc" className="mb-2 block text-sm font-medium text-foreground">
              Descrição
            </label>
            <input
              id="sys-edit-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          <div>
            <label htmlFor="sys-edit-href" className="mb-2 block text-sm font-medium text-foreground">
              Link
            </label>
            <input
              id="sys-edit-href"
              type="url"
              value={href}
              onChange={(e) => setHref(e.target.value)}
              required
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>

          <div>
            <label htmlFor="sys-edit-image" className="mb-2 block text-sm font-medium text-foreground">
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
              id="sys-edit-image"
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
