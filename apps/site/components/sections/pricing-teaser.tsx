import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { PillButton } from '@/components/pill-button'
import { PLAN_PRICES, formatMZN, formatNumber, getPlan, setupLabel } from '@/lib/plans'

// A oferta numa frase, com o preço num bloco de cor, e os três pacotes lado a lado.
export function PricingTeaser() {
  const entry = getPlan('simples')

  return (
    <section
      id="precos"
      className="scroll-mt-16 bg-[var(--field-indigo)] px-5 py-16 text-white lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <h2 className="poster text-[clamp(2rem,4.6vw,5rem)] lg:col-span-7">
            <span className="block">Agente desde</span>
            <span className="block">
              <span className="inline-block bg-[var(--field-gold)] px-[0.15em] text-[#1e2158]">
                {formatNumber(entry.monthly)} MZN
              </span>
              /mês.
            </span>
          </h2>

          <div className="lg:col-span-5">
            <p className="max-w-[46ch] text-lg leading-snug text-white/90">
              Preço de um agente de IA no WhatsApp, publicado em meticais. Inclui
              configuração, piloto de teste e suporte. O valor final é confirmado
              no diagnóstico, antes de qualquer compromisso.
            </p>
            <p className="mt-4 flex max-w-[46ch] items-start gap-3 text-base leading-snug text-white/90">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--field-gold)]" aria-hidden="true" />
              <span>
                <strong className="font-bold text-white">Garantia:</strong> se não poupar pelo
                menos 10 horas por mês no primeiro trimestre, devolvemos a diferença em crédito.
              </span>
            </p>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {PLAN_PRICES.map((plan) => (
            <li
              key={plan.id}
              className="flex flex-col border border-white/15 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.08]"
            >
              <p className="text-sm font-bold uppercase tracking-wider text-white/70">{plan.shortName}</p>
              <p className="mt-3 text-4xl font-black leading-none text-[var(--field-gold)]">
                {formatNumber(plan.monthly)}
                <span className="ml-2 text-base font-bold text-white">MZN/mês</span>
              </p>
              <p className="mt-3 border-t border-white/15 pt-3 text-base text-white/90">
                Setup: {setupLabel(plan, true)} (único)
              </p>
              <p className="mt-2 text-base leading-snug text-white/80">{plan.audience}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <PillButton href="/precos" variant="gold">
            Ver tabela completa
            <ArrowRight className="h-5 w-5" />
          </PillButton>
          <Link
            href="/diagnostico"
            className="text-lg font-bold underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            Pedir diagnóstico grátis
          </Link>
        </div>
      </div>
    </section>
  )
}
