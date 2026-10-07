'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { Check, Minus, Plus } from 'lucide-react'
import type { ArticleWidget, WeighItem } from '@/lib/blog'
import { formatMZN, formatNumber, recommendedPlan } from '@/lib/plans'
import { cn } from '@/lib/utils'

export function ArticleWidgetView({ widget }: { widget: ArticleWidget }) {
  switch (widget.type) {
    case 'pros-cons':
      return <ProsCons {...widget} />
    case 'checklist':
      return <Checklist {...widget} />
    case 'roi-calculator':
      return <RoiCalculator />
    case 'tabs':
      return <Tabs {...widget} />
  }
}

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-3xl border border-line bg-paper p-5 font-sans sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-wider text-teal">{label}</p>
      {children}
    </div>
  )
}

/* ---------- Vantagens vs. desvantagens ---------- */

function ProsCons({ question, pros, cons }: { question: string; pros: WeighItem[]; cons: WeighItem[] }) {
  const [picked, setPicked] = useState<Set<string>>(new Set())
  const toggle = (key: string) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const proCount = pros.filter((_, i) => picked.has(`p${i}`)).length
  const conCount = cons.filter((_, i) => picked.has(`c${i}`)).length
  const total = proCount + conCount
  const proShare = total ? Math.round((proCount / total) * 100) : 50

  let verdict = 'Marque o que se aplica ao seu negócio, dos dois lados. O balanço aparece aqui.'
  if (total > 0) {
    if (proShare >= 65)
      verdict = 'No seu caso, as vantagens pesam claramente mais. Vale a pena fazer as contas com números reais da sua operação.'
    else if (proShare <= 35)
      verdict = 'Para já, as desvantagens pesam mais. Pode ser melhor resolver primeiro esses pontos, ou começar por um piloto pequeno.'
    else
      verdict = 'Está equilibrado. Nestes casos, um piloto de um mês costuma tirar a dúvida melhor do que qualquer análise.'
  }

  const column = (items: WeighItem[], prefix: 'p' | 'c') => (
    <ul className="space-y-3">
      {items.map((item, i) => {
        const key = `${prefix}${i}`
        const on = picked.has(key)
        return (
          <li key={key}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => toggle(key)}
              className={cn(
                'flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors',
                on
                  ? prefix === 'p'
                    ? 'border-teal bg-teal/10'
                    : 'border-gold bg-gold/10'
                  : 'border-line hover:border-ink-soft/40',
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                  on ? (prefix === 'p' ? 'border-teal bg-teal text-paper' : 'border-gold bg-gold text-on-gold') : 'border-line',
                )}
                aria-hidden="true"
              >
                {on && <Check className="h-3 w-3" />}
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{item.detail}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )

  return (
    <Frame label="Pese você mesmo">
      <p className="mt-2 font-serif text-xl font-semibold text-foreground">{question}</p>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-teal">
            <Plus className="h-4 w-4" aria-hidden="true" /> Vantagens
          </p>
          {column(pros, 'p')}
        </div>
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold">
            <Minus className="h-4 w-4" aria-hidden="true" /> Desvantagens
          </p>
          {column(cons, 'c')}
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-sand p-4" aria-live="polite">
        <div className="flex justify-between text-xs font-medium text-ink-soft">
          <span>Vantagens: {proCount}</span>
          <span>Desvantagens: {conCount}</span>
        </div>
        <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-line">
          <div className="bg-teal transition-all duration-500" style={{ width: `${proShare}%` }} />
          <div className="bg-gold transition-all duration-500" style={{ width: `${100 - proShare}%` }} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{verdict}</p>
      </div>
    </Frame>
  )
}

/* ---------- "É para si?" ---------- */

function Checklist({
  title,
  items,
  results,
}: {
  title: string
  items: string[]
  results: { min: number; title: string; body: string }[]
}) {
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => items.map(() => null))
  const answered = answers.filter((a) => a !== null).length
  const yes = answers.filter((a) => a === true).length
  const result = [...results].sort((a, b) => b.min - a.min).find((r) => yes >= r.min)
  const done = answered === items.length

  const set = (i: number, value: boolean) =>
    setAnswers((prev) => prev.map((a, j) => (j === i ? value : a)))

  return (
    <Frame label="Teste rápido">
      <p className="mt-2 font-serif text-xl font-semibold text-foreground">{title}</p>
      <ol className="mt-5 space-y-3">
        {items.map((q, i) => (
          <li key={q} className="flex flex-col gap-3 rounded-2xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm leading-relaxed text-foreground">
              <span className="mr-2 font-semibold text-teal">{i + 1}.</span>
              {q}
            </span>
            <span className="flex shrink-0 gap-2" role="group" aria-label={`Resposta à pergunta ${i + 1}`}>
              {([true, false] as const).map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  aria-pressed={answers[i] === v}
                  onClick={() => set(i, v)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                    answers[i] === v
                      ? v
                        ? 'border-teal bg-teal text-paper'
                        : 'border-ink-soft bg-ink-soft text-paper'
                      : 'border-line text-ink-soft hover:border-ink-soft/50',
                  )}
                >
                  {v ? 'Sim' : 'Não'}
                </button>
              ))}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-6 rounded-2xl bg-sand p-4" aria-live="polite">
        {done && result ? (
          <>
            <p className="text-sm font-semibold text-foreground">
              {yes} de {items.length} · {result.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{result.body}</p>
            <Link href="/diagnostico" className="mt-3 inline-block text-sm font-semibold text-teal underline-offset-4 hover:underline">
              Confirmar com um diagnóstico gratuito de 30 minutos
            </Link>
          </>
        ) : (
          <p className="text-sm text-ink-soft">
            Respondeu a {answered} de {items.length}. O resultado aparece quando responder a todas.
          </p>
        )}
      </div>
    </Frame>
  )
}

/* ---------- Calculadora de retorno ---------- */

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix: string
  onChange: (v: number) => void
}) {
  const id = useId()
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-foreground">
          {label}
        </label>
        <span className="text-sm font-semibold text-foreground">
          {formatNumber(value)} {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--teal)]"
      />
    </div>
  )
}

