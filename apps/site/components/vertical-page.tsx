import { ArrowRight, Check, AlertCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'
import type { Vertical } from '@/lib/verticals'

export function VerticalPage({ v }: { v: Vertical }) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-5 pb-14 pt-16 text-center lg:px-8">
          <Reveal className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
              {v.eyebrow}
            </p>
            <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {v.headline}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
              {v.intro}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PillButton href="/diagnostico" variant="gold">
                Diagnóstico gratuito de 30 minutos
                <ArrowRight className="h-4 w-4" />
              </PillButton>
            </div>
          </Reveal>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
            <Reveal className="max-w-2xl">
              <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                O que reconhece no seu dia a dia?
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {v.painPoints.map((p) => (
                <RevealItem key={p.title}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-sand p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper text-indigo-deep">
                      <AlertCircle className="h-5 w-5" />
                    </span>
                    <p className="font-serif text-lg font-semibold text-foreground">
                      {p.title}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-soft">{p.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
            <Reveal className="max-w-2xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
                Como resolvemos
              </p>
              <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                O que o agente faz por si
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {v.useCases.map((u) => (
                <RevealItem key={u.title}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-paper p-6">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-serif text-base font-semibold text-foreground">
                        {u.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
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
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
                Plano recomendado
              </p>
              <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
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
                  Pronto para começar?
                </p>
                <h2 className="mx-auto max-w-2xl text-balance font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  Diagnóstico gratuito de 30 minutos
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-panel-foreground/75">
                  Sem custo, sem compromisso. Recebe um relatório com recomendações
                  concretas para o seu negócio.
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
