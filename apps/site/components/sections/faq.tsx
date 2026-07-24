'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

const FAQS = [
  {
    q: 'Quanto tempo demora até estar live?',
    a: 'Agente simples (WhatsApp com respostas automáticas): 5 a 7 dias úteis após aprovada a proposta. Agente médio ou avançado (com CRM, integrações ou pagamentos): 2 a 4 semanas, dependendo da complexidade dos sistemas que já tem. Sempre começamos com um piloto de teste — o agente funciona em ambiente controlado antes de ir ao público. Você aprova, ajustamos, e só depois ativamos.',
  },
  {
    q: 'Quanto custa um agente de IA?',
    a: 'Agente simples: 5.000-6.000 MZN/mês. Agente médio (com CRM): 8.000-10.000 MZN/mês. Agente avançado (integrações múltiplas, pagamentos): 12.000-15.000 MZN/mês. Todos com setup único e piloto de 1 mês com 50% de desconto. Veja o detalhe em Preços.',
  },
  {
    q: 'Preciso de equipa técnica?',
    a: 'Não. Implementamos, configuramos e treinamos a sua equipa. A sua equipa só precisa de saber o que quer automatizar — nós tratamos da configuração, integrações e manutenção técnica.',
  },
  {
    q: 'Vocês também fazem integração com o meu ERP/CRM?',
    a: 'Sim. Integramos HubSpot, Salesforce, Zoho e outras plataformas populares. Se usa um sistema próprio ou legado, avaliamos caso a caso — na maioria das vezes conseguimos ligar via API ou exportação de dados. A auditoria grátis de 30 minutos serve exatamente para mapear isso.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Varia por plano: Simples é em horário laboral (email/WhatsApp); Médio tem resposta prioritária em menos de 2 horas; Avançado tem resposta VIP em menos de 1 hora, com cobertura 24/7 para incidentes críticos. Não deixamos o seu negócio pendurado.',
  },
  {
    q: 'E se mudar de ideia ou não gostar?',
    a: 'Piloto de 1 mês com setup grátis e 50% de desconto no primeiro mês. Se não fizer sentido para o seu negócio, cancelamos sem perguntas, sem fidelidade forçada e sem penalidades.',
  },
  {
    q: 'Funciona com M-Pesa?',
    a: 'Sim. O plano Avançado inclui processamento de pagamentos via M-Pesa e outras plataformas de pagamento mobile — o agente confirma pagamentos, gera referências e atualiza o estado de encomendas em tempo real. Para os planos Simples e Médio, a integração M-Pesa está disponível como add-on sob consulta.',
  },
  {
    q: 'O meu negócio é pequeno, vale a pena?',
    a: 'Se a sua equipa perde tempo a responder às mesmas perguntas no WhatsApp ou a copiar dados entre sistemas, vale. Muitos dos nossos clientes começaram com 5.000 MZN/mês no plano Simples — e o agente trabalha 24 horas por dia, 7 dias por semana, sem férias. Comece pequeno, meça o resultado, e escale quando fizer sentido.',
  },
  {
    q: 'Os meus dados estão seguros?',
    a: 'Sim. Dados encriptados em trânsito e em repouso, acesso restrito e controlado, e cumprimento das normas de proteção de dados aplicáveis em Moçambique. Não vendemos, não partilhamos e não usamos os seus dados para treinar modelos.',
  },
  {
    q: 'Posso começar só com WhatsApp e depois adicionar mais canais?',
    a: 'Claro. A maioria dos nossos clientes começa exatamente assim — WhatsApp porque é onde os clientes já estão. Depois, conforme o negócio cresce, adicionamos email, CRM, faturação ou outros canais, à medida da sua necessidade.',
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
