import { Reveal } from '@/components/motion/reveal'

type Service = {
  title: string
  desc: string
  ideal: string
  details: string[]
}

type Group = {
  id: string
  title: string
  promise: string
  panel: string
  services: Service[]
}

const GROUPS: Group[] = [
  {
    id: 'atender',
    title: 'Atender',
    promise:
      'Os seus clientes recebem resposta em segundos, 24 horas por dia, no WhatsApp e ao telefone.',
    panel: 'bg-[var(--field-indigo)] text-white',
    services: [
      {
        title: 'Agentes de IA de Texto',
        desc: 'Atendimento automático no WhatsApp e no chat: responde, qualifica clientes e agenda, no canal onde eles já estão.',
        ideal: 'Para negócios com muitas mensagens repetidas no WhatsApp.',
        details: [
          'Respostas instantâneas a perguntas frequentes, preços e horários',
          'Qualificação de clientes e recolha de dados antes de passar a uma pessoa',
          'Marcação e confirmação de visitas de forma automática',
          'Ligação ao seu WhatsApp Business, site e redes sociais',
        ],
      },
      {
        title: 'Agentes de IA de Voz',
        desc: 'Agentes que atendem e fazem chamadas com voz natural: marcações, confirmações e apoio ao cliente sem filas.',
        ideal: 'Para clínicas, restaurantes e serviços com muitas chamadas.',
        details: [
          'Atendimento telefónico com voz natural em português',
          'Chamadas de saída para confirmações e lembretes',
          'Encaminhamento para a pessoa certa quando necessário',
          'Registo e resumo de cada chamada no seu sistema',
        ],
      },
    ],
  },
  {
    id: 'automatizar',
    title: 'Automatizar',
    promise:
      'O trabalho repetitivo entre e-mail, CRM, facturação e ERP deixa de ser feito à mão.',
    panel: 'bg-[var(--field-gold)] font-medium text-[#0f1130]',
    services: [
      {
        title: 'Automação de Processos',
        desc: 'Ligamos os seus sistemas e eliminamos o trabalho manual entre e-mail, CRM, facturação e dados.',
        ideal: 'Para equipas que copiam dados entre várias ferramentas.',
        details: [
          'Sincronização automática entre e-mail, CRM e folhas de cálculo',
          'Facturas, propostas e relatórios gerados sem intervenção manual',
          'Alertas e tarefas criados automaticamente a partir de eventos',
          'Fluxos desenhados à medida dos seus processos actuais',
        ],
      },
      {
        title: 'Sistemas Empresariais (ERP / SaaS)',
        desc: 'Implementamos e personalizamos ERP e SaaS para toda a operação, com IA nos processos críticos.',
        ideal: 'Para empresas que precisam de um sistema único, fiável e com inteligência automática.',
        details: [
          'Implementação de ERP/SaaS (OpenProject, Odoo, ERPNext ou soluções à medida)',
          'Personalização e migração de dados dos sistemas antigos',
          'Automações de IA nos processos-chave (RH, financeiro, vendas)',
          'Formação da equipa e suporte contínuo na plataforma',
          'Painel e relatórios automáticos com análises de IA',
        ],
      },
    ],
  },
  {
    id: 'orientar',
    title: 'Orientar',
    promise:
      'Fica a saber por onde começar, e a sua equipa aprende a trabalhar com IA.',
    panel: 'bg-[var(--field-night)] text-white',
    services: [
      {
        title: 'Consultoria de IA',
        desc: 'Definimos onde a IA gera mais impacto no seu negócio e desenhamos o roteiro de implementação por fases.',
        ideal: 'Para quem quer começar mas não sabe por onde.',
        details: [
          'Análise do negócio e das oportunidades de maior retorno',
          'Roteiro de implementação por impacto e esforço',
          'Estimativa de poupança de tempo e custos por iniciativa',
          'Acompanhamento na escolha das ferramentas certas',
        ],
      },
      {
        title: 'Auditoria de Processos',
        desc: 'Mapeamos os seus fluxos de trabalho e mostramos exactamente onde está a perder tempo e dinheiro.',
        ideal: 'O primeiro passo antes de qualquer automação.',
        details: [
          'Mapeamento detalhado dos fluxos de trabalho actuais',
          'Identificação de gargalos, tarefas duplicadas e desperdício',
          'Relatório com oportunidades ordenadas por retorno',
          'Recomendações práticas e imediatas',
        ],
      },
      {
        title: 'Formação em IA',
        desc: 'Preparamos a equipa para trabalhar com IA a partir dos seus processos reais, não de exemplos genéricos.',
        ideal: 'Para tornar a equipa produtiva com IA no dia a dia.',
        details: [
          'Sessões práticas baseadas nos casos reais da sua empresa',
          'Materiais e guias adaptados às ferramentas que já usam',
          'Boas práticas de segurança e uso responsável de IA',
          'Acompanhamento depois da formação para tirar dúvidas',
        ],
      },
      {
        title: 'AI Partner Fraccionado',
        desc: 'Acesso contínuo a especialistas de IA como parte da sua equipa, sem o custo de uma contratação a tempo inteiro.',
        ideal: 'Planos de 8h, 20h ou 40h por mês, para melhorar de forma contínua e previsível.',
        details: [
          'Bolsa mensal de horas dedicadas ao seu negócio (8h, 20h ou 40h)',
          'Prioridade na implementação de novas automações e melhorias',
          'Reuniões regulares de acompanhamento e planeamento',
          'Um parceiro que conhece o seu contexto e evolui consigo',
        ],
      },
    ],
  },
]

export function Solutions() {
  return (
    <section id="solucoes" className="scroll-mt-16">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-16 lg:px-8 lg:pb-14 lg:pt-20">
        <Reveal>
          <h2 className="poster max-w-[18ch] text-[clamp(2.2rem,5.4vw,6rem)]">
            Horas de volta à equipa
          </h2>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.25fr)]">
        {GROUPS.map((group) => (
          <article key={group.id} className={`${group.panel} flex flex-col px-5 py-12 lg:px-8 lg:py-16`}>
            <h3 className="poster text-[clamp(2rem,3.2vw,3.8rem)]">{group.title}</h3>
            <p className="mt-5 max-w-[32ch] text-xl leading-snug">{group.promise}</p>

            <ul className="mt-12 space-y-10">
              {group.services.map((s) => (
                <li key={s.title}>
                  <h4 className="text-2xl font-black leading-tight tracking-normal">{s.title}</h4>
                  <p className="mt-2 max-w-[44ch] text-lg leading-snug">{s.desc}</p>
                  <p className="mt-2 max-w-[44ch] text-base font-bold">{s.ideal}</p>
                  <details className="group mt-3">
                    <summary className="cursor-pointer text-base font-bold underline underline-offset-4">
                      O que inclui
                    </summary>
                    <ul className="mt-3 max-w-[44ch] list-disc space-y-1.5 pl-5 text-base leading-snug">
                      {s.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
