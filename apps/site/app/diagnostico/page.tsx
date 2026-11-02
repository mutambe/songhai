import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { Search, FileText, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/motion/reveal'
import { DiagnosticoForm } from '@/components/diagnostico-form'
import { DiagnosticoFaq } from '@/components/diagnostico-faq'
import { PillButton } from '@/components/pill-button'

const TITLE = 'Diagnóstico Grátis — Quanto Perde em Tarefas Manuais?'
const DESCRIPTION =
  'Análise gratuita de 30 minutos aos processos da sua empresa, com relatório em PDF e proposta personalizada. Sem custo, sem compromisso.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/diagnostico',
})

const BENEFITS = [
  {
    icon: Search,
    title: 'Diagnóstico Personalizado',
    desc: 'Não é um checklist genérico. Auditamos os seus processos específicos, entrevistamos a sua equipa e identificamos onde está o tempo e o dinheiro perdido.',
    meta: '30 minutos de conversa',
  },
  {
    icon: FileText,
    title: 'Relatório Escrito (PDF)',
    desc: 'Sumário executivo, processos analisados, oportunidades priorizadas e estimativa de tempo e impacto financeiro recuperável — em MZN.',
    meta: 'Documento, não só promessas',
  },
  {
    icon: ShieldCheck,
    title: 'Sem Obrigação',
    desc: 'Se não concordar com o diagnóstico ou a proposta, sem problema. Sem contrato de longo prazo, sem penalidade de cancelamento.',
    meta: 'Risco zero',
  },
]

export default function DiagnosticoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
          <Reveal hero className="mx-auto max-w-[1600px]">
            <h1 className="poster max-w-[20ch] text-[clamp(1.75rem,4.8vw,5rem)]">
              Quanto tempo perde em tarefas manuais?
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-xl leading-snug text-foreground sm:text-2xl">
              Descubra em 30 minutos. Análise gratuita + relatório PDF + proposta
              personalizada.
            </p>
            <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-ink-soft">
              Marcamos uma conversa de 30 minutos. Explica-nos como funciona o
              seu negócio. Nós auditamos os seus processos, identificamos
              oportunidades e estimamos o tempo e o dinheiro que pode recuperar.
            </p>
            <p className="mt-6 text-lg font-bold text-foreground">
              Sem custo · Sem compromisso · Sem obrigação de avançar
            </p>
            <div className="mt-8">
              <PillButton href="#formulario" variant="gold">
                Preencher o formulário
              </PillButton>
            </div>
          </Reveal>
        </section>

        <section id="formulario" className="scroll-mt-20 px-5 pb-24 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-5 lg:gap-12">
            <Reveal className="lg:col-span-3">
              <div className="bg-foreground/[0.05] p-6 sm:p-8">
                <h2 className="mb-6 text-3xl font-black tracking-normal text-foreground">
                  Comece aqui
                </h2>
                <DiagnosticoForm />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="space-y-6 lg:sticky lg:top-24">
                <h2 className="text-2xl font-black tracking-normal text-foreground">
                  O que recebe
                </h2>
                {BENEFITS.map((b) => {
                  const Icon = b.icon
                  return (
                    <div
                      key={b.title}
                      className="flex gap-4 bg-foreground/[0.05] p-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-sand text-indigo-deep">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-lg font-black tracking-normal text-foreground">
                          {b.title}
                        </h3>
                        <p className="mt-1 text-base leading-relaxed text-ink-soft">
                          {b.desc}
                        </p>
                        <p className="mt-2 text-base font-semibold text-teal">
                          {b.meta}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="scroll-mt-20 bg-paper">
          <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
            <Reveal className="text-center">
              <h2 className="text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
                Tudo o que precisa de saber
              </h2>
            </Reveal>
            <div className="mt-12">
              <DiagnosticoFaq />
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 pt-4 lg:px-8">
          <Reveal className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] bg-panel px-6 py-16 text-center text-panel-foreground sm:px-12 sm:py-20">
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-balance text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.02] tracking-normal">
                  Não há risco. Não há compromisso.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-panel-foreground/75">
                  Só uma conversa de 30 minutos que pode mudar como a sua equipa
                  trabalha.
                </p>
                <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
                  <PillButton href="#formulario" variant="gold">
                    Agendar diagnóstico grátis
                  </PillButton>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
