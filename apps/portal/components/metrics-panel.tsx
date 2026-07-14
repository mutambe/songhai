'use client'

import { useEffect, useState } from 'react'
import { Activity, Eye, Home, Users } from 'lucide-react'

type Summary = {
  pageviews: number
  visitors: number
  homeViews: number
  topPaths: { path: string; count: number }[]
}

type AnalyticsResponse =
  | { configured: true; empty: true }
  | { configured: true; empty: false; last7: Summary; last30: Summary }

function StatTile({
  icon: Icon,
  label,
  value,
  loading,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  loading: boolean
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint/10 text-mint">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-sm text-ink-soft">{label}</p>
      <p className="mt-1 font-serif text-3xl font-semibold text-foreground">
        {loading ? '—' : value}
      </p>
    </div>
  )
}

export function MetricsPanel() {
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setErr(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const fmt = (n: number) => n.toLocaleString('pt-PT')
  const hasData = data && data.configured && !data.empty

  return (
    <section>
      <p className="mb-3 text-sm font-medium uppercase tracking-wider text-mint">Métricas</p>
      <h2 className="font-serif text-2xl font-semibold text-foreground">
        Visitas do site principal
      </h2>

      {err && (
        <div className="mt-5 rounded-2xl border border-red-900/40 bg-red-950/20 p-6">
          <p className="text-sm text-red-300">Erro ao carregar as métricas.</p>
        </div>
      )}

      {!err && data && data.empty && (
        <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
          <p className="text-sm text-ink-soft">
            Ainda sem dados. Assim que o site principal começar a enviar visitas para{' '}
            <code className="rounded bg-paper-muted px-1.5 py-0.5 text-xs">/api/track</code>, as
            métricas aparecem aqui automaticamente.
          </p>
        </div>
      )}

      {(loading || hasData) && !err && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            icon={Eye}
            label="Páginas vistas (7 dias)"
            value={hasData ? fmt(data.last7.pageviews) : ''}
            loading={loading}
          />
          <StatTile
            icon={Users}
            label="Visitantes (7 dias)"
            value={hasData ? fmt(data.last7.visitors) : ''}
            loading={loading}
          />
          <StatTile
            icon={Activity}
            label="Páginas vistas (30 dias)"
            value={hasData ? fmt(data.last30.pageviews) : ''}
            loading={loading}
          />
          <StatTile
            icon={Home}
            label="Página inicial (30 dias)"
            value={hasData ? fmt(data.last30.homeViews) : ''}
            loading={loading}
          />
        </div>
      )}

      {hasData && data.last30.topPaths.length > 0 && (
        <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
          <p className="text-sm font-medium text-foreground">
            Páginas mais visitadas (30 dias)
          </p>
          <ul className="mt-4 space-y-2.5">
            {data.last30.topPaths.map(({ path, count }) => (
              <li key={path} className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">{path}</span>
                <span className="font-medium text-foreground">{fmt(count)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