function RoiCalculator() {
  const [chats, setChats] = useState(40)
  const [minutes, setMinutes] = useState(4)
  const [share, setShare] = useState(60)
  const [hourCost, setHourCost] = useState(250)
  const DAYS = 26

  const hours = (chats * minutes * (share / 100) * DAYS) / 60
  const value = hours * hourCost
  const plan = recommendedPlan(hours)
  const net = value - plan.monthly
  const payback = net > 0 ? Math.ceil(plan.setup / net) : null

  return (
    <Frame label="Calculadora">
      <p className="mt-2 font-serif text-xl font-semibold text-foreground">
        Quanto tempo e dinheiro o agente devolve no seu caso?
      </p>
      <div className="mt-5 grid gap-5">
        <Slider label="Conversas de clientes no WhatsApp por dia" value={chats} min={5} max={300} step={5} suffix="" onChange={setChats} />
        <Slider label="Minutos que a equipa gasta em cada uma" value={minutes} min={1} max={15} step={1} suffix="min" onChange={setMinutes} />
        <Slider label="Parte que o agente resolve sem ajuda" value={share} min={20} max={80} step={5} suffix="%" onChange={setShare} />
        <Slider label="Custo de uma hora de trabalho da equipa" value={hourCost} min={100} max={1000} step={25} suffix="MZN" onChange={setHourCost} />
      </div>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <div className="rounded-2xl bg-sand p-4">
          <dt className="text-xs text-ink-soft">Horas devolvidas por mês</dt>
          <dd className="mt-1 font-serif text-2xl font-semibold text-foreground">{formatNumber(hours)} h</dd>
        </div>
        <div className="rounded-2xl bg-sand p-4">
          <dt className="text-xs text-ink-soft">Valor desse tempo</dt>
          <dd className="mt-1 font-serif text-2xl font-semibold text-foreground">{formatMZN(value)}</dd>
        </div>
        <div className="rounded-2xl bg-sand p-4">
          <dt className="text-xs text-ink-soft">Plano indicado</dt>
          <dd className="mt-1 font-serif text-2xl font-semibold text-foreground">{plan.shortName}</dd>
          <dd className="text-xs text-ink-soft">{formatMZN(plan.monthly)}/mês</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-foreground">
        {net > 0 ? (
          <>
            Saldo estimado de <strong>{formatMZN(net)} por mês</strong> depois de pagar o plano
            {payback !== null && (
              <>
                , e o setup de {formatMZN(plan.setup)} recupera-se em{' '}
                <strong>{payback === 1 ? 'cerca de 1 mês' : `cerca de ${payback} meses`}</strong>
              </>
            )}
            .
          </>
        ) : (
          <>
            Com estes números, o tempo poupado ainda não paga o plano. Para volumes destes, muitas vezes compensa mais
            organizar respostas rápidas e um catálogo no WhatsApp Business antes de pensar num agente.
          </>
        )}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-ink-soft">
        Estimativa com {DAYS} dias de trabalho por mês. Não conta vendas que deixam de se perder fora de horas, que
        costumam ser o maior ganho, nem o tempo de revisão da equipa nas primeiras semanas.
      </p>
    </Frame>
  )
}

/* ---------- Separadores ---------- */

function Tabs({ title, tabs }: { title: string; tabs: { label: string; body: string }[] }) {
  const [active, setActive] = useState(0)
  const base = useId()
  return (
    <Frame label="Explore">
      <p className="mt-2 font-serif text-xl font-semibold text-foreground">{title}</p>
      <div role="tablist" aria-label={title} className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            id={`${base}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              active === i ? 'border-indigo-deep bg-indigo-deep text-sand' : 'border-line text-ink-soft hover:border-ink-soft/50',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          id={`${base}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${i}`}
          hidden={active !== i}
          className="prose prose-sm mt-5 max-w-none leading-relaxed text-ink-soft prose-strong:text-foreground prose-li:my-1"
          // HTML escrito no código (lib/blog-articles), não vem do painel.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: t.body }}
        />
      ))}
    </Frame>
  )
}

