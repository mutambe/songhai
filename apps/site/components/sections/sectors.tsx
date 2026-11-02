import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'

type Sector = {
  label: string
  // Valor aceite pelo formulário de diagnóstico (?setor=...)
  form: string
  headline: string
  desc: string
  href?: string
}

const SECTORS: Sector[] = [
  {
    label: 'Saúde e clínicas',
    form: 'Saúde & Clínicas',
    headline: 'Menos chamadas repetidas',
    desc: 'Agentes de IA respondem a resultados, confirmações e horários automaticamente.',
  },
  {
    label: 'Ferragens e construção',
    form: 'Ferragens & Material de Construção',
    headline: 'Orçamentos e stock sem parar o balcão',
    desc: 'Preços, disponibilidade e orçamentos no WhatsApp, sem tirar a equipa do atendimento presencial.',
    href: '/sectores/comercio',
  },
  {
    label: 'Retalho e comércio online',
    form: 'Retalho & E-commerce',
    headline: 'Agentes que vendem no WhatsApp',
    desc: 'Qualificam clientes, mostram produtos e processam pedidos 24 horas por dia.',
    href: '/sectores/comercio',
  },
  {
    label: 'Advocacia',
    form: 'Advocacia',
    headline: 'Menos e-mails, mais casos',
    desc: 'Respostas comuns automatizadas para a equipa se concentrar nos casos reais.',
  },
  {
    label: 'Educação',
    form: 'Educação',
    headline: 'Inscrições e confirmações sem papel',
    desc: 'Qualificam inscrições, confirmam presenças e respondem às dúvidas dos encarregados.',
  },
  {
    label: 'Agrícola',
    form: 'Agrícola',
    headline: 'Cotações e encomendas sem esperar pela colheita',
    desc: 'Respondem preços, confirmam encomendas e avisam sobre entregas, ligados ao stock em tempo real.',
    href: '/sectores/agricola',
  },
  {
    label: 'PME e startups',
    form: 'PME & Startups',
    headline: 'Crescer sem burocracia',
    desc: 'Automatizamos as tarefas repetitivas para a equipa vender, atender e fazer o negócio crescer.',
    href: '/sectores/servicos',
  },
  {
    label: 'Instituições públicas',
    form: 'Instituições Públicas',
    headline: 'Atendimento ao cidadão sem filas',
    desc: 'Respondem a pedidos e dúvidas frequentes, libertando as equipas para os casos complexos.',
  },
]

export function Sectors() {
  return (
    <section id="sectores" className="scroll-mt-16">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
        <div className="lg:col-span-5 [container-type:inline-size]">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <h2 className="poster text-[clamp(2.2rem,12.5cqw,5.5rem)]">
                Sectores de Moçambique
              </h2>
              <p className="mt-6 max-w-[34ch] text-xl leading-snug">
                Cada sector tem as suas perguntas repetidas. Veja o que um
                agente pode tratar no seu.
              </p>
            </Reveal>
            <figure className="relative -ml-8 mt-10 hidden [mask-image:linear-gradient(to_right,transparent,#000_18%,#000_72%,transparent),linear-gradient(to_bottom,transparent,#000_16%,#000_74%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in] lg:block">
              <Image
                src="/sectores-saude.webp"
                alt="Médico de bata branca a usar o telemóvel, com um portátil na mesa"
                width={1600}
                height={1067}
                sizes="40vw"
                className="aspect-[4/3] w-full object-cover object-center"
              />
            </figure>
          </div>
        </div>

        <RevealGroup className="lg:col-span-7">
          <ul className="space-y-9 lg:space-y-10">
            {SECTORS.map((s) => (
              <RevealItem key={s.label}>
                <li>
                  <Link
                    href={s.href ?? `/diagnostico?setor=${encodeURIComponent(s.form)}`}
                    className="group block lg:pr-20"
                  >
                    <span className="flex items-center justify-between gap-4 text-[clamp(1.9rem,3.2vw,3.8rem)] font-black leading-[1.02] tracking-normal transition-transform duration-300 group-hover:translate-x-3">
                      {s.label}
                      <ArrowRight className="h-[0.7em] w-[0.7em] shrink-0" aria-hidden="true" />
                    </span>
                    <span className="mt-2 block text-xl font-bold leading-snug">{s.headline}</span>
                    <span className="mt-1 block max-w-[52ch] text-lg leading-snug text-ink-soft">
                      {s.desc}
                    </span>
                  </Link>
                </li>
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>
      </div>
    </section>
  )
}
