'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { AuthCard } from '@/components/auth-card'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } finally {
      setLoading(false)
      setSent(true)
    }
  }

  if (sent) {
    return (
      <AuthCard title="Verifique o seu e-mail" subtitle="Enviámos as instruções de recuperação.">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint/15">
            <Check className="h-6 w-6 text-mint" />
          </div>
          <p className="text-sm leading-relaxed text-ink-soft">
            Se existir uma conta associada a <strong>{email}</strong>, vai receber um
            link para repor a senha.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-mint hover:text-mint/80">
            Voltar ao login
          </Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Recuperar senha"
      subtitle="Indique o seu e-mail e enviamos um link para repor a senha."
      footer={
        <Link href="/login" className="font-medium text-mint hover:text-mint/80">
          Voltar ao login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@songhai.cc"
            required
            className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'A enviar...' : 'Enviar link de recuperação'}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </AuthCard>
  )
}
