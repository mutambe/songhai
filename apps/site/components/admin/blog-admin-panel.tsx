'use client'

import { useState } from 'react'
import { Pencil, Plus, Star, Trash2, X } from 'lucide-react'
import { CATEGORIES, formatDate, slugify, type ArticleWidget, type BlogCategory, type BlogPost, type BlogStatus } from '@/lib/blog'
import { RichTextEditor } from '@/components/admin/rich-text-editor'

const GRADIENT_PRESETS = [
  { label: 'Navy → Teal', value: 'from-[#122733] via-[#1b3a4b] to-[#2f6e62]' },
  { label: 'Navy → Dourado', value: 'from-[#1b3a4b] via-[#2f6e62] to-[#c89b3c]' },
  { label: 'Teal → Navy', value: 'from-[#2f6e62] via-[#1b3a4b] to-[#122733]' },
  { label: 'Navy → Teal (alt)', value: 'from-[#122733] via-[#2f6e62] to-[#1b3a4b]' },
  { label: 'Teal → Dourado', value: 'from-[#2f6e62] via-[#c89b3c] to-[#1b3a4b]' },
]

// widget: elemento interativo (calculadora, teste, etc.). O editor não o
// altera, mas tem de o devolver ao gravar, senão perdia-se.
type SectionDraft = { heading: string; body: string; widget?: ArticleWidget }

const WIDGET_LABELS: Record<ArticleWidget['type'], string> = {
  'pros-cons': 'Vantagens e desvantagens',
  checklist: 'Teste rápido',
  'roi-calculator': 'Calculadora de retorno',
  tabs: 'Separadores',
}

type Draft = {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  tags: string
  status: BlogStatus
  publishedAt: string
  readingTime: string
  author: string
  gradient: string
  coverImage: string
  featured: boolean
  lead: string
  sections: SectionDraft[]
  quote: string
  calloutTitle: string
  calloutBody: string
}

function toDatetimeLocal(iso: string): string {
  const d = new Date(iso)
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

function fromDatetimeLocal(value: string): string {
  return new Date(value).toISOString()
}

function emptyDraft(): Draft {
  return {
    slug: '',
    title: '',
    excerpt: '',
    category: CATEGORIES[0],
    tags: '',
    status: 'draft',
    publishedAt: toDatetimeLocal(new Date().toISOString()),
    readingTime: '5 min',
    author: 'Phill Muthambe',
    gradient: GRADIENT_PRESETS[0].value,
    coverImage: '',
    featured: false,
    lead: '',
    sections: [{ heading: '', body: '' }],
    quote: '',
    calloutTitle: '',
    calloutBody: '',
  }
}

function postToDraft(post: BlogPost): Draft {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: (post.tags || []).join(', '),
    status: post.status,
    publishedAt: toDatetimeLocal(post.publishedAt),
    readingTime: post.readingTime,
    author: post.author,
    gradient: post.gradient,
    coverImage: post.coverImage || '',
    featured: !!post.featured,
    lead: post.content.lead,
    sections: post.content.sections.map((s) => ({ heading: s.heading, body: s.body, widget: s.widget })),
    quote: post.content.quote || '',
    calloutTitle: post.content.callout?.title || '',
    calloutBody: post.content.callout?.body || '',
  }
}

function draftToPayload(draft: Draft) {
  return {
    title: draft.title.trim(),
    excerpt: draft.excerpt.trim(),
    category: draft.category,
    tags: draft.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    status: draft.status,
    publishedAt: fromDatetimeLocal(draft.publishedAt),
    readingTime: draft.readingTime.trim(),
    author: draft.author.trim(),
    gradient: draft.gradient.trim(),
    ...(draft.coverImage.trim() ? { coverImage: draft.coverImage.trim() } : {}),
    featured: draft.featured,
    content: {
      lead: draft.lead.trim(),
      sections: draft.sections
        .filter((s) => s.heading.trim() || s.body.trim() || s.widget)
        .map((s) => ({ heading: s.heading.trim(), body: s.body, ...(s.widget ? { widget: s.widget } : {}) })),
      ...(draft.quote.trim() ? { quote: draft.quote.trim() } : {}),
      ...(draft.calloutTitle.trim() && draft.calloutBody.trim()
        ? { callout: { title: draft.calloutTitle.trim(), body: draft.calloutBody.trim() } }
        : {}),
    },
  }
}

