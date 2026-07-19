'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

const FAQS = [
  {
    q: 'Quanto custa um agente de IA?',
    a: 'Depende da complexidade. Agente simples (WhatsApp de perguntas/respostas): 5.000 MZN/mês. Agente avançado (com integrações, CRM, pagamentos): 8.000-15.000 MZN/mês. Enviamos proposta personalizada após auditoria.',
  },
  {
    q: 'Quanto tempo demora até estar live?',
    a: 'Desde diagnóstico até agente operacional: 30 dias. Diagnóstico é semana 1. Depois 3 semanas de desenvolvimento, integração e testes.',
  },
  {
    q: 'Preciso de equipa técnica?',
    a: 'Não. Você explica seus processos. Nós fazemos toda a parte técnica — design, desenvolvimento, integração. Você só precisa de uma pessoa para gerir (ela aprende connosco).',
  },
  {
    q: 'E se mudar de ideia ou não gostar?',
    a: 'Cada cliente tem 30 dias de teste. Se não vir valor, cancelamos sem penalidade. Não queremos clientes infelizes.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Suporte 24/7 incluído. Problemas técnicos: resposta em menos de 4 horas. Otimizações: revisão mensal.',
  },
  {
    q: 'Vocês também fazem integração com o meu ERP/CRM?',
    a: 'Sim. Integramos com HubSpot, Salesforce, QuickBooks, Xero, ERPs locais — tudo. Pode levar tempo extra (com custo adicional), mas é possível.',
  },
  {
    q: 'Qual é a melhor forma de contactar?',
    a: 'WhatsApp é mais rápido: +258 84 898 6002. Email: info@songhai.cc. Ou agende um diagnóstico no website.',
  },
]

const FAQ_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_STRUCTURED_DATA).replace(/</g, '\\u003c') }}
      />
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
