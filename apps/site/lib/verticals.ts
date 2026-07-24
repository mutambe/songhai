export type Vertical = {
  slug: 'agricola' | 'comercio' | 'servicos'
  metaTitle: string
  metaDescription: string
  eyebrow: string
  headline: string
  intro: string
  painPoints: { title: string; desc: string }[]
  useCases: { title: string; desc: string }[]
  suggestedPlan: string
  suggestedPlanDesc: string
}

export const VERTICALS: Record<Vertical['slug'], Vertical> = {
  agricola: {
    slug: 'agricola',
    metaTitle: 'Agentes de IA para o Setor Agrícola — Songhai',
    metaDescription:
      'Automatize cotações, encomendas e atualizações de stock com agentes de IA para o agronegócio em Moçambique. Preços em MZN.',
    eyebrow: 'Setor Agrícola',
    headline: 'Agentes de IA para o agronegócio em Moçambique',
    intro:
      'Entre fornecedores, compradores e época de colheita, a comunicação não pode parar. Automatizamos cotações, encomendas e atualizações de stock para a sua equipa focar na produção.',
    painPoints: [
      {
        title: 'Cotações perdidas',
        desc: 'Pedidos de preço chegam por WhatsApp a qualquer hora e ficam sem resposta até ao dia seguinte.',
      },
      {
        title: 'Stock desatualizado',
        desc: 'Compradores perguntam disponibilidade de produtos que já esgotaram ou que só chegam na próxima colheita.',
      },
      {
        title: 'Equipa pequena, época cheia',
        desc: 'Na época alta, quem negoceia preços é a mesma pessoa que responde mensagens repetidas.',
      },
    ],
    useCases: [
      {
        title: 'Cotações automáticas',
        desc: 'O agente responde preços atualizados de produtos agrícolas no WhatsApp, a qualquer hora.',
      },
      {
        title: 'Confirmação de encomendas e entregas',
        desc: 'O cliente confirma o pedido, recebe referência de pagamento (M-Pesa) e é avisado quando a entrega sai.',
      },
      {
        title: 'Disponibilidade em tempo real',
        desc: 'Ligado ao seu registo de stock ou colheita, o agente nunca promete o que já não existe.',
      },
      {
        title: 'Agendamento de visitas e logística',
        desc: 'Marcação automática de recolhas, entregas e visitas ao terreno.',
      },
    ],
    suggestedPlan: 'Agente Simples ou Médio',
    suggestedPlanDesc:
      'A maioria dos negócios agrícolas começa no plano Simples para cotações e confirmações, e sobe para o Médio quando precisa de qualificação automática de compradores.',
  },
  comercio: {
    slug: 'comercio',
    metaTitle: 'Agentes de IA para Comércio e Retalho — Songhai',
    metaDescription:
      'Catálogo, orçamentos e pagamentos automatizados no WhatsApp para lojas, ferragens e distribuição em Moçambique. Preços em MZN.',
    eyebrow: 'Comércio & Retalho',
    headline: 'Agentes de IA para lojas, ferragens e distribuição',
    intro:
      'O balcão não para, mas as mensagens no WhatsApp continuam a chegar. Um agente responde preços, stock e confirma pedidos enquanto a sua equipa atende quem está na loja.',
    painPoints: [
      {
        title: 'Balcão sobrecarregado',
        desc: 'A mesma equipa atende ao balcão, ao telefone e ao WhatsApp — algo fica sempre para trás.',
      },
      {
        title: 'Perguntas repetidas',
        desc: 'Preço, disponibilidade e horário de funcionamento são as mesmas perguntas, todos os dias.',
      },
      {
        title: 'Pedidos perdidos fora do horário',
        desc: 'Clientes escrevem à noite ou ao fim de semana e só recebem resposta dois dias depois.',
      },
    ],
    useCases: [
      {
        title: 'Catálogo automatizado no WhatsApp',
        desc: 'O agente envia preços, fotos e disponibilidade de produtos sem tirar ninguém do balcão.',
      },
      {
        title: 'Orçamentos automáticos',
        desc: 'Cliente descreve o que precisa e recebe um orçamento em minutos, não em horas.',
      },
      {
        title: 'Confirmação de pedido e pagamento',
        desc: 'Integração com M-Pesa para confirmar pagamentos e gerar referências automaticamente.',
      },
      {
        title: 'Notificações de entrega',
        desc: 'O cliente é avisado quando o pedido está pronto ou a caminho, sem ligar para perguntar.',
      },
    ],
    suggestedPlan: 'Agente Médio',
    suggestedPlanDesc:
      'A maioria das lojas e distribuidoras escolhe o plano Médio, com qualificação de leads e relatórios — o Avançado entra quando há pagamentos e integração com POS.',
  },
  servicos: {
    slug: 'servicos',
    metaTitle: 'Agentes de IA para Empresas de Serviços — Songhai',
    metaDescription:
      'Agendamentos, lembretes e qualificação de clientes automatizados para clínicas, advocacia, educação e consultoria. Preços em MZN.',
    eyebrow: 'Serviços Profissionais',
    headline: 'Agentes de IA para clínicas, advocacia, educação e consultoria',
    intro:
      'Agendamentos, confirmações e perguntas repetidas consomem horas da sua equipa todas as semanas. Automatizamos o processo administrativo, sem perder o toque humano onde importa.',
    painPoints: [
      {
        title: 'Marcações manuais',
        desc: 'Cada consulta ou reunião marcada por WhatsApp tem de ser copiada à mão para a agenda.',
      },
      {
        title: 'Faltas sem aviso',
        desc: 'Sem lembrete automático, uma parte dos clientes simplesmente não aparece.',
      },
      {
        title: 'Emails e mensagens repetidas',
        desc: 'A equipa responde às mesmas dúvidas sobre preços, horários e processos, todos os dias.',
      },
    ],
    useCases: [
      {
        title: 'Agendamento automático',
        desc: 'O agente marca, remarca e cancela horários diretamente na sua agenda, sem intervenção manual.',
      },
      {
        title: 'Lembretes de consulta ou reunião',
        desc: 'Mensagens automáticas reduzem faltas e libertam a receção para tarefas mais importantes.',
      },
      {
        title: 'Qualificação de clientes',
        desc: 'O agente recolhe a informação inicial antes da consulta ou reunião, poupando tempo à equipa.',
      },
      {
        title: 'Follow-up e faturação',
        desc: 'Confirmações, lembretes de pagamento e follow-up pós-serviço, tudo automatizado.',
      },
    ],
    suggestedPlan: 'Agente Simples ou Médio',
    suggestedPlanDesc:
      'Clínicas e escritórios pequenos costumam começar no Simples para agendamento e confirmações, subindo para o Médio com CRM quando o volume de clientes cresce.',
  },
}
