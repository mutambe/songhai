'use client'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'

const STEPS = [
  {
    letter: 'M',
    title: 'Mapear',
    desc: 'Auditamos os seus processos e identificamos onde a IA gera mais impacto.',
  },
  {
    letter: 'A',
    title: 'Automatizar',
    desc: 'Desenhamos e construímos os agentes e automações sob medida para o seu negócio.',
  },
  {
    letter: 'I',
    title: 'Integrar',
    desc: 'Ligamos tudo — CRM, WhatsApp, e-mail e bases de dados — num só fluxo.',
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
      <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
            Método Songhai
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Um caminho claro do problema ao resultado
          </h2>
        </Reveal>

        <RevealGroup className="relative mt-16 pl-4">
          <div
            aria-hidden="true"
            className="absolute left-[calc(1rem+1.5rem)] top-2 h-[calc(100%-2rem)] w-px border-l-2 border-dashed border-gold/40"
          />
          <div className="space-y-10">
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
    </section>
  )
}
