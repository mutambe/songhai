'use client'

import { useEffect, useState } from 'react'
import { Activity, AlertTriangle, Eye, Home, MousePointerClick, Percent, Target, Users } from 'lucide-react'

type Summary = {
  pageviews: number
  visitors: number
  homeViews: number
  topPaths: { path: string; count: number }[]
  referrers: { label: string; count: number }[]
  devices: { label: string; count: number }[]
}

type DailyPoint = { date: string; pageviews: number; visitors: number }
type BlogStat = { path: string; count: number }

type AnalyticsResponse =
  | { configured: true; empty: true }
  | {
      configured: true
      empty: false
      last7: Summary
      last30: Summary
      daily: DailyPoint[]
      blogStats: BlogStat[]
      leads: number
      campaigns: { label: string; count: number }[]
    }

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

function DailyChart({ data }: { data: DailyPoint[] }) {
  const max = Math.max(1, ...data.map((d) => d.pageviews))
  const width = 600
  const height = 120
  const barGap = 2
  const barWidth = data.length > 0 ? width / data.length - barGap : 0

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-32 w-full" preserveAspectRatio="none">
      {data.map((d, i) => {
        const barHeight = (d.pageviews / max) * (height - 16)
        const x = i * (barWidth + barGap)
        const y = height - barHeight
        return (
          <rect key={d.date} x={x} y={y} width={barWidth} height={barHeight} rx={1.5} className="fill-mint/70">
            <title>{`${d.date}: ${d.pageviews} visita${d.pageviews === 1 ? '' : 's'}`}</title>
          </rect>
        )
      })}
    </svg>
  )
}

function detectAnomaly(daily: DailyPoint[]) {
  if (daily.length < 9) return null
  const latest = daily[daily.length - 2]
  const baseline = daily.slice(daily.length - 9, daily.length - 2)
  const baselineAvg = baseline.reduce((sum, d) => sum + d.pageviews, 0) / baseline.length

  if (baselineAvg < 3) return null

  const diff = (latest.pageviews - baselineAvg) / baselineAvg
  if (diff >= 0.5) {
    return { date: latest.date, value: latest.pageviews, baseline: baselineAvg, direction: 'up' as const, percent: Math.round(diff * 100) }
  }
  if (diff <= -0.5) {
    return { date: latest.date, value: latest.pageviews, baseline: baselineAvg, direction: 'down' as const, percent: Math.round(diff * 100) }
  }
  return null
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
  const anomaly = hasData ? detectAnomaly(data.daily) : null

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

      {hasData && anomaly && (
        <div
          className={`mt-5 rounded-2xl border p-6 ${
            anomaly.direction === 'up' ? 'border-amber-900/40 bg-amber-950/20' : 'border-red-900/40 bg-red-950/20'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle
              className={`h-4 w-4 ${anomaly.direction === 'up' ? 'text-amber-400' : 'text-red-400'}`}
            />
            <p className={`text-sm font-medium ${anomaly.direction === 'up' ? 'text-amber-300' : 'text-red-300'}`}>
              Tráfego anómalo em {anomaly.date}
            </p>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            {fmt(anomaly.value)} páginas vistas, {Math.abs(anomaly.percent)}%{' '}
            {anomaly.direction === 'up' ? 'acima' : 'abaixo'} da média dos 7 dias anteriores (~
            {fmt(Math.round(anomaly.baseline))}).
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
          <StatTile
            icon={MousePointerClick}
            label="Cliques no CTA de diagnóstico (30 dias)"
            value={hasData ? fmt(data.last30.topPaths.find((p) => p.path === '/diagnostico')?.count || 0) : ''}
            loading={loading}
          />
          <StatTile
            icon={Target}
            label="Leads gerados (30 dias)"
            value={hasData ? fmt(data.leads) : ''}
            loading={loading}
          />
          <StatTile
            icon={Percent}
            label="Taxa de conversão (visitante → lead)"
            value={hasData ? (data.last30.visitors > 0 ? `${((data.leads / data.last30.visitors) * 100).toFixed(1)}%` : '-') : ''}
            loading={loading}
          />
        </div>
      )}

      {hasData && data.daily.length > 0 && (
        <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
          <p className="text-sm font-medium text-foreground">
            Evolução de páginas vistas (30 dias)
          </p>
          <DailyChart data={data.daily} />
          <div className="mt-2 flex justify-between text-xs text-ink-soft">
            <span>{data.daily[0]?.date}</span>
            <span>{data.daily[data.daily.length - 1]?.date}</span>
          </div>
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

      {hasData && data.blogStats.length > 0 && (
        <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
          <p className="text-sm font-medium text-foreground">
            Artigos do blog mais vistos (30 dias)
          </p>
          <ul className="mt-4 space-y-2.5">
            {data.blogStats.map(({ path, count }) => (
              <li key={path} className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">{path.replace('/blog/', '')}</span>
                <span className="font-medium text-foreground">{fmt(count)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasData && data.last30.referrers.length > 0 && (
        <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
          <p className="text-sm font-medium text-foreground">
            Origem do tráfego (30 dias)
          </p>
          <ul className="mt-4 space-y-2.5">
            {data.last30.referrers.map(({ label, count }) => (
              <li key={label} className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">{label}</span>
                <span className="font-medium text-foreground">{fmt(count)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasData && data.last30.devices.length > 0 && (
        <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
          <p className="text-sm font-medium text-foreground">
            Dispositivo (30 dias)
          </p>
          <ul className="mt-4 space-y-2.5">
            {data.last30.devices.map(({ label, count }) => (
              <li key={label} className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">{label}</span>
                <span className="font-medium text-foreground">{fmt(count)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasData && data.campaigns.length > 0 && (
        <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
          <p className="text-sm font-medium text-foreground">
            Origem por campanha (30 dias)
          </p>
          <ul className="mt-4 space-y-2.5">
            {data.campaigns.map(({ label, count }) => (
              <li key={label} className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">{label}</span>
                <span className="font-medium text-foreground">{fmt(count)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  )
}
