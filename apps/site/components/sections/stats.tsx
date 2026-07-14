'use client'

import { CountUp } from '@/components/motion/count-up'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'

const STATS = [
  {
    value: 70,
    suffix: '%',
    label: 'Tempo recuperado em 90 dias ou investimento de volta',
  },
  { value: 50, suffix: '+', label: 'Automações implementadas' },
  { text: 'MZ', label: 'Agência local, equipa em Maputo' },
  { text: '24/7', label: 'Agentes de IA sempre disponíveis' },
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
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
