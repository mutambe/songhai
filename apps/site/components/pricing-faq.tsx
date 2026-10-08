'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    q: 'Posso começar só com um teste de 1 mês?',
    a: 'Sim. Piloto de 1 mês: setup grátis, primeiro mês com 50% de desconto. Se funcionar para si, continua no preço regular. Se não, cancelamos. E se, no primeiro trimestre, não poupar pelo menos 10 horas/mês, devolvemos a diferença em crédito.',
  },
  {
    q: 'E se quiser cancelar depois?',
    a: 'Zero penalidade. Pode cancelar em qualquer mês, sem custo de cancelamento.',
  },
  {
    q: 'Vocês fazem desconto?',
    a: 'Sim, de três formas: 10% de desconto pagando 6 meses antecipados, ou 15% pagando 12 meses; 20% no segundo agente e 30% no terceiro; e condições especiais para equipas com 50+ pessoas, negociadas caso a caso.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Varia por plano: Simples é em horário laboral (seg-sex, 9h-17h); Médio tem resposta prioritária em menos de 2 horas em horário laboral; Avançado tem resposta VIP em menos de 1 hora em horário laboral, com cobertura 24/7 para incidentes críticos. Para urgências, WhatsApp +258 84 898 6002.',
  },
  {
    q: 'O que são os tokens incluídos no plano?',
    a: 'Os tokens medem o consumo do agente e do SonghaiCRM. Todos os meses o plano inclui um número de tokens; se o consumo ultrapassar esse valor, o excedente é cobrado à parte. Cada plano inclui também 1 número de WhatsApp — números adicionais são sob consulta, porque cada um acresce custos de API.',
  },
  {
    q: 'Posso aumentar ou diminuir o plano depois?',
    a: 'Sim, sem penalidade. Pode começar com o plano Simples e mudar para o Médio ou Avançado mais tarde — paga só a diferença.',
  },
  {
    q: 'O que está incluído no suporte?',
    a: 'Resolução de problemas técnicos, ajustes básicos (como o texto de resposta do agente) e dúvidas sobre como usar o sistema. Não inclui desenvolvimento à medida, consultoria estratégica, ou integração com um sistema novo — esses são vendidos como add-on.',
  },
  {
    q: 'Qual plano recomendam para o meu negócio?',
    a: 'O diagnóstico gratuito ajuda a decidir com precisão. Como regra geral: Simples para responder perguntas comuns; Médio para qualificar leads e agendar com CRM envolvido; Avançado para processar pedidos com múltiplas integrações. Na dúvida, comece pelo Simples — a mudança de plano é fácil.',
  },
]

export function PricingFaq() {
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
