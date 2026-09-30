'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Stethoscope,
  Wrench,
  ShoppingBag,
  Scale,
  GraduationCap,
  Rocket,
  Landmark,
  Wheat,
  ArrowRight,
} from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'

type Sector = {
  icon: typeof Stethoscope
  label: string
  headline: string
  desc: string
  href?: string
}

const SECTORS: Sector[] = [
  {
    icon: Stethoscope,
    label: 'Saúde & Clínicas',
    headline: 'Reduzam ligações repetitivas',
    desc: 'Agentes de IA respondem a resultados, confirmações e horários automaticamente.',
  },
  {
    icon: Wrench,
    label: 'Ferragens & Material de Construção',
    headline: 'Orçamentos e stock sem parar o balcão',
    desc: 'Agentes respondem a preços, disponibilidade e orçamentos no WhatsApp, sem tirar a equipa do atendimento presencial.',
    href: '/setores/comercio',
  },
  {
    icon: ShoppingBag,
    label: 'Retalho & E-commerce',
    headline: 'Agentes que vendem no WhatsApp',
    desc: 'Qualificam leads, mostram produtos e processam pedidos 24/7.',
    href: '/setores/comercio',
  },
  {
    icon: Scale,
    label: 'Advocacia',
    headline: 'Menos emails, mais casos',
    desc: 'Agentes automatizam respostas comuns para a equipa focar em casos reais.',
  },
  {
    icon: GraduationCap,
    label: 'Educação',
    headline: 'Inscrições e confirmações automáticas',
    desc: 'Agentes qualificam inscrições, confirmam presenças e respondem dúvidas de encarregados.',
  },
  {
    icon: Wheat,
    label: 'Agrícola',
    headline: 'Cotações e encomendas sem esperar pela colheita',
    desc: 'Agentes respondem preços, confirmam encomendas e avisam sobre entregas, ligados ao seu stock em tempo real.',
    href: '/setores/agricola',
  },
  {
    icon: Rocket,
    label: 'PME & Startups',
    headline: 'Cresça mais rápido, sem burocracia',
    desc: 'Automatizamos as tarefas repetitivas para a equipa focar em vender, atender e fazer o negócio crescer.',
    href: '/setores/servicos',
  },
  {
    icon: Landmark,
    label: 'Instituições Públicas',
    headline: 'Atendimento ao cidadão sem filas',
    desc: 'Agentes respondem a pedidos e dúvidas frequentes, libertando as equipas para casos complexos.',
  },
]

export function Sectors() {
  return (
    <section id="setores" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
            Setores
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Pensado para os setores de Moçambique
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
            Cada setor tem as suas perguntas repetidas. Veja o que um agente
            pode tratar no seu.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((s) => {
            const Icon = s.icon
            const card = (
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-line bg-sand p-6 transition-colors hover:border-teal/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-indigo-deep transition-colors group-hover:text-teal">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-teal">
                  {s.label}
                </span>
                <span className="font-serif text-lg font-semibold leading-snug text-foreground">
                  {s.headline}
                </span>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
                <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-teal">
                  {s.href ? 'Ver soluções para o setor' : 'Falar sobre o meu setor'}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.div>
            )
            return (
              <RevealItem key={s.label}>
                <Link
                  href={s.href ?? `/diagnostico?setor=${encodeURIComponent(s.label)}`}
                  className="block h-full"
                >
                  {card}
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
