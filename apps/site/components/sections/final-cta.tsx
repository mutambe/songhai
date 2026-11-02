import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'
import { BUSINESS } from '@/lib/business'

// Fecho da página: a pergunta, o primeiro passo e os dois caminhos de contacto.
export function FinalCta() {
  const whatsapp = `https://wa.me/${BUSINESS.phone.replace('+', '')}`

  return (
    <section id="contacto" className="scroll-mt-16 bg-[var(--field-night)] text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="poster text-[clamp(2.2rem,6.2vw,6.5rem)]">
            <span className="block">Quer recuperar</span>
            <span className="block text-[var(--field-gold)]">horas esta semana?</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-12 lg:gap-16">
          <p className="max-w-[40ch] text-xl leading-snug text-white/90 lg:col-span-6">
            O primeiro passo é uma conversa de 30 minutos. Mostramos onde o agente
            poupa tempo na sua empresa, sem custo e sem compromisso.
          </p>

          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-4">
              <PillButton href="/diagnostico" variant="gold" className="px-8 py-4 text-lg">
                Diagnóstico grátis
                <ArrowRight className="h-5 w-5" />
              </PillButton>
              <PillButton href={whatsapp} external variant="paper" className="px-8 py-4 text-lg">
                Falar no WhatsApp
              </PillButton>
            </div>
            <ul className="mt-6 space-y-3 text-base text-white/85">
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-[var(--field-gold)]" aria-hidden="true" />
                WhatsApp {BUSINESS.phoneDisplay}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[var(--field-gold)]" aria-hidden="true" />
                <a href={`mailto:${BUSINESS.email}`} className="underline underline-offset-4">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
