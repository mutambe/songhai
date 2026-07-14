'use client'

import { motion } from 'framer-motion'
import {
  Stethoscope,
  Building,
  ShoppingBag,
  Scale,
  Truck,
  GraduationCap,
  Rocket,
  Landmark,
} from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'

const SECTORS = [
  { icon: Stethoscope, label: 'Saúde & Clínicas' },
  { icon: Building, label: 'Imobiliárias' },
  { icon: ShoppingBag, label: 'Retalho & E-commerce' },
  { icon: Scale, label: 'Advocacia' },
  { icon: Truck, label: 'Transporte & Logística' },
  { icon: GraduationCap, label: 'Educação' },
  { icon: Rocket, label: 'PME & Startups' },
  { icon: Landmark, label: 'Instituições Públicas' },
]

export function Sectors() {
  return (
    <section id="setores" className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
            Setores
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Experiência em vários setores de Moçambique
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SECTORS.map((s) => {
            const Icon = s.icon
            return (
              <RevealItem key={s.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-line bg-sand p-6 transition-colors hover:border-teal/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-indigo-deep transition-colors group-hover:text-teal">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-lg font-semibold text-foreground">
                    {s.label}
                  </span>
                </motion.div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
