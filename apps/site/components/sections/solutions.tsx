'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  MessageSquare,
  PhoneCall,
  Workflow,
  Compass,
  ClipboardCheck,
  GraduationCap,
  Handshake,
  Database,
  Plus,
  Check,
} from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'

const SOLUTIONS = [
  {
    n: '01',
    icon: MessageSquare,
    title: 'Agentes de IA de Texto',
    tag: 'WhatsApp & Chat',
    desc: 'Atendimento automático que responde, qualifica leads e agenda — 24 horas por dia, no canal onde os seus clientes já estão.',
    metric: 'Resposta em segundos',
    ideal: 'Ideal para negócios com muitas mensagens repetidas no WhatsApp.',
    details: [
      'Respostas instantâneas a perguntas frequentes, preços e horários',
      'Qualificação de leads e recolha de dados antes de passar a um humano',
      'Agendamento e confirmação de marcações de forma automática',
      'Integração com o seu WhatsApp Business, site e redes sociais',
    ],
  },
  {
    n: '02',
    icon: PhoneCall,
    title: 'Agentes de IA de Voz',
    tag: 'Telefone & Chamadas',
    desc: 'Agentes que atendem e fazem chamadas com voz natural, para marcações, confirmações e apoio ao cliente sem filas.',
    metric: 'Chamadas sem espera',
    ideal: 'Ideal para clínicas, restaurantes e serviços com muitas chamadas.',
    details: [
      'Atendimento telefónico com voz natural em português',
      'Chamadas de saída para confirmações e lembretes automáticos',
      'Encaminhamento inteligente para a pessoa certa quando necessário',
      'Registo e resumo de cada chamada no seu sistema',
    ],
  },
  {
    n: '03',
    icon: Workflow,
    title: 'Automação de Processos',
    tag: 'Operações',
    desc: 'Ligamos os seus sistemas e eliminamos o trabalho manual repetitivo entre e-mail, CRM, faturação e dados.',
    metric: 'Menos erros manuais',
    ideal: 'Ideal para equipas que copiam dados entre várias ferramentas.',
    details: [
      'Sincronização automática entre e-mail, CRM e folhas de cálculo',
      'Geração de faturas, propostas e relatórios sem intervenção manual',
      'Alertas e tarefas criadas automaticamente a partir de eventos',
      'Fluxos desenhados à medida dos seus processos atuais',
    ],
  },
  {
    n: '04',
    icon: Compass,
    title: 'Consultoria de IA',
    tag: 'Estratégia & Roadmap',
    desc: 'Definimos onde a IA gera mais impacto no seu negócio e desenhamos o roteiro de implementação por fases.',
    metric: 'Plano claro e faseado',
    ideal: 'Ideal para quem quer começar mas não sabe por onde.',
    details: [
      'Análise do negócio e identificação de oportunidades de maior retorno',
      'Roteiro de implementação priorizado por impacto e esforço',
      'Estimativa de poupança de tempo e custos por iniciativa',
      'Acompanhamento na escolha das ferramentas certas',
    ],
  },
  {
    n: '05',
    icon: ClipboardCheck,
    title: 'Auditoria de Processos',
    tag: 'Diagnóstico',
    desc: 'Mapeamos os seus fluxos de trabalho e identificamos exatamente onde está a perder tempo e dinheiro.',
    metric: 'Oportunidades priorizadas',
    ideal: 'Ideal como primeiro passo antes de qualquer automação.',
    details: [
      'Mapeamento detalhado dos seus fluxos de trabalho atuais',
      'Identificação de gargalos, tarefas duplicadas e desperdício',
      'Relatório com oportunidades ordenadas por retorno',
      'Recomendações práticas e imediatamente acionáveis',
    ],
  },
  {
    n: '06',
    icon: GraduationCap,
    title: 'Formação em IA',
    tag: 'Capacitação',
    desc: 'Preparamos a sua equipa para trabalhar com IA a partir dos seus processos reais, não de exemplos genéricos.',
    metric: 'Equipa autónoma',
    ideal: 'Ideal para tornar a equipa produtiva com IA no dia a dia.',
    details: [
      'Sessões práticas baseadas nos casos reais da sua empresa',
      'Materiais e guias adaptados às ferramentas que já usam',
      'Boas práticas de segurança e uso responsável de IA',
      'Acompanhamento pós-formação para tirar dúvidas',
    ],
  },
  {
    n: '07',
    icon: Handshake,
    title: 'AI Partner Fracionado',
    tag: 'Planos 8h / 20h / 40h',
    desc: 'Acesso contínuo a especialistas de IA como parte da sua equipa, sem o custo de uma contratação a tempo inteiro.',
    metric: 'Evolução constante',
    ideal: 'Ideal para quem quer melhorar de forma contínua e previsível.',
    details: [
      'Bolsa mensal de horas dedicadas ao seu negócio (8h, 20h ou 40h)',
      'Prioridade na implementação de novas automações e melhorias',
      'Reuniões regulares de acompanhamento e planeamento',
      'Um parceiro que conhece o seu contexto e evolui consigo',
    ],
  },
  {
    n: '08',
    icon: Database,
    title: 'Sistemas Empresariais (ERP / SaaS)',
    tag: 'Integração & Customização',
    desc: 'Implementamos e customizamos ERPs e SaaS para toda a sua operação — com IA integrada nos processos críticos.',
    metric: 'Operações centralizadas',
    ideal: 'Ideal para empresas que precisam de um sistema único, confiável e com inteligência automática.',
    details: [
      'Implementação de ERP/SaaS (OpenProject, Odoo, ERPNext, ou soluções custom)',
      'Customização e migração de dados dos sistemas legados',
      'Integração com automações de IA nos processos-chave (RH, financeiro, vendas)',
      'Formação da equipa e suporte contínuo na plataforma',
      'Dashboard e relatórios automatizados com insights de IA',
    ],
  },
]

export function Solutions() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="solucoes" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
            Soluções
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Oito formas de devolver horas à sua equipa
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
            Do primeiro diagnóstico à parceria contínua — construímos a solução
            certa para o momento do seu negócio.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => {
            const Icon = s.icon
            const isOpen = open === s.n
            return (
              <RevealItem key={s.n}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-shadow hover:shadow-xl hover:shadow-ink/5"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand text-indigo-deep">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-serif text-2xl font-semibold text-line transition-colors group-hover:text-gold">
                      {s.n}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-wider text-teal">
                    {s.tag}
                  </p>
                  <h3 className="mt-1.5 font-serif text-xl font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {s.desc}
                  </p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-xl bg-sand/60 p-4">
                          <p className="text-xs font-medium italic text-indigo-deep">
                            {s.ideal}
                          </p>
                          <ul className="mt-3 space-y-2">
                            {s.details.map((d) => (
                              <li key={d} className="flex gap-2 text-sm leading-snug text-ink-soft">
                                <Check className="mt-0.5 h-4 w-4 flex-none text-teal" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                    <span className="text-xs font-medium text-indigo-deep">
                      {s.metric}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : s.n)}
                      aria-expanded={isOpen}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-gold"
                    >
                      {isOpen ? 'Ver menos' : 'Saber mais'}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </motion.span>
                    </button>
                  </div>
                </motion.article>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
