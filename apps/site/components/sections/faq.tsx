'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'
import { BUSINESS } from '@/lib/business'
import { formatMZN, getPlan, monthlyLabel } from '@/lib/plans'

const FAQS = [
  {
    q: 'Quanto tempo demora até estar a funcionar?',
    a: 'Agente simples (WhatsApp com respostas automáticas): 5 a 7 dias úteis após aprovada a proposta. Agente médio ou avançado (com CRM, integrações ou pagamentos): 2 a 4 semanas, dependendo da complexidade dos sistemas que já tem. Sempre começamos com um piloto de teste — o agente funciona em ambiente controlado antes de ir ao público. Aprova, ajustamos, e só depois activamos.',
  },
  {
    q: 'Quanto custa um agente de IA?',
    a: `Agente simples: ${monthlyLabel(getPlan('simples'), true)}/mês. Agente médio (com CRM): ${monthlyLabel(getPlan('medio'), true)}/mês. Agente avançado (integrações múltiplas, pagamentos): ${monthlyLabel(getPlan('avancado'), true)}/mês. O valor final depende do volume e das integrações — confirmado no diagnóstico gratuito. Todos com setup único. Veja o detalhe em Preços.`,
  },
  {
    q: 'Preciso de equipa técnica?',
    a: 'Não. Implementamos, configuramos e treinamos a sua equipa. A sua equipa só precisa de saber o que quer automatizar — nós tratamos da configuração, integrações e manutenção técnica.',
  },
  {
    q: 'Vocês também fazem integração com o meu ERP/CRM?',
    a: 'Depende do sistema. As integrações estão condicionadas a que o sistema permita a ligação (por API ou exportação de dados), a existir documentação técnica e, quando necessário, ao apoio técnico do fornecedor. Se usa um sistema próprio ou legado, avaliamos caso a caso. A auditoria grátis de 30 minutos serve exactamente para mapear isso.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Varia por plano: o Simples tem suporte em horário laboral (email/WhatsApp); o Médio tem resposta prioritária em menos de 2 horas; o Avançado e o Enterprise têm suporte VIP, com resposta em menos de 1 hora e cobertura 24/7 para incidentes críticos.',
  },
  {
    q: 'E se mudar de ideia ou não gostar?',
    a: 'Pode cancelar em qualquer mês, sem fidelização forçada e sem penalidades. E se, no primeiro trimestre, não poupar pelo menos 10 horas por mês, devolvemos a diferença em crédito.',
  },
  {
    q: 'Funciona com M-Pesa?',
    a: 'Sim. O plano Avançado inclui processamento de pagamentos via M-Pesa e outras plataformas de pagamento mobile — o agente confirma pagamentos, gera referências e actualiza o estado de encomendas em tempo real. Para os planos Simples e Médio, a integração M-Pesa está disponível como add-on sob consulta.',
  },
  {
    q: 'O meu negócio é pequeno, vale a pena?',
    a: `Se a sua equipa perde tempo a responder às mesmas perguntas no WhatsApp ou a copiar dados entre sistemas, vale. O plano Simples começa em ${formatMZN(getPlan('simples').monthly)}/mês — e o agente trabalha 24 horas por dia, 7 dias por semana, sem férias. Comece pequeno, meça o resultado, e escale quando fizer sentido.`,
  },
  {
    q: 'Os meus dados estão seguros?',
    a: 'Sim. Dados encriptados em trânsito e em repouso, acesso restrito e controlado, e cumprimento das normas de protecção de dados aplicáveis em Moçambique. Não vendemos, não partilhamos e não usamos os seus dados para treinar modelos.',
  },
  {
    q: 'Posso começar só com WhatsApp e depois adicionar mais canais?',
    a: 'Claro. A maioria dos nossos clientes começa exactamente assim — WhatsApp porque é onde os clientes já estão. Depois, conforme o negócio cresce, adicionamos email, CRM, facturação ou outros canais, à medida da sua necessidade.',
  },
  {
    q: 'Qual é a melhor forma de contactar?',
    a: 'WhatsApp: +258 84 898 6002 — resposta em minutos. Email: info@songhai.cc — para propostas e documentação. O primeiro passo é sempre o diagnóstico grátis de 30 minutos, sem custo e sem compromisso.',
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
  const whatsapp = `https://wa.me/${BUSINESS.phone.replace('+', '')}`

  return (
    <section id="faq" className="scroll-mt-16 bg-[var(--field-gold)] text-[#1e2158]">
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_STRUCTURED_DATA).replace(/</g, '<') }}
      />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-24">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="poster text-[clamp(2.2rem,3.4vw,3.8rem)]">Perguntas frequentes</h2>
            <p className="mt-6 max-w-[34ch] text-lg font-medium leading-snug">
              Não encontrou a resposta? Fale connosco: respondemos no WhatsApp em minutos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <PillButton href={whatsapp} external variant="dark" className="bg-[#1e2158] text-white hover:bg-[#10122b]">
                Falar no WhatsApp
              </PillButton>
              <a href="/diagnostico" className="font-bold underline underline-offset-4">
                Pedir diagnóstico grátis
              </a>
            </div>
          </div>
        </Reveal>

        <ul className="divide-y divide-[#1e2158]/25 border-y border-[#1e2158]/25 lg:col-span-7">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <li key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e2158] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--field-gold)]"
                >
                  <span className="text-xl font-bold leading-snug sm:text-2xl">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? 'bg-[#1e2158] text-white' : 'bg-[#1e2158]/15'
                    }`}
                  >
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
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
                      <p className="max-w-[64ch] pb-7 text-lg font-medium leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
