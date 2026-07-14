'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

const FAQS = [
  {
    q: 'O que é um agente de IA?',
    a: 'É um assistente digital que compreende linguagem natural e realiza tarefas por si — responder a clientes, qualificar leads ou agendar reuniões — de forma autónoma e no tom da sua marca.',
  },
  {
    q: 'Qual a diferença entre automação e IA?',
    a: 'A automação segue regras fixas para tarefas repetitivas. A IA interpreta contexto e linguagem para tomar decisões. Na prática, combinamos as duas: a IA decide e a automação executa.',
  },
  {
    q: 'Preciso de uma equipa técnica para começar?',
    a: 'Não. A Songhai trata de toda a parte técnica e forma a sua equipa para usar as soluções. Você foca-se no negócio, nós na tecnologia.',
  },
  {
    q: 'Quanto tempo demora a implementação?',
    a: 'Depende do projeto, mas as primeiras automações costumam entrar em funcionamento em poucas semanas. Começamos sempre por soluções de impacto rápido.',
  },
  {
    q: 'A IA vai substituir a minha equipa?',
    a: 'Não. O objetivo é libertar a sua equipa das tarefas manuais e repetitivas, para que dedique tempo ao que exige julgamento humano e gera mais valor.',
  },
  {
    q: 'Qual é o investimento?',
    a: 'Varia com o âmbito. Começamos com um diagnóstico gratuito para estimar o retorno antes de qualquer compromisso. Temos também planos de AI Partner fracionado a partir de 8h/mês.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
            Perguntas frequentes
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Tudo o que precisa de saber
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span className="font-serif text-lg font-medium text-foreground">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-indigo-deep transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-gold' : ''
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-12 leading-relaxed text-ink-soft">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
