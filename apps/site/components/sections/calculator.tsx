'use client'

import { useMemo, useRef, useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'
import { formatMZN, formatNumber, recommendedPlan, setupLabel } from '@/lib/plans'
import { trackEvent } from '@/lib/track'

const TASKS = [
  { id: 'email', label: 'Responder e-mails e mensagens', hours: 6 },
  { id: 'leads', label: 'Qualificar leads no WhatsApp', hours: 5 },
  { id: 'data', label: 'Copiar dados entre sistemas', hours: 4 },
  { id: 'reports', label: 'Gerar relatórios', hours: 3 },
  { id: 'schedule', label: 'Agendar reuniões e follow-ups', hours: 3 },
  { id: 'invoices', label: 'Processar faturas', hours: 4 },
]

// Estimativa conservadora: metade do tempo nestas tarefas é recuperável.
const EFFICIENCY = 0.5
// Horas de trabalho por mês de uma pessoa a tempo inteiro
const WORK_HOURS_MONTH = 176
const WEEKS_PER_MONTH = 4.33

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="font-serif text-4xl font-semibold text-gold sm:text-5xl"
    >
      {formatNumber(value)}
      {suffix}
    </motion.span>
  )
}

export function Calculator() {
  const [selected, setSelected] = useState<string[]>(['email', 'leads'])
  const [team, setTeam] = useState(3)
  const [salary, setSalary] = useState(25000)
  const used = useRef(false)

  const { weekly, hoursMonth, valueMonth, plan, netMonth, paybackWeeks } = useMemo(() => {
    const weekly = TASKS.filter((t) => selected.includes(t.id)).reduce(
      (sum, t) => sum + t.hours,
      0,
    )
    const hoursMonth = Math.round(weekly * WEEKS_PER_MONTH * team * EFFICIENCY)
    const valueMonth = Math.round(hoursMonth * (salary / WORK_HOURS_MONTH))
    const plan = recommendedPlan(hoursMonth)
    const netMonth = valueMonth - plan.monthly
    // Semanas até a poupança líquida pagar o setup
    const paybackWeeks = netMonth > 0 ? Math.max(1, Math.ceil(plan.setup / (netMonth / WEEKS_PER_MONTH))) : null
    return { weekly, hoursMonth, valueMonth, plan, netMonth, paybackWeeks }
  }, [selected, team, salary])

  const markUsed = () => {
    if (used.current) return
    used.current = true
    trackEvent('calculator_use')
  }

  const toggle = (id: string) => {
    markUsed()
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

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
                  onChange={(e) => {
                    markUsed()
                    setTeam(Number(e.target.value))
                  }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-gold"
                />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <label htmlFor="salary" className="font-medium text-foreground">
                    Salário médio mensal por pessoa
                  </label>
                  <span className="whitespace-nowrap font-serif text-lg font-semibold text-indigo-deep">
                    {formatMZN(salary)}
                  </span>
                </div>
                <input
                  id="salary"
                  type="range"
                  min={10000}
                  max={150000}
                  step={5000}
                  value={salary}
                  onChange={(e) => {
                    markUsed()
                    setSalary(Number(e.target.value))
                  }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-gold"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-panel p-6 text-panel-foreground sm:p-8 lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-panel-foreground/70">
                    Horas recuperadas por mês
                  </p>
                  <AnimatedNumber value={hoursMonth} suffix="h" />
                </div>
                <div>
                  <p className="text-sm text-panel-foreground/70">
                    Valor estimado recuperado por mês
                  </p>
                  <AnimatedNumber value={valueMonth} suffix=" MZN" />
                </div>
                {hoursMonth > 0 && (
                  <div className="rounded-2xl border border-panel-foreground/15 bg-panel-foreground/5 p-4">
                    <p className="text-sm text-panel-foreground/70">
                      Plano indicativo: {plan.name} — {formatMZN(plan.monthly)}/mês + setup{' '}
                      {setupLabel(plan, true)}
                    </p>
                    {paybackWeeks !== null ? (
                      <>
                        <p className="mt-1 font-serif text-2xl font-semibold text-gold">
                          Setup pago em ~{paybackWeeks} {paybackWeeks === 1 ? 'semana' : 'semanas'}
                        </p>
                        <p className="mt-1 text-sm text-panel-foreground/70">
                          Depois disso, poupança líquida de {formatMZN(netMonth)}/mês.
                        </p>
                      </>
                    ) : (
                      <p className="mt-1 text-sm text-panel-foreground/80">
                        Com este volume, a poupança ainda não cobre o plano. No
                        diagnóstico vemos se um agente mais simples faz sentido.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8">
                <PillButton href="/diagnostico" variant="gold" className="w-full">
                  Confirmar no diagnóstico grátis
                  <ArrowRight className="h-4 w-4" />
                </PillButton>
                <p className="mt-3 text-center text-xs text-panel-foreground/50">
                  {weekly > 0
                    ? `Baseado em ${weekly}h/semana por pessoa nas tarefas selecionadas, das quais estimamos que metade é recuperável. Valores indicativos, confirmados no diagnóstico.`
                    : 'Selecione pelo menos uma tarefa. Valores indicativos, confirmados no diagnóstico.'}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
