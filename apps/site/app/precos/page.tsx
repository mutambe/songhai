import type { Metadata } from 'next'
import { Check, X, ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'
import { PricingFaq } from '@/components/pricing-faq'
import { getPlan, monthlyLabel, setupLabel } from '@/lib/plans'

const SIMPLES = getPlan('simples')
const MEDIO = getPlan('medio')
const AVANCADO = getPlan('avancado')

const TITLE = 'Preços — Agentes de IA e Automação em MZN'
const DESCRIPTION =
  'Preços transparentes em MZN para agentes de IA e automação, sem contactar-nos para orçamento. Três planos, sem surpresas.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/precos' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/precos' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

type Plan = {
  name: string
  price: string
  setup: string
  idealFor: string
  included: string[]
  notIncluded: string[]
  cta: string
  href: string
  variant: 'outline' | 'gold' | 'dark'
  highlight?: boolean
}

const PLANS: Plan[] = [
  {
    name: SIMPLES.name,
    price: `${monthlyLabel(SIMPLES)}/mês`,
    setup: `Setup: ${setupLabel(SIMPLES)} (único)`,
    idealFor:
      'Pequenas empresas (5-20 pessoas) que querem responder perguntas comuns e confirmações automáticas.',
    included: [
      'Agente de IA customizado',
      'Integração WhatsApp + Google Calendar',
      'Suporte em horário laboral (email/WhatsApp)',
      'Formação da equipa (2 horas)',
      'Ajustes mensais (até 2)',
    ],
    notIncluded: [
      'Integrações complexas (CRM, ERP, etc.)',
      'Desenvolvimento à medida (só configuração)',
      'Consultoria estratégica',
    ],
    cta: 'Começar agora',
    href: '/diagnostico',
    variant: 'outline',
  },
  {
    name: MEDIO.name,
    price: `${monthlyLabel(MEDIO)}/mês`,
    setup: `Setup: ${setupLabel(MEDIO, true)} (único)`,
    idealFor:
      'PME médias (20-50 pessoas) que precisam de qualificação de leads e integração com CRM.',
    included: [
      'Tudo do plano Simples',
      'Integração com CRM (HubSpot, Salesforce, etc.)',
      'Qualificação automática de leads',
      'Relatórios diários/semanais',
      'Ajustes mensais (até 4)',
      'Suporte prioritário — resposta <2h em horário laboral',
    ],
    notIncluded: [
      'Integrações com sistemas legados (caso a caso)',
      'Desenvolvimento à medida',
    ],
    cta: 'Começar com o recomendado',
    href: '/diagnostico',
    variant: 'gold',
    highlight: true,
  },
  {
    name: AVANCADO.name,
    price: `${monthlyLabel(AVANCADO)}/mês`,
    setup: `Setup: ${setupLabel(AVANCADO, true)} (único)`,
    idealFor:
      'Grandes PME (50+ pessoas) e e-commerce com volume alto, com múltiplas integrações.',
    included: [
      'Tudo dos planos Simples e Médio',
      'Integração múltipla (CRM, POS, ERP, faturação)',
      'Processamento de pagamentos (ex: M-Pesa)',
      'Dashboard de analytics em tempo real',
      'Ajustes mensais ilimitados',
      'Suporte VIP — resposta <1h em horário laboral, 24/7 para incidentes críticos',
      'Reunião mensal de otimização',
    ],
    notIncluded: [
      'Desenvolvimento à medida fora do âmbito',
      'Consultoria estratégica (vendida à parte)',
    ],
    cta: 'Começar com agente avançado',
    href: '/diagnostico',
    variant: 'dark',
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    setup: 'Proposta à medida',
    idealFor:
      'Grandes empresas e grupos com múltiplas unidades, requisitos de segurança específicos ou volumes acima do plano Avançado.',
    included: [
      'Tudo do plano Avançado',
      'Múltiplas unidades/filiais numa só conta',
      'SLA e requisitos de segurança à medida',
      'Gestor de conta dedicado',
      'Preço por volume, negociado caso a caso',
    ],
    notIncluded: [],
    cta: 'Falar com equipa comercial',
    href: '/contacto',
    variant: 'outline',
  },
]

const COMPARISON_ROWS: [string, string, string, string][] = [
  ['Preço/mês', monthlyLabel(SIMPLES), monthlyLabel(MEDIO), monthlyLabel(AVANCADO)],
  ['Setup', setupLabel(SIMPLES), setupLabel(MEDIO), setupLabel(AVANCADO)],
  ['Agente de IA customizado', '✓', '✓', '✓'],
  ['WhatsApp integrado', '✓', '✓', '✓'],
  ['Calendário', '✓', '✓', '✓'],
  ['CRM integrado', '—', '✓', '✓'],
  ['Qualificação de leads', 'Manual', 'Automática', 'Automática'],
  ['Relatórios', 'Básico', 'Personalizados', 'Dashboard em tempo real'],
  ['Integração POS/ERP', '—', '—', '✓'],
  ['Processamento de pagamentos', '—', '—', '✓'],
  ['Suporte', 'Horário laboral', 'Prioritário <2h', 'VIP <1h + 24/7 crítico'],
  ['Ajustes/mês', '2', '4', 'Ilimitados'],
  ['Reunião de otimização', '—', '—', 'Mensal'],
]

const ADDONS = [
  { name: 'Integração com CRM adicional', price: '1.000-2.000 MZN', desc: 'Ligar um CRM diferente do incluído no plano, ou adicionar CRM ao plano Simples (HubSpot, Salesforce, etc.)' },
  { name: 'Integração ERP', price: '2.000-5.000 MZN', desc: 'Ligar sistema legado (mais complexo)' },
  { name: 'Relatório personalizado', price: '500 MZN', desc: 'Relatório novo, à medida' },
  { name: 'Agente adicional', price: '40% do plano base', desc: '2º agente (ex: suporte + vendas)' },
  { name: 'Formação extra', price: '200 MZN/hora', desc: 'Consultoria e boas práticas' },
  { name: 'Análise / auditoria', price: '1.000-2.000 MZN', desc: 'Aprofundar oportunidades de otimização' },
]

export default function PrecosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-5 pb-14 pt-16 text-center lg:px-8">
          <Reveal className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
              Preços
            </p>
            <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Preços transparentes em MZN
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
              Publicamos os nossos preços em MZN, desde o início. Sem
              surpresas, sem custos escondidos.
            </p>
          </Reveal>
        </section>

        <section className="px-5 pb-20 lg:px-8">
          <RevealGroup className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <RevealItem key={plan.name}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                    plan.highlight
                      ? 'border-gold bg-sand shadow-lg shadow-gold/10'
                      : 'border-line bg-paper'
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-indigo-deep">
                      Recomendado
                    </span>
                  )}
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    {plan.name}
                  </h2>
                  <p className="mt-3 font-serif text-3xl font-semibold text-indigo-deep">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">{plan.setup}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {plan.idealFor}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {plan.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        {item}
                      </li>
                    ))}
                    {plan.notIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft/70">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft/50" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <PillButton href={plan.href} variant={plan.variant} className="w-full">
                      {plan.cta}
                    </PillButton>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mx-auto mt-6 max-w-3xl text-center">
            <p className="text-sm text-ink-soft">
              O valor final dentro de cada plano depende do volume e das
              integrações necessárias — confirmado no diagnóstico gratuito,
              antes de qualquer compromisso.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mx-auto mt-6 max-w-3xl">
            <div className="rounded-2xl border border-teal/30 bg-teal/5 px-6 py-5 text-center">
              <p className="text-sm leading-relaxed text-foreground">
                <span className="font-semibold">Garantia de resultado:</span> se
                não poupar pelo menos 10 horas/mês no primeiro trimestre,
                devolvemos a diferença em crédito.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
            <Reveal className="text-center">
              <h2 className="text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                Comparação lado a lado
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-left">
                    <th className="py-3 pr-4 font-medium text-ink-soft">Funcionalidade</th>
                    <th className="py-3 px-4 font-serif text-base font-semibold text-foreground">Simples</th>
                    <th className="py-3 px-4 font-serif text-base font-semibold text-foreground">Médio</th>
                    <th className="py-3 px-4 font-serif text-base font-semibold text-foreground">Avançado</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map(([feature, s, m, a]) => (
                    <tr key={feature} className="border-b border-line/60">
                      <td className="py-3 pr-4 text-ink-soft">{feature}</td>
                      <td className="py-3 px-4 text-foreground">{s}</td>
                      <td className="py-3 px-4 text-foreground">{m}</td>
                      <td className="py-3 px-4 text-foreground">{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
            <Reveal className="text-center">
              <h2 className="text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                Add-ons à la carte
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-ink-soft">
                Precisa de algo específico além do plano? Estes itens somam-se a
                qualquer plano.
              </p>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ADDONS.map((addon) => (
                <RevealItem key={addon.name}>
                  <div className="h-full rounded-2xl border border-line bg-paper p-5">
                    <p className="font-serif text-base font-semibold text-foreground">
                      {addon.name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-teal">{addon.price}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{addon.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
            <Reveal className="text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
                Dúvidas frequentes
              </p>
              <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Sobre os preços
              </h2>
            </Reveal>
            <div className="mt-12">
              <PricingFaq />
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 pt-4 lg:px-8">
          <Reveal className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] bg-panel px-6 py-16 text-center text-panel-foreground sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(50% 60% at 50% 0%, rgba(200,155,60,0.18), transparent 70%)',
                }}
              />
              <div className="relative">
                <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gold">
                  Não sabe qual plano escolher?
                </p>
                <h2 className="mx-auto max-w-2xl text-balance font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  Temos diagnóstico grátis
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-panel-foreground/75">
                  30 minutos, sem custo. Recomendamos exatamente qual plano faz
                  sentido para o seu negócio.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <PillButton href="/diagnostico" variant="gold">
                    <ArrowRight className="h-4 w-4" />
                    Agendar diagnóstico grátis
                  </PillButton>
                </div>
                <p className="mt-6 text-sm text-panel-foreground/60">
                  WhatsApp: +258 84 898 6002 · Email: info@songhai.cc
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
