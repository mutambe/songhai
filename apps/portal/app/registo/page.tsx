'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, Check } from 'lucide-react'
import { AuthCard } from '@/components/auth-card'

export default function RegistoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [autoApproved, setAutoApproved] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.password) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }
    if (!formData.email.endsWith('@songhai.cc')) {
      setError('O registo está limitado a e-mails @songhai.cc.')
      return
    }
    if (formData.password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível concluir o registo.')
      setAutoApproved(json.status === 'approved')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível concluir o registo.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <AuthCard
        title={autoApproved ? 'Conta criada' : 'Pedido enviado'}
        subtitle={
          autoApproved
            ? 'A primeira conta do portal é sempre aprovada e definida como administradora.'
            : 'A sua conta foi submetida para aprovação.'
        }
      >
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint/15">
            <Check className="h-6 w-6 text-mint" />
          </div>
          <p className="text-sm leading-relaxed text-ink-soft">
            {autoApproved
              ? 'Pode entrar imediatamente com o e-mail e a senha que definiu.'
              : 'Um administrador da equipa Songhai vai rever o seu pedido de acesso ao portal. Assim que for aprovado, poderá entrar normalmente.'}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-mint hover:text-mint/80"
          >
            Voltar ao login
          </Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Pedir registo"
      subtitle="Acesso interno reservado à equipa Songhai. Use o seu e-mail @songhai.cc."
      footer={
        <>
          Já tem conta?{' '}
          <Link href="/login" className="font-medium text-mint hover:text-mint/80">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Nome completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="O seu nome"
            required
            className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nome@songhai.cc"
            required
            className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 8 caracteres"
            required
            className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-foreground">
            Confirmar senha
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repita a senha"
            required
            className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'A enviar...' : 'Pedir acesso'}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </AuthCard>
  )
}
