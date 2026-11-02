import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { Check, X, ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'
import { PricingFaq } from '@/components/pricing-faq'
import { PLAN_PRICES, getPlan, monthlyLabel, setupLabel } from '@/lib/plans'

const SIMPLES = getPlan('simples')
const MEDIO = getPlan('medio')
const AVANCADO = getPlan('avancado')

const TITLE = 'Preços — Agentes de IA e Automação em MZN'
const DESCRIPTION =
  'Preços transparentes em MZN para agentes de IA e automação, sem contactar-nos para orçamento. Três planos, sem surpresas.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/precos',
})

type Plan = {
  name: string
  price: string
  setup: string
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
    included: [
      'Agente de IA customizado',
      '1 número de WhatsApp incluído',
      'SonghaiCRM (agenda bloqueada, tokens mensais incluídos)',
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
    included: [
      'Tudo do plano Simples',
      'Agenda (Google Calendar nativo no SonghaiCRM)',
      'Integração com CRM externo (sujeita a condições)',
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
    included: [
      'Tudo dos planos Simples e Médio',
      'Integração múltipla (CRM, POS, ERP, facturação)',
      'Processamento de pagamentos (ex: M-Pesa)',
      'Dashboard de analytics em tempo real',
      'Ajustes mensais ilimitados',
      'Suporte VIP — resposta <1h em horário laboral, 24/7 para incidentes críticos',
      'Reunião mensal de optimização',
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

const Y = true
const N = false

const COMPARISON_ROWS: [string, string | boolean, string | boolean, string | boolean, string | boolean][] = [
  ['Preço/mês', monthlyLabel(SIMPLES), monthlyLabel(MEDIO), monthlyLabel(AVANCADO), 'Sob consulta'],
  ['Setup', setupLabel(SIMPLES), setupLabel(MEDIO), setupLabel(AVANCADO), 'À medida'],
  ['Agente de IA + WhatsApp (1 número incluído)', Y, Y, Y, Y],
  ['SonghaiCRM (agenda bloqueada, tokens mensais incluídos)', Y, Y, Y, Y],
  ['Agenda (Google Calendar nativo no SonghaiCRM)', N, Y, Y, Y],
  ['CRM e funil', N, Y, Y, Y],
  ['Qualificação de leads', N, Y, Y, Y],
  ['Relatórios', N, Y, Y, Y],
  ['Integrações (ERP, POS)', N, N, Y, Y],
  ['M-Pesa', N, N, Y, Y],
  ['Analytics em tempo real', N, N, Y, Y],
]

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check aria-label="Incluído" className="h-4 w-4 text-teal" />
  if (value === false) return <X aria-label="Não incluído" className="h-4 w-4 text-ink-soft/50" />
  return <>{value}</>
}

const ADDONS = [
  { name: 'Número de WhatsApp adicional', price: 'Sob consulta', desc: 'Cada plano inclui 1 número. Cada número extra acresce à mensalidade, por causa dos custos das APIs do agente. Preço sob consulta.' },
  { name: 'Tokens adicionais', price: 'Cobrado por consumo', desc: 'Cada plano inclui um número de tokens por mês. O consumo acima do incluído é cobrado ao cliente.' },
  { name: 'Integração com CRM adicional', price: '1.000-2.000 MZN', desc: 'Ligar um CRM diferente do incluído no plano, sujeito às condições da integração' },
  { name: 'Integração ERP', price: '2.000-5.000 MZN', desc: 'Ligar sistema legado (mais complexo)' },
  { name: 'Relatório personalizado', price: '500 MZN', desc: 'Relatório novo, à medida' },
  { name: 'Agente adicional', price: '40% do plano base', desc: '2º agente (ex: suporte + vendas)' },
  { name: 'Formação extra', price: '200 MZN/hora', desc: 'Consultoria e boas práticas' },
  { name: 'Análise / auditoria', price: '1.000-2.000 MZN', desc: 'Aprofundar oportunidades de optimização' },
]

// Planos em JSON-LD, para o Google e assistentes de IA lerem os preços em MZN.
// Os preços "a partir de" usam minPrice.
const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agentes de IA no WhatsApp',
  serviceType: 'Agentes de Inteligência Artificial',
  provider: { '@type': 'ProfessionalService', name: 'SONGHAI', url: 'https://songhai.cc' },
  areaServed: { '@type': 'Country', name: 'Moçambique' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Planos SONGHAI',
    itemListElement: PLAN_PRICES.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      description: plan.audience,
      url: 'https://songhai.cc/precos',
      priceCurrency: 'MZN',
      priceSpecification: [
        {
          '@type': 'UnitPriceSpecification',
          name: 'Mensalidade',
          minPrice: plan.monthly,
          priceCurrency: 'MZN',
          unitText: 'mês',
        },
        {
          '@type': 'PriceSpecification',
          name: 'Setup (pagamento único)',
          ...(plan.setupFrom ? { minPrice: plan.setup } : { price: plan.setup }),
          priceCurrency: 'MZN',
        },
      ],
    })),
  },
}

