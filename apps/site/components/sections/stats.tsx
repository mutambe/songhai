'use client'

import { CountUp } from '@/components/motion/count-up'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'

const STATS = [
  {
    value: 98,
    suffix: '%',
    label: 'Taxa de abertura de mensagens WhatsApp (vs. 20% em email)',
  },
  {
    value: 60,
    suffix: '%',
    label: 'Redução do volume de suporte inbound com automação',
  },
  {
    text: '2s',
    label: 'Tempo de resposta de um agente IA (vs. 4h em média humana)',
  },
  {
    value: 28,
    suffix: '%',
    label: 'Taxa de conversão com qualificação automática de leads',
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
              {'value' in stat && stat.value !== undefined ? (
                <CountUp value={stat.value} suffix={stat.suffix} />
              ) : (
                stat.text
              )}
            </span>
            <span className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ink-soft">
              {stat.label}
            </span>
            <span className="mt-1 text-xs text-ink-soft/60">
              Fonte: benchmark de indústria
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
