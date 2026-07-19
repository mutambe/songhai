'use client'

import { Building2, TrendingUp, Route, HeartHandshake } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { ConnectedDiagram } from '@/components/sections/connected-diagram'

const PILLARS = [
  {
    icon: Building2,
    title: 'Dentro do seu negócio',
    desc: 'Não entregamos e desaparecemos. Trabalhamos junto da sua equipa, com os seus processos reais.',
  },
  {
    icon: TrendingUp,
    title: 'ROI do tempo',
    desc: 'Medimos o impacto em horas recuperadas e valor gerado — não em funcionalidades técnicas.',
  },
  {
    icon: Route,
    title: 'Método Songhai',
    desc: 'Um processo claro em quatro fases: mapear, automatizar, integrar e escalar.',
  },
  {
    icon: HeartHandshake,
    title: 'Compromisso de longo prazo',
    desc: 'Acompanhamos, ajustamos e expandimos as soluções à medida que o seu negócio cresce.',
  },
]

export function Transformation() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
                Parceiro de transformação
              </p>
              <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Ligamos tudo — e o seu negócio passa a funcionar em conjunto
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
                WhatsApp, e-mail, CRM e bases de dados deixam de ser ilhas. A
                Songhai integra as melhores IAs do mercado num único centro
                que conecta os seus sistemas.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
              {PILLARS.map((p) => {
                const Icon = p.icon
                return (
                  <RevealItem
                    key={p.title}
                    className="rounded-2xl border border-line bg-paper p-5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand text-teal">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {p.desc}
                    </p>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>

          <Reveal delay={0.1} className="flex w-full justify-center">
            <ConnectedDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
