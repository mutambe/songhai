import Image from 'next/image'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import type { Vertical } from '@/lib/verticals'

// Fotografias B2B já aprovadas (sem rostos), uma por sector.
const HERO_PHOTOS: Record<string, { src: string; alt: string }> = {
  comercio: {
    src: '/blog-covers/custo-retorno-1600.webp',
    alt: 'Mãos a tirar notas de meticais de uma carteira de couro, para pagar',
  },
  servicos: {
    src: '/blog-covers/custo-real-1600.webp',
    alt: 'Mão a assinar um contrato com uma caneta, numa mesa de escritório',
  },
  agricola: {
    src: '/blog-covers/automacao-vs-ia-1600.webp',
    alt: 'Mãos de um profissional a escrever num portátil, com o telemóvel ao lado',
  },
}

export function VerticalPage({ v }: { v: Vertical }) {
  return (
    <>
      <SiteHeader />
      <main>
        <Breadcrumbs
          className="mx-auto max-w-[1600px] px-5 pt-8 lg:px-8"
          items={[
            { name: 'Sectores', href: '/#sectores' },
            { name: v.eyebrow, href: `/sectores/${v.slug}` },
          ]}
        />
        <section className="px-5 pb-14 pt-10 lg:px-8 lg:pb-20 lg:pt-14">
          <div className="mx-auto grid max-w-[1600px] items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal hero className="lg:col-span-7">
            <h1 className="poster max-w-[20ch] text-[clamp(1.75rem,4.8vw,5rem)]">
              {v.headline}
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-xl leading-snug text-foreground sm:text-2xl">
              {v.intro}
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
              <PillButton href="/diagnostico" variant="gold">
                Diagnóstico gratuito de 30 minutos
                <ArrowRight className="h-4 w-4" />
              </PillButton>
            </div>
          </Reveal>
            {HERO_PHOTOS[v.slug] && (
              <Reveal hero delay={0.15} className="lg:col-span-5">
                <Image
                  src={HERO_PHOTOS[v.slug].src}
                  alt={HERO_PHOTOS[v.slug].alt}
                  width={1600}
                  height={1000}
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[4/3] w-full rotate-[2deg] object-cover"
                />
              </Reveal>
            )}
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-[1600px] px-5 py-20 lg:px-8">
            <Reveal className="max-w-2xl">
              <h2 className="text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
                O que reconhece no seu dia a dia?
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {v.painPoints.map((p) => (
                <RevealItem key={p.title}>
                  <div className="flex h-full flex-col gap-3 bg-foreground/[0.05] p-6">
                    <span className="flex h-10 w-10 items-center justify-center bg-paper text-indigo-deep">
                      <AlertCircle className="h-5 w-5" />
                    </span>
                    <p className="text-xl font-black tracking-normal text-foreground">
                      {p.title}
                    </p>
                    <p className="text-base leading-relaxed text-ink-soft">{p.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[1600px] px-5 py-20 lg:px-8">
            <Reveal className="max-w-2xl">
              <h2 className="text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
                O que o agente faz por si
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {v.useCases.map((u) => (
                <RevealItem key={u.title}>
                  <div className="flex h-full items-start gap-3 bg-foreground/[0.05] p-6">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center bg-teal/10 text-teal">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-lg font-black tracking-normal text-foreground">
                        {u.title}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-ink-soft">
                        {u.desc}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8">
            <Reveal>
              <p className="mb-3 text-xl font-bold text-gold">
                Plano recomendado
              </p>
              <h2 className="text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
                {v.suggestedPlan}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-ink-soft">
                {v.suggestedPlanDesc}
              </p>
              <div className="mt-8">
                <PillButton href="/precos" variant="outline">
                  Ver todos os preços
                </PillButton>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-24 pt-4 lg:px-8">
          <Reveal className="mx-auto max-w-[1600px]">
            <div className="relative overflow-hidden rounded-[2rem] bg-panel px-6 py-16 text-center text-panel-foreground sm:px-12 sm:py-20">
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
                  Diagnóstico gratuito de 30 minutos
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-panel-foreground/75">
                  Sem custo, sem compromisso. Recebe um relatório com recomendações
                  concretas para o seu negócio.
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
