'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Particles } from '@/components/motion/particles'
import { HeroDiagram } from '@/components/motion/hero-diagram'
import { PillButton } from '@/components/pill-button'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(200,155,60,0.10), transparent 70%), radial-gradient(50% 40% at 85% 30%, rgba(47,110,98,0.08), transparent 70%)',
        }}
      />
      <Particles className="absolute inset-0" />
      <HeroDiagram />
      {/* Static fallback for prefers-reduced-motion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 [@media(prefers-reduced-motion:reduce)]:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 30% 60%, rgba(185,148,31,0.15) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(24,83,71,0.12) 0%, transparent 45%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-20 text-center sm:pt-28 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-teal backdrop-blur-sm [@media(prefers-reduced-motion:reduce)]:animate-none"
        >
          Menos tarefas. Mais crescimento
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-balance font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl [@media(prefers-reduced-motion:reduce)]:animate-none"
        >
          Recupere até{' '}
          <span className="relative inline-block">
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-[-4px] bottom-1 -z-10 h-[0.55em] origin-left rounded-sm bg-gold/55 [@media(prefers-reduced-motion:reduce)]:animate-none"
            />
            70% do tempo
          </span>{' '}
          da sua equipa com IA e automação
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft [@media(prefers-reduced-motion:reduce)]:animate-none"
        >
          Criamos agentes de IA, automatizamos processos e devolvemos horas à sua
          equipa — para decisões que fazem a diferença.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row [@media(prefers-reduced-motion:reduce)]:animate-none"
        >
          <PillButton href="/#calculadora" variant="gold">
            Diagnóstico gratuito — Ver quanto posso poupar
            <ArrowRight className="h-4 w-4" />
          </PillButton>
          <PillButton href="/#problema" variant="outline-gold">
            Descobrir mais
            <ArrowDown className="h-4 w-4" />
          </PillButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 text-sm text-ink-soft/80"
        >
          Sem compromisso · 100% gratuito
        </motion.p>
      </div>
    </section>
  )
}
