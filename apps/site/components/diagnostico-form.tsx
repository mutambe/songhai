'use client'

import { useState } from 'react'
import { Check, AlertCircle, CalendarClock } from 'lucide-react'

// Link público da Calendly — não é sensível, pode ficar hardcoded.
const CALENDLY_URL = 'https://calendly.com/songhai-limitada/30min'

const CHALLENGES = [
  'Emails repetitivos (respostas, confirmações)',
  'Agendamento manual (reuniões, consultas)',
  'Entrada de dados (de email para sistema)',
  'Qualificação de leads (triagem manual)',
  'Confirmações de reuniões / follow-ups',
  'Processamento de pedidos / faturas',
  'Relatórios (compilar dados, mandar por email)',
]

const SECTORS = [
  'Saúde & Clínicas',
  'Ferragens & Material de Construção',
  'Retalho & E-commerce',
  'Advocacia',
  'Educação',
  'PME & Startups',
  'Instituições Públicas',
  'Outro',
]

const TEAM_SIZES = ['3-10', '10-20', '20-50', '50+']

const inputClasses =
  'w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-gold transition-colors'

export function DiagnosticoForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    otherChallenge: '',
    sector: '',
    teamSize: '',
    preferredTime: '',
  })
  const [challenges, setChallenges] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleChallenge = (value: string) => {
    setChallenges((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.name || !formData.email || !formData.company) {
        throw new Error('Preencha todos os campos obrigatórios')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Email inválido')
      }

      const res = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, challenges }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro ao enviar pedido')

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        otherChallenge: '',
        sector: '',
        teamSize: '',
        preferredTime: '',
      })
      setChallenges([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar pedido')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="space-y-4 rounded-2xl border border-teal/30 bg-teal/5 px-6 py-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/20">
          <Check className="h-6 w-6 text-teal" />
        </div>
        <h3 className="font-semibold text-foreground">Pedido recebido!</h3>
        <p className="text-sm text-ink-soft">
          Recebeu a sua confirmação por email. Agora escolha o melhor horário
          para a conversa de 30 minutos.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-indigo-deep transition-all hover:shadow-lg hover:shadow-gold/30"
        >
          <CalendarClock className="h-4 w-4" />
          Escolher horário no calendário
        </a>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 block text-sm text-teal hover:text-teal/80 transition-colors"
        >
          Agendar outro diagnóstico
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-red-600 shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
          Nome completo *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="O seu nome completo"
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
          Email de trabalho *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu.email@empresa.com"
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
          Nome da empresa *
        </label>
        <input
          id="company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Nome da sua empresa"
          required
          className={inputClasses}
        />
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-foreground">
          Qual é o seu maior desafio com tarefas manuais?
        </legend>
        <div className="space-y-2">
          {CHALLENGES.map((c) => (
            <label
              key={c}
              className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-soft"
            >
              <input
                type="checkbox"
                checked={challenges.includes(c)}
                onChange={() => toggleChallenge(c)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-teal focus-visible:ring-2 focus-visible:ring-gold"
              />
              {c}
            </label>
          ))}
        </div>
        <input
          type="text"
          name="otherChallenge"
          value={formData.otherChallenge}
          onChange={handleChange}
          placeholder="Outro (opcional)"
          className={`mt-3 ${inputClasses}`}
        />
      </fieldset>

      <div>
        <label htmlFor="sector" className="mb-2 block text-sm font-medium text-foreground">
          Qual é o seu setor?
        </label>
        <select
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Selecione um setor</option>
          {SECTORS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="teamSize" className="mb-2 block text-sm font-medium text-foreground">
          Quantas pessoas na vossa equipa?
        </label>
        <select
          id="teamSize"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Selecione</option>
          {TEAM_SIZES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="preferredTime"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Qual é o melhor horário para conectarmos? (opcional)
        </label>
        <input
          id="preferredTime"
          type="text"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          placeholder='Ex: "Terça-feira, 10h-12h"'
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-indigo-deep transition-all hover:shadow-lg hover:shadow-gold/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'A enviar...' : 'Agendar meu diagnóstico grátis'}
      </button>

      <p className="text-center text-xs text-ink-soft">
        Respeitamos a sua privacidade. Não vamos mandar spam. Leia a nossa{' '}
        <a href="/privacidade" className="underline transition-colors hover:text-ink">
          Política de Privacidade
        </a>
      </p>
    </form>
  )
}
