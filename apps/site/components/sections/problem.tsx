'use client'

import { X } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'

const TASKS = [
  'Responder a e-mails e mensagens repetitivas',
  'Qualificar leads no WhatsApp',
  'Copiar dados entre sistemas',
  'Gerar relatórios atrasados',
  'Agendar reuniões e follow-ups',
  'Processar faturas manualmente',
]

export function Problem() {
  return (
    <section id="problema" className="bg-panel text-panel-foreground">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gold">
            O problema
          </p>
          <h2 className="max-w-3xl text-balance font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            A sua equipa passa horas por semana em tarefas que a IA resolve em
            segundos
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
          {TASKS.map((task) => (
            <RevealItem
              key={task}
              className="flex items-center gap-4 rounded-2xl border border-panel-foreground/10 bg-panel-foreground/[0.04] px-5 py-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15">
                <X className="h-4 w-4 text-gold" />
              </span>
              <span className="text-panel-foreground/85">{task}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-pretty font-serif text-xl italic leading-relaxed text-panel-foreground/80">
            Cada hora gasta em tarefas manuais é uma hora que não é dedicada a
            crescer o seu negócio.
          </p>
          <div className="mt-8">
            <PillButton href="/#solucoes" variant="gold">
              Quero resolver isto
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
