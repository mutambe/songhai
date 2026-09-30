// Fonte única dos preços dos planos. A página /precos, a calculadora e o
// resumo de preços da página inicial leem daqui — alterar um preço aqui
// altera-o em todo o site.

export type PlanId = 'simples' | 'medio' | 'avancado'

export type PlanPrice = {
  id: PlanId
  name: string
  shortName: string
  monthly: number
  setup: number
  // true quando o setup é "a partir de" (depende das integrações)
  setupFrom: boolean
  // Horas recuperadas/mês a partir das quais a calculadora sugere o plano seguinte
  maxHours: number
  audience: string
}

export const PLAN_PRICES: PlanPrice[] = [
  {
    id: 'simples',
    name: 'Agente Simples',
    shortName: 'Simples',
    monthly: 5000,
    setup: 2000,
    setupFrom: false,
    maxHours: 40,
    audience: 'Responder perguntas comuns e confirmações no WhatsApp.',
  },
  {
    id: 'medio',
    name: 'Agente Médio',
    shortName: 'Médio',
    monthly: 8000,
    setup: 3000,
    setupFrom: true,
    maxHours: 80,
    audience: 'Qualificar leads e ligar ao seu CRM.',
  },
  {
    id: 'avancado',
    name: 'Agente Avançado',
    shortName: 'Avançado',
    monthly: 12000,
    setup: 4000,
    setupFrom: true,
    maxHours: Infinity,
    audience: 'Várias integrações, pagamentos M-Pesa e volume alto.',
  },
]

export function getPlan(id: PlanId): PlanPrice {
  return PLAN_PRICES.find((p) => p.id === id)!
}

export function recommendedPlan(hoursMonth: number): PlanPrice {
  return PLAN_PRICES.find((p) => hoursMonth <= p.maxHours) ?? PLAN_PRICES[PLAN_PRICES.length - 1]
}

// toLocaleString('pt-PT') não agrupa números de 4 dígitos (5000), por isso
// formatamos à mão para ficar sempre "5.000".
export function formatNumber(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function formatMZN(value: number): string {
  return `${formatNumber(value)} MZN`
}

// `lower` para usar o rótulo a meio de uma frase ("setup a partir de ...")
// sem passar "MZN" para minúsculas.
export function monthlyLabel(plan: PlanPrice, lower = false): string {
  return `${lower ? 'a' : 'A'} partir de ${formatMZN(plan.monthly)}`
}

export function setupLabel(plan: PlanPrice, lower = false): string {
  return `${plan.setupFrom ? `${lower ? 'a' : 'A'} partir de ` : ''}${formatMZN(plan.setup)}`
}
