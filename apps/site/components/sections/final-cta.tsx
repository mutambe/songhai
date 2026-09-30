'use client'

import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'

export function FinalCta() {
  return (
    <section id="contacto" className="scroll-mt-20 px-5 pb-24 pt-4 lg:px-8">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-panel px-6 py-16 text-center text-panel-foreground sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 60% at 50% 0%, rgba(200,155,60,0.18), transparent 70%)',
            }}
          />
          <div className="relative">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gold">
              Vamos começar
            </p>
            <h2 className="mx-auto max-w-2xl text-balance font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Comece a automatizar a sua empresa hoje
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-panel-foreground/75">
              Um diagnóstico gratuito de 30 minutos é suficiente para descobrir
              quanto tempo pode recuperar. Sem compromisso.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PillButton
                href="/diagnostico"
                variant="gold"
              >
                Diagnóstico gratuito de 30 minutos
                <ArrowRight className="h-4 w-4" />
              </PillButton>
            </div>
            <p className="mt-6 text-sm text-panel-foreground/60">
              Prefere conversar já?{' '}
              <a
                href="https://wa.me/258848986002"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-panel-foreground"
              >
                WhatsApp +258 84 898 6002
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
