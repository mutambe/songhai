'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AlertCircle, ArrowRight, Check } from 'lucide-react'
import { AuthCard } from '@/components/auth-card'

export default function ReporSenhaPage() {
  return (
    <Suspense>
      <ReporSenhaForm />
    </Suspense>
  )
}

function ReporSenhaForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!token) {
      setError('Link inválido. Peça um novo link de recuperação.')
      return
    }
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível repor a senha.')
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível repor a senha.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <AuthCard title="Senha alterada" subtitle="A sua senha foi atualizada com sucesso.">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint/15">
            <Check className="h-6 w-6 text-mint" />
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-mint hover:text-mint/80"
          >
            Ir para o login
          </Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Repor senha" subtitle="Defina uma nova senha para a sua conta.">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
            Nova senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            required
            className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-foreground">
            Confirmar nova senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? 'A guardar...' : 'Repor senha'}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </AuthCard>
  )
}
