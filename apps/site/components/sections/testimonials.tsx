'use client'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'

type Testimonial = {
  quote: string
  role: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'O agente responde no WhatsApp enquanto estamos a atender clientes na loja. Deixámos de perder pedidos fora do horário.',
    role: 'Dono de loja de material de construção, Maputo',
  },
  {
    quote:
      'Já não passamos a manhã a copiar marcações do WhatsApp para a agenda. O agente faz isso sozinho.',
    role: 'Gestora de clínica, Matola',
  },
  {
    quote:
      'A equipa comercial só fala com quem já está qualificado. O resto o agente trata primeiro.',
    role: 'Diretor comercial, Beira',
  },
]

export function Testimonials() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
            Clientes
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            O que dizem quem já usa
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.role}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-line bg-sand p-6">
                <blockquote className="text-sm leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-xs font-medium uppercase tracking-wide text-teal">
                  {t.role}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
