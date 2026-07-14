'use client'

import { useState } from 'react'
import { Check, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Preencha todos os campos obrigatórios')
      }

      // Email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Email inválido')
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro ao enviar formulário')

      setSubmitted(true)
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar formulário')
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
        <h3 className="font-semibold text-foreground">
          Mensagem enviada com sucesso!
        </h3>
        <p className="text-sm text-ink-soft">
          Obrigado pelo seu contacto. Entraremos em contacto num prazo de 24
          horas.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm text-teal hover:text-teal/80 transition-colors"
        >
          Enviar outra mensagem
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
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Nome *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome completo"
          required
          className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-gold transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu.email@empresa.com"
          required
          className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-gold transition-colors"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
          Empresa
        </label>
        <input
          id="company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Nome da sua empresa (opcional)"
          className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-gold transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Mensagem *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Descreva brevemente o seu desafio ou interesse em IA e automação..."
          required
          rows={5}
          className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-gold transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'A enviar...' : 'Enviar mensagem'}
      </button>

      <p className="text-xs text-ink-soft text-center">
        Respeitamos a sua privacidade. Leia a nossa{' '}
        <a href="/privacidade" className="underline hover:text-ink transition-colors">
          Política de Privacidade
        </a>
      </p>
    </form>
  )
}
