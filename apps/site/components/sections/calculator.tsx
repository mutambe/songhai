'use client'

import { useMemo, useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'

const TASKS = [
  { id: 'email', label: 'Responder e-mails e mensagens', hours: 6 },
  { id: 'leads', label: 'Qualificar leads no WhatsApp', hours: 5 },
  { id: 'data', label: 'Copiar dados entre sistemas', hours: 4 },
  { id: 'reports', label: 'Gerar relatórios', hours: 3 },
  { id: 'schedule', label: 'Agendar reuniões e follow-ups', hours: 3 },
  { id: 'invoices', label: 'Processar faturas', hours: 4 },
]

const EFFICIENCY = 0.7 // 70% do tempo recuperável
const HOURLY_VALUE = 214.42 // MZN por hora (estimativa)

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="font-serif text-4xl font-semibold text-gold sm:text-5xl"
    >
      {value.toLocaleString('pt-PT')}
      {suffix}
    </motion.span>
  )
}

export function Calculator() {
  const [selected, setSelected] = useState<string[]>(['email', 'leads', 'data'])
  const [team, setTeam] = useState(3)

  const { hoursMonth, valueMonth } = useMemo(() => {
    const weekly = TASKS.filter((t) => selected.includes(t.id)).reduce(
      (sum, t) => sum + t.hours,
      0,
    )
    const hoursMonth = Math.round(weekly * 4 * team * EFFICIENCY)
    const valueMonth = Math.round(hoursMonth * HOURLY_VALUE)
    return { hoursMonth, valueMonth }
  }, [selected, team])

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  return (
    <section id="calculadora" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
            Calculadora
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Veja quanto tempo a sua equipa pode recuperar
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
            Selecione as tarefas manuais e o tamanho da equipa. A estimativa é
            atualizada em tempo real.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-6 lg:grid-cols-5">
            <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 lg:col-span-3">
              <p className="mb-4 text-sm font-medium text-foreground">
                Tarefas manuais que consomem tempo
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {TASKS.map((task) => {
                  const active = selected.includes(task.id)
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggle(task.id)}
                      aria-pressed={active}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        active
                          ? 'border-teal bg-teal/5 text-foreground'
                          : 'border-line bg-sand text-ink-soft hover:border-ink/30'
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          active
                            ? 'border-teal bg-teal text-paper'
                            : 'border-line bg-paper'
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5" />}
                      </span>
                      {task.label}
                    </button>
                  )
                })}
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <label htmlFor="team" className="font-medium text-foreground">
                    Tamanho da equipa
                  </label>
                  <span className="font-serif text-lg font-semibold text-indigo-deep">
                    {team} {team === 1 ? 'pessoa' : 'pessoas'}
                  </span>
                </div>
                <input
                  id="team"
                  type="range"
                  min={1}
                  max={20}
                  value={team}
                  onChange={(e) => setTeam(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-gold"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8 lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-primary-foreground/70">
                    Horas recuperadas por mês
                  </p>
                  <AnimatedNumber value={hoursMonth} suffix="h" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">
                    Valor estimado recuperado por mês
                  </p>
                  <AnimatedNumber value={valueMonth} suffix=" MZN" />
                </div>
              </div>

              <div className="mt-8">
                <PillButton href="/contacto" variant="gold" className="w-full">
                  Quero estes resultados — Agendar 30min grátis
                  <ArrowRight className="h-4 w-4" />
                </PillButton>
                <p className="mt-3 text-center text-xs text-primary-foreground/50">
                  Estimativa baseada em ~70% de tempo recuperável.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
