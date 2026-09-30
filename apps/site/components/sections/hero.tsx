'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { PillButton } from '@/components/pill-button'
import { WhatsAppDemo } from '@/components/motion/whatsapp-demo'
import { formatMZN, getPlan } from '@/lib/plans'

const STARTING_PRICE = formatMZN(getPlan('simples').monthly)

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
})

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 30% 0%, rgba(200,155,60,0.10), transparent 70%), radial-gradient(50% 40% at 85% 40%, rgba(47,110,98,0.10), transparent 70%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8 lg:pt-24">
        <div className="text-center lg:text-left">
          <motion.p
            {...fadeUp(0)}
            className="mb-5 text-sm font-medium uppercase tracking-wider text-teal"
          >
            Agência de IA e automação · Maputo
          </motion.p>

          <motion.h1
            {...fadeUp(0.05)}
            className="text-balance font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            O seu WhatsApp a responder, qualificar e vender{' '}
            <span className="relative inline-block">
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-[-4px] bottom-1 -z-10 h-[0.55em] origin-left rounded-sm bg-gold/55"
              />
              24h por dia
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.15)}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft lg:mx-0"
          >
            Criamos agentes de IA que atendem os seus clientes mesmo quando a
            equipa está ocupada ou a loja fechada — e automatizamos o trabalho
            repetitivo que fica por trás.
          </motion.p>

          <motion.ul
            {...fadeUp(0.22)}
            className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium text-indigo-deep lg:mx-0 lg:justify-start"
          >
            {[`A partir de ${STARTING_PRICE}/mês`, 'Pronto em 30 dias', 'Suporte incluído'].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-teal" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            {...fadeUp(0.3)}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <PillButton href="/diagnostico" variant="gold">
              Diagnóstico grátis de 30 min
              <ArrowRight className="h-4 w-4" />
            </PillButton>
            <PillButton href="/precos" variant="outline">
              Ver preços
            </PillButton>
          </motion.div>

          <motion.p {...fadeUp(0.4)} className="mt-5 text-sm text-ink-soft/80">
            Sem compromisso · recebe um relatório em PDF com as oportunidades
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <WhatsAppDemo />
        </motion.div>
      </div>
    </section>
  )
}
