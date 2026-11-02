'use client'

import { Reveal } from '@/components/motion/reveal'
import { formatNumber, getPlan } from '@/lib/plans'

// Só compromissos que a Songhai controla e cumpre — nada de estatísticas de
// terceiros sem fonte. Cada campo diz uma coisa, em voz alta.
const FIELDS = [
  {
    phrase: ['24 horas', 'por dia.'],
    text: 'O agente atende no WhatsApp mesmo com a loja fechada: responde ao cliente, percebe o que ele procura e marca a visita ou a entrega.',
    bg: 'bg-[var(--field-gold)] font-medium text-[#0f1130]',
    mirror: false,
  },
  {
    phrase: ['Pronto em', '30 dias.'],
    text: 'Do diagnóstico ao agente a funcionar. Primeiro um piloto de teste, só depois abrimos ao público. Se não fizer sentido, cancela sem penalizações.',
    bg: 'bg-[var(--field-night)] text-white',
    mirror: true,
  },
  {
    phrase: [`${formatNumber(getPlan('simples').monthly)} MZN`, 'por mês.'],
    text: 'Preço de entrada publicado, sem pedir orçamento. E uma garantia por escrito: se não poupar 10 horas por mês no primeiro trimestre, devolvemos a diferença em crédito.',
    bg: 'bg-[var(--field-sand)] text-[#1e2158]',
    mirror: false,
  },
]

export function Statements() {
  return (
    <section aria-label="O que prometemos">
      {FIELDS.map((f) => (
        <div
          key={f.phrase.join(' ')}
          className={`${f.bg} flex min-h-[40svh] flex-col justify-between gap-12 px-5 py-8 sm:py-10 lg:min-h-[50svh] lg:px-8`}
        >
          <Reveal className={f.mirror ? 'max-w-[34ch]' : 'max-w-[34ch] lg:ml-[58%]'}>
            <p className="text-xl leading-snug sm:text-2xl">{f.text}</p>
          </Reveal>
          <h2
            className={`poster text-[clamp(3rem,13vw,10rem)] lg:text-[clamp(4rem,8vw,9rem)] ${
              f.mirror ? 'lg:text-right' : ''
            }`}
          >
            {f.phrase.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
      ))}
    </section>
  )
}
