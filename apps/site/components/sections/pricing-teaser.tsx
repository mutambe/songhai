'use client'

import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PLAN_PRICES, formatMZN, setupLabel } from '@/lib/plans'

export function PricingTeaser() {
  return (
    <section id="precos" className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
            Preços
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Preços publicados, em meticais
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
            Sem pedir orçamento para saber quanto custa. O valor final é
            confirmado no diagnóstico, antes de qualquer compromisso.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {PLAN_PRICES.map((plan) => {
            const highlight = plan.id === 'medio'
            return (
              <RevealItem key={plan.id}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                    highlight ? 'border-gold bg-sand shadow-lg shadow-gold/10' : 'border-line bg-paper'
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-indigo-deep">
                      Recomendado
                    </span>
                  )}
                  <h3 className="font-serif text-xl font-semibold text-foreground">{plan.name}</h3>
                  <p className="mt-3 text-sm text-ink-soft">A partir de</p>
                  <p className="font-serif text-3xl font-semibold text-indigo-deep">
                    {formatMZN(plan.monthly)}
                    <span className="ml-1 font-sans text-sm font-medium text-ink-soft">/mês</span>
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">Setup: {setupLabel(plan, true)} (único)</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{plan.audience}</p>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-teal/30 bg-teal/5 px-6 py-5 sm:flex-row sm:items-center">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
              <span>
                <span className="font-semibold">Garantia de resultado:</span> se não
                poupar pelo menos 10 horas/mês no primeiro trimestre, devolvemos a
                diferença em crédito.
              </span>
            </p>
            <Link
              href="/precos"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-teal hover:text-teal/80"
            >
              Ver tabela completa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
