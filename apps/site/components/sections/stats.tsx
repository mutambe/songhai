'use client'

import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { formatNumber, getPlan } from '@/lib/plans'

// Só compromissos que a Songhai controla e cumpre — nada de estatísticas de
// terceiros sem fonte.
const STATS = [
  {
    value: '24/7',
    label: 'Atendimento no WhatsApp, mesmo com a loja fechada',
  },
  {
    value: '30 dias',
    label: 'Do diagnóstico ao agente a funcionar',
  },
  {
    value: formatNumber(getPlan('simples').monthly),
    unit: 'MZN/mês',
    label: 'Preço de entrada publicado — sem orçamentos escondidos',
  },
  {
    value: '10h',
    unit: '/mês',
    label: 'Garantia: se não as poupar no 1.º trimestre, devolvemos a diferença em crédito',
  },
]

export function Stats() {
  return (
    <section className="border-y border-line bg-paper">
      <RevealGroup className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat) => (
          <RevealItem
            key={stat.label}
            className="flex flex-col items-center px-2 text-center"
          >
            <span className="font-serif text-4xl font-semibold text-indigo-deep sm:text-5xl">
              {stat.value}
              {stat.unit && (
                <span className="ml-1 font-sans text-base font-medium text-ink-soft">
                  {stat.unit}
                </span>
              )}
            </span>
            <span className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ink-soft">
              {stat.label}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
