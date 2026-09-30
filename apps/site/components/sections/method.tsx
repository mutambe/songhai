'use client'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { ConnectedDiagram } from '@/components/sections/connected-diagram'

const STEPS = [
  {
    letter: 'M',
    title: 'Mapear',
    desc: 'Auditamos os seus processos e identificamos onde a IA gera mais impacto.',
  },
  {
    letter: 'A',
    title: 'Automatizar',
    desc: 'Desenhamos e construímos os agentes e automações à medida do seu negócio.',
  },
  {
    letter: 'I',
    title: 'Integrar',
    desc: 'Ligamos tudo — WhatsApp, e-mail, CRM e bases de dados — num só fluxo.',
  },
  {
    letter: 'E',
    title: 'Escalar',
    desc: 'Monitorizamos, ajustamos e expandimos as soluções à medida que cresce.',
  },
]

export function Method() {
  return (
    <section id="metodo" className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
                Método Songhai
              </p>
              <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                Um caminho claro do problema ao resultado
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
                Não entregamos e desaparecemos: trabalhamos com a sua equipa,
                nos seus processos reais, e medimos o resultado em horas
                recuperadas.
              </p>
            </Reveal>

            <RevealGroup className="relative mt-12">
              <div
                aria-hidden="true"
                className="absolute left-6 top-2 h-[calc(100%-2rem)] w-px border-l-2 border-dashed border-gold/40"
              />
              <div className="space-y-8">
                {STEPS.map((step) => (
                  <RevealItem key={step.letter} className="relative flex gap-6">
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-sand font-serif text-xl font-semibold text-indigo-deep">
                      {step.letter}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-serif text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-pretty leading-relaxed text-ink-soft">
                        {step.desc}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </div>
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