export default function PrecosPage() {
  return (
    <>
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema).replace(/</g, '\\u003c') }}
      />
      <SiteHeader />
      <main>
        <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
          <Reveal hero className="mx-auto max-w-[1600px]">
            <h1 className="poster max-w-[20ch] text-[clamp(1.75rem,4.8vw,5rem)]">
              Preços transparentes em MZN
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-xl leading-snug text-foreground sm:text-2xl">
              Publicamos os nossos preços em MZN, desde o início. Sem
              surpresas, sem custos escondidos.
            </p>
            <div className="mt-8">
              <PillButton href="/diagnostico" variant="gold">
                Diagnóstico grátis
                <ArrowRight className="h-4 w-4" />
              </PillButton>
            </div>
          </Reveal>
        </section>

        <section className="px-5 pb-20 lg:px-8">
          <RevealGroup className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <RevealItem key={plan.name}>
                <div
                  className={`relative flex h-full flex-col p-6 ${
                    plan.highlight
                      ? 'border-t-4 border-gold bg-foreground/[0.08]'
                      : 'bg-foreground/[0.04]'
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-4 left-6 bg-gold px-3 py-1 text-base font-semibold text-on-gold">
                      Recomendado
                    </span>
                  )}
                  <h2 className="text-2xl font-black tracking-normal text-foreground">
                    {plan.name}
                  </h2>
                  <p className="mt-3 text-3xl font-semibold text-indigo-deep">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-base text-ink-soft">{plan.setup}</p>

                  <ul className="mt-6 space-y-2">
                    {plan.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-base text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        {item}
                      </li>
                    ))}
                    {plan.notIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-base text-ink-soft/70">
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
            <p className="text-base text-ink-soft">
              O valor final dentro de cada plano depende do volume e das
              integrações necessárias — confirmado no diagnóstico gratuito,
              antes de qualquer compromisso.
            </p>
            <p className="mt-2 text-base text-ink-soft">
              Todas as integrações com sistemas de terceiros (CRM, ERP, POS e
              outros) estão condicionadas: dependem de o sistema permitir a
              ligação, de existir documentação técnica e, quando necessário, do
              apoio técnico do respectivo fornecedor.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mx-auto mt-6 max-w-3xl">
            <div className="bg-teal/10 px-6 py-5 text-center">
              <p className="text-base leading-relaxed text-foreground">
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
              <h2 className="text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
                Comparação lado a lado
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <table className="w-full border-collapse text-[15px] sm:text-base">
                <thead>
                  <tr className="border-b border-line text-left">
                    <th className="py-3 pr-2 font-medium text-ink-soft sm:pr-4">Funcionalidade</th>
                    <th className="py-3 px-1 text-[13px] font-black sm:px-4 sm:text-lg tracking-normal text-foreground">Simples</th>
                    <th className="py-3 px-1 text-[13px] font-black sm:px-4 sm:text-lg tracking-normal text-foreground">Médio</th>
                    <th className="py-3 px-1 text-[13px] font-black sm:px-4 sm:text-lg tracking-normal text-foreground">Avançado</th>
                    <th className="py-3 px-1 text-[13px] font-black sm:px-4 sm:text-lg tracking-normal text-foreground">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map(([feature, s, m, a, e]) => (
                    <tr key={feature} className="border-b border-line/60">
                      <td className="py-3 pr-2 text-ink-soft sm:pr-4">{feature}</td>
                      <td className="px-1 py-3 text-foreground sm:px-4"><Cell value={s} /></td>
                      <td className="px-1 py-3 text-foreground sm:px-4"><Cell value={m} /></td>
                      <td className="px-1 py-3 text-foreground sm:px-4"><Cell value={a} /></td>
                      <td className="px-1 py-3 text-foreground sm:px-4"><Cell value={e} /></td>
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
              <h2 className="text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
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
                  <div className="h-full bg-foreground/[0.05] p-5">
                    <p className="text-lg font-black tracking-normal text-foreground">
                      {addon.name}
                    </p>
                    <p className="mt-1 text-base font-medium text-teal">{addon.price}</p>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">{addon.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
            <Reveal className="text-center">
              <h2 className="text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
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
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
                  Temos diagnóstico grátis
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-panel-foreground/75">
                  30 minutos, sem custo. Recomendamos exactamente qual plano faz
                  sentido para o seu negócio.
                </p>
                <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
                  <PillButton href="/diagnostico" variant="gold">
                    <ArrowRight className="h-4 w-4" />
                    Agendar diagnóstico grátis
                  </PillButton>
                </div>
                <p className="mt-6 text-base text-panel-foreground/60">
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
