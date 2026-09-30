'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { formatMZN, getPlan } from '@/lib/plans'

const FAQS = [
  {
    q: 'Quanto custa a auditoria/diagnóstico?',
    a: 'Grátis. Não há custo. É no nosso interesse entender o vosso negócio.',
  },
  {
    q: 'Quanto tempo demora?',
    a: '30 minutos. Focamos, não andamos à volta. Depois recebe o relatório (enviamos em 24h).',
  },
  {
    q: 'Depois do diagnóstico, qual é o custo de avançar?',
    a: `Depende da complexidade. Enviamos proposta clara com preço fixo. Os planos começam em ${formatMZN(getPlan('simples').monthly)}/mês — veja a tabela completa em Preços.`,
  },
  {
    q: 'Preciso saber de tecnologia para o diagnóstico?',
    a: 'Não. Explica-nos como funciona hoje. Nós fazemos a parte técnica.',
  },
  {
    q: 'Vão tentar forçar-me a comprar algo?',
    a: 'Não. Mostramos oportunidades. A decisão é sua. Oferecemos proposta clara, mas sem pressão.',
  },
  {
    q: 'Como é o suporte depois de implementar?',
    a: 'Suporte 24/7 está incluído. Problemas técnicos: resposta em menos de 4 horas. Revisão mensal com otimizações.',
  },
  {
    q: 'E se mudar de ideia após 1 mês?',
    a: 'Sem problema. Cada cliente tem 30 dias de teste. Se não vir valor, cancelamos sem penalidade.',
  },
  {
    q: 'Vocês trabalham só em Maputo?',
    a: 'Somos baseados em Maputo, mas atendemos todo Moçambique — Beira, Nampula, Chimoio, Gaza. Reuniões online ou presenciais.',
  },
  {
    q: 'Como funciona o agendamento?',
    a: 'Após submeter o formulário, recebe um email com o link de calendário. Escolhe a hora que melhor convém.',
  },
  {
    q: 'Qual é a melhor forma de falar convosco antes do diagnóstico?',
    a: 'WhatsApp: +258 84 898 6002 (mais rápido). Email: info@songhai.cc.',
  },
]

export function DiagnosticoFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-line border-y border-line">
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
  )
}
