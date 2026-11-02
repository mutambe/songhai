import Image from 'next/image'
import { ArrowRight, Clock, TrendingUp, Users } from 'lucide-react'
import { PillButton } from '@/components/pill-button'
import { formatMZN, getPlan } from '@/lib/plans'

const STARTING_PRICE = formatMZN(getPlan('simples').monthly)

const delay = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties

const BENEFITS = [
  { icon: Clock, label: 'Atendimento contínuo' },
  { icon: TrendingUp, label: 'Mais vendas' },
  { icon: Users, label: 'Clientes mais satisfeitos' },
]

const gold = 'var(--field-gold)'

// A ideia da página: a loja fecha, o WhatsApp não.
export function Hero() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-[#f4f7fc] text-[#1e2158]">
      {/* Cenário: portátil na mesa com o SonghaiCRM no ecrã. */}
      <Image
        src="/hero-cenario.webp"
        alt="Portátil sobre uma mesa de madeira com o painel Agente de IA do SonghaiCRM no ecrã"
        width={1672}
        height={941}
        priority
        quality={92}
        sizes="(min-width: 1024px) 1600px, 100vw"
        className="hero-fade pointer-events-none relative z-0 order-2 mt-2 w-full lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:h-[118%] lg:w-auto lg:max-w-none"
        style={delay(0.2)}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-0 hidden bg-gradient-to-r from-[#f4f7fc] via-[#f4f7fc]/90 via-35% to-transparent to-62% lg:block"
      />

      {/* Faixas dos cantos */}
      <svg aria-hidden viewBox="0 0 300 300" className="pointer-events-none absolute -right-2 -top-2 z-10 h-28 w-28 sm:h-44 sm:w-44">
        <path d="M120 0 H300 V190 C260 120 200 50 120 0Z" fill={gold} />
        <path d="M185 0 H300 V120 C270 70 235 30 185 0Z" fill="#f4f7fc" />
      </svg>
      <svg aria-hidden viewBox="0 0 400 200" preserveAspectRatio="xMinYMax meet" className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-36 w-72 lg:block">
        <path d="M0 40 C90 90 200 150 300 200 H0Z" fill="#1e2158" />
        <path d="M0 10 C100 60 220 130 330 200 H300 C200 150 90 90 0 40Z" fill={gold} />
      </svg>

      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] flex-col px-5 pb-6 pt-12 sm:pt-16 lg:min-h-[720px] lg:justify-center lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:max-w-[48%]">
          <h1 className="poster text-[clamp(1.9rem,3.2vw,3.7rem)]">
            <span className="mask-line">
              <span style={delay(0.05)} className="whitespace-nowrap">A loja fechou.</span>
            </span>
            <span className="mask-line">
              <span style={delay(0.16)} className="whitespace-nowrap text-[var(--field-gold)]">
                O WhatsApp não.
              </span>
            </span>
          </h1>

          <p
            className="hero-fade mt-8 max-w-[36ch] text-xl font-medium leading-snug sm:text-2xl"
            style={delay(0.45)}
          >
            Criamos agentes de IA que respondem, qualificam e vendem no WhatsApp dos
            seus clientes, de noite, ao fim-de-semana e no dia em que a equipa não
            chega a tudo.
          </p>

          <ul
            className="hero-fade mt-8 grid max-w-xl grid-cols-3 divide-x divide-[var(--field-gold)]/60"
            style={delay(0.55)}
          >
            {BENEFITS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-2 px-2 text-center">
                <Icon className="h-9 w-9 text-[var(--field-gold)]" aria-hidden />
                <span className="text-sm font-semibold sm:text-base">{label}</span>
              </li>
            ))}
          </ul>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={delay(0.65)}>
            <PillButton href="/diagnostico" variant="gold" className="rounded-full">
              Diagnóstico grátis de 30 min
              <ArrowRight className="h-5 w-5" />
            </PillButton>
            <a href="/precos" className="font-semibold underline underline-offset-4">
              Ver preços
            </a>
          </div>
          <p className="hero-fade mt-5 text-base text-[#1e2158]/80" style={delay(0.75)}>
            A partir de {STARTING_PRICE}/mês. Pronto em 30 dias. Suporte incluído.
          </p>
        </div>
      </div>
    </section>
  )
}
