import { ArrowRight, Check, X } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'

// Só situações que o agente resolve hoje, sem números inventados.
const WITHOUT = [
  'A loja fecha e as mensagens ficam por responder até ao dia seguinte.',
  'A mesma pergunta de preço é respondida à mão, vezes sem conta.',
  'O cliente interessado espera, esfria e compra noutro lado.',
  'Pedidos e contactos acabam espalhados entre telemóveis e folhas.',
]

const WITH = [
  'O agente responde de imediato, de noite e ao fim-de-semana.',
  'Dá o preço, confirma o stock e calcula a entrega.',
  'Envia a referência M-Pesa e deixa a entrega marcada.',
  'Passa à equipa só o que precisa de uma pessoa, com a conversa registada.',
]

export function BeforeAfter() {
  return (
    <section id="antes-e-depois" className="scroll-mt-16 bg-[var(--field-sand)] text-[#1e2158]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="poster text-[clamp(2rem,4.6vw,5rem)]">
            <span className="block">Um dia normal,</span>
            <span className="block text-[var(--field-gold)]">com e sem agente.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full border border-[#1e2158]/15 bg-white p-6 lg:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-[#1e2158]/70">Sem agente</p>
              <ul className="mt-6 space-y-4">
                {WITHOUT.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-lg leading-snug text-[#1e2158]/90">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1e2158]/10">
                      <X className="h-4 w-4 text-[#1e2158]/70" aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full bg-[#1e2158] p-6 text-white lg:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-[var(--field-gold)]">Com agente</p>
              <ul className="mt-6 space-y-4">
                {WITH.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-lg font-medium leading-snug">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--field-gold)]">
                      <Check className="h-4 w-4 text-[#1e2158]" aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <PillButton href="/diagnostico" variant="gold">
            Ver o que o agente faria na sua empresa
            <ArrowRight className="h-5 w-5" />
          </PillButton>
          <p className="text-base text-[#1e2158]/80">Diagnóstico grátis de 30 minutos, sem compromisso.</p>
        </div>
      </div>
    </section>
  )
}