export function BlogAdminPanel({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [editing, setEditing] = useState<Draft | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const startCreate = () => {
    setEditing(emptyDraft())
    setIsNew(true)
    setError('')
  }

  const startEdit = (post: BlogPost) => {
    setEditing(postToDraft(post))
    setIsNew(false)
    setError('')
  }

  const cancel = () => {
    setEditing(null)
    setError('')
  }

  const handleDelete = async (post: BlogPost) => {
    if (!window.confirm(`Apagar o artigo "${post.title}"? Esta ação não pode ser desfeita.`)) return
    try {
      const res = await fetch(`/api/admin/blog/posts/${post.slug}`, { method: 'DELETE' })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error(json?.error || 'Não foi possível apagar o artigo.')
      setPosts((prev) => prev.filter((p) => p.slug !== post.slug))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível apagar o artigo.')
    }
  }

  const handleSave = async () => {
    if (!editing) return
    setError('')

    if (!editing.title.trim() || !editing.excerpt.trim() || !editing.lead.trim()) {
      setError('Preencha pelo menos o título, o resumo e a introdução.')
      return
    }

    setSaving(true)
    try {
      const payload = draftToPayload(editing)
      if (isNew) {
        const res = await fetch('/api/admin/blog/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, slug: editing.slug.trim() || undefined }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Não foi possível criar o artigo.')
        setPosts((prev) => [json.post, ...prev])
      } else {
        const res = await fetch(`/api/admin/blog/posts/${editing.slug}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Não foi possível guardar o artigo.')
        setPosts((prev) => prev.map((p) => (p.slug === editing.slug ? json.post : p)))
      }
      setEditing(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível guardar o artigo.')
    } finally {
      setSaving(false)
    }
  }

  if (editing) {
    return (
      <BlogEditor
        draft={editing}
        isNew={isNew}
        saving={saving}
        error={error}
        onChange={setEditing}
        onCancel={cancel}
        onSave={handleSave}
      />
    )
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="button"
        onClick={startCreate}
        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg"
      >
        <Plus className="h-4 w-4" />
        Novo artigo
      </button>

      {posts.length === 0 && (
        <p className="mt-6 text-sm text-ink-soft">Ainda não há artigos.</p>
      )}

      <div className="space-y-3">
        {posts.map((post) => {
          const scheduled = post.status === 'published' && new Date(post.publishedAt) > new Date()
          return (
            <div
              key={post.slug}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-paper p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-serif text-lg font-semibold text-foreground">{post.title}</p>
                  {post.featured && <Star className="h-4 w-4 fill-gold text-gold" />}
                  {post.status === 'draft' && (
                    <span className="rounded-full bg-paper-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-ink-soft">
                      Rascunho
                    </span>
                  )}
                  {scheduled && (
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-gold">
                      Agendado
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-soft">
                  {post.category} · {formatDate(post.publishedAt)} · /blog/{post.slug}
                </p>
                {post.tags?.length > 0 && (
                  <p className="mt-1 text-xs text-ink-soft">{post.tags.join(', ')}</p>
                )}
                {post.updatedBy && (
                  <p className="mt-1 text-xs text-ink-soft">
                    Última edição por {post.updatedBy}
                    {post.updatedAt && ` em ${new Date(post.updatedAt).toLocaleString('pt-PT')}`}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(post)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post)}
                  className="inline-flex items-center justify-center rounded-full border border-line p-2 text-ink-soft transition-colors hover:border-red-400/40 hover:text-red-500"
                  aria-label="Apagar"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BlogEditor({
  draft,
  isNew,
  saving,
  error,
  onChange,
  onCancel,
  onSave,
}: {
  draft: Draft
  isNew: boolean
  saving: boolean
  error: string
  onChange: (draft: Draft) => void
  onCancel: () => void
  onSave: () => void
}) {
  const [uploadingCover, setUploadingCover] = useState(false)

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    onChange({ ...draft, [key]: value })

  const updateSection = (index: number, patch: Partial<SectionDraft>) => {
    const sections = draft.sections.map((s, i) => (i === index ? { ...s, ...patch } : s))
    update('sections', sections)
  }

  const addSection = () => update('sections', [...draft.sections, { heading: '', body: '' }])

  const removeSection = (index: number) =>
    update(
      'sections',
      draft.sections.filter((_, i) => i !== index),
    )

  const uploadCoverImage = async (file: File) => {
    setUploadingCover(true)
    try {
      const formData = new FormData()
      formData.set('image', file)
      const res = await fetch('/api/admin/blog/upload-image', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível enviar a imagem.')
      update('coverImage', json.url)
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Não foi possível enviar a imagem.')
    } finally {
      setUploadingCover(false)
    }
  }

  return (
    <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          {isNew ? 'Novo artigo' : 'Editar artigo'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-sand hover:text-foreground"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="space-y-5">
        <Field label="Título">
          <input
            value={draft.title}
            onChange={(e) => {
              const title = e.target.value
              update('title', title)
              if (isNew) update('slug', slugify(title))
            }}
            className={inputClass}
          />
        </Field>

        <Field label="Slug (URL: /blog/...)">
          <input
            value={draft.slug}
            onChange={(e) => update('slug', slugify(e.target.value))}
            disabled={!isNew}
            className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-60`}
          />
        </Field>

        <Field label="Resumo (aparece na lista do blog)">
          <textarea
            value={draft.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
            rows={2}
            className={inputClass}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Categoria">
            <select
              value={draft.category}
              onChange={(e) => update('category', e.target.value as BlogCategory)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tags (separadas por vírgula)">
            <input
              value={draft.tags}
              onChange={(e) => update('tags', e.target.value)}
              placeholder="IA, WhatsApp, Automação"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Estado">
            <select
              value={draft.status}
              onChange={(e) => update('status', e.target.value as BlogStatus)}
              className={inputClass}
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </Field>
          <Field label="Data de publicação">
            <input
              type="datetime-local"
              value={draft.publishedAt}
              onChange={(e) => update('publishedAt', e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        {draft.status === 'published' && new Date(fromDatetimeLocal(draft.publishedAt)) > new Date() && (
          <p className="-mt-3 text-xs text-gold">
            Data no futuro — o artigo fica agendado e só aparece no site nessa data/hora.
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tempo de leitura">
            <input
              value={draft.readingTime}
              onChange={(e) => update('readingTime', e.target.value)}
              placeholder="5 min"
              className={inputClass}
            />
          </Field>
          <Field label="Autor">
            <input
              value={draft.author}
              onChange={(e) => update('author', e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Imagem de capa (opcional — sem imagem, usa a cor abaixo)">
          {draft.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={draft.coverImage}
              alt=""
              className="mb-2 aspect-video w-full rounded-lg object-cover"
            />
          )}
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={uploadingCover}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) uploadCoverImage(file)
                e.target.value = ''
              }}
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none file:mr-3 file:rounded-full file:border-0 file:bg-mint/15 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-mint transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal"
            />
            {draft.coverImage && (
              <button
                type="button"
                onClick={() => update('coverImage', '')}
                className="shrink-0 text-xs text-ink-soft hover:text-red-500"
              >
                Remover
              </button>
            )}
          </div>
        </Field>

        <Field label="Cor de capa (usada quando não há imagem)">
          <select
            value={draft.gradient}
            onChange={(e) => update('gradient', e.target.value)}
            className={inputClass}
          >
            {GRADIENT_PRESETS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </Field>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={draft.featured}
            onChange={(e) => update('featured', e.target.checked)}
            className="h-4 w-4 rounded border-line accent-teal"
          />
          Artigo em destaque (substitui o destaque atual)
        </label>

        <Field label="Introdução (primeiro parágrafo, em destaque)">
          <textarea
            value={draft.lead}
            onChange={(e) => update('lead', e.target.value)}
            rows={3}
            className={inputClass}
          />
        </Field>

        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Secções do artigo</p>
          <div className="space-y-4">
            {draft.sections.map((section, i) => (
              <div key={i} className="rounded-2xl border border-line bg-sand/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                    Secção {i + 1}
                  </span>
                  {draft.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(i)}
                      className="text-xs text-ink-soft hover:text-red-500"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <input
                  value={section.heading}
                  onChange={(e) => updateSection(i, { heading: e.target.value })}
                  placeholder="Título da secção"
                  className={`${inputClass} mb-2`}
                />
                <RichTextEditor
                  value={section.body}
                  onChange={(html) => updateSection(i, { body: html })}
                />
                {section.widget && (
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-dashed border-teal/50 bg-teal/5 px-4 py-3">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">Elemento interativo:</span>{' '}
                      {WIDGET_LABELS[section.widget.type]}
                      <span className="block text-xs text-ink-soft">
                        Aparece no fim desta secção e é mantido ao gravar.
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => updateSection(i, { widget: undefined })}
                      className="shrink-0 text-xs text-ink-soft hover:text-red-500"
                    >
                      Remover elemento
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSection}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-teal hover:text-teal/80"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar secção
          </button>
        </div>

        <Field label="Citação em destaque (opcional)">
          <textarea
            value={draft.quote}
            onChange={(e) => update('quote', e.target.value)}
            rows={2}
            className={inputClass}
          />
        </Field>

        <div className="grid gap-3 rounded-2xl border border-line bg-sand/40 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
            Caixa de destaque (opcional)
          </p>
          <input
            value={draft.calloutTitle}
            onChange={(e) => update('calloutTitle', e.target.value)}
            placeholder="Título da caixa"
            className={inputClass}
          />
          <textarea
            value={draft.calloutBody}
            onChange={(e) => update('calloutBody', e.target.value)}
            placeholder="Texto da caixa"
            rows={2}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? 'A guardar...' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-line px-6 py-2.5 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-line bg-sand px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  )
}
