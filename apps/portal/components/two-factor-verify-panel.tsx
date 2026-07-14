'use client'

import { useState } from 'react'
import { AlertCircle, KeyRound, Mail } from 'lucide-react'

type Method = 'totp' | 'email'

export function TwoFactorVerifyPanel({
  token,
  methods,
  onDone,
}: {
  token: string
  methods: Method[]
  onDone: () => void
}) {
  const [method, setMethod] = useState<Method>(methods[0])
  const [code, setCode] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sendEmailCode = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/2fa/email/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível enviar o código.')
      setEmailSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar o código.')
    } finally {
      setLoading(false)
    }
  }

  const confirmCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const endpoint = method === 'totp' ? '/api/auth/2fa/totp/verify' : '/api/auth/2fa/email/verify'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, code }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Código inválido.')
      onDone()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Código inválido.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {methods.length > 1 && (
        <div className="grid grid-cols-2 gap-2 rounded-full border border-line bg-sand p-1">
          <button
            type="button"
            onClick={() => {
              setMethod('totp')
              setCode('')
            }}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              method === 'totp' ? 'bg-primary text-primary-foreground' : 'text-ink-soft'
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            Autenticador
          </button>
          <button
            type="button"
            onClick={() => {
              setMethod('email')
              setCode('')
            }}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              method === 'email' ? 'bg-primary text-primary-foreground' : 'text-ink-soft'
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            E-mail
          </button>
        </div>
      )}

      {method === 'totp' ? (
        <form onSubmit={confirmCode} className="space-y-4">
          <p className="text-sm leading-relaxed text-ink-soft">
            Insira o código de 6 dígitos da sua aplicação autenticadora.
          </p>
          <div>
            <label htmlFor="totp-verify-code" className="mb-2 block text-sm font-medium text-foreground">
              Código de 6 dígitos
            </label>
            <input
              id="totp-verify-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              inputMode="numeric"
              autoFocus
              required
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-center text-lg tracking-[0.3em] text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'A verificar...' : 'Verificar'}
          </button>
        </form>
      ) : !emailSent ? (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-ink-soft">
            Enviamos um código de 6 dígitos para o seu e-mail.
          </p>
          <button
            type="button"
            onClick={sendEmailCode}
            disabled={loading}
            className="w-full rounded-full border border-line px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-ink/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'A enviar...' : 'Enviar código por e-mail'}
          </button>
        </div>
      ) : (
        <form onSubmit={confirmCode} className="space-y-4">
          <div>
            <label htmlFor="email-verify-code" className="mb-2 block text-sm font-medium text-foreground">
              Código de 6 dígitos
            </label>
            <input
              id="email-verify-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              inputMode="numeric"
              autoFocus
              required
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-center text-lg tracking-[0.3em] text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'A verificar...' : 'Verificar'}
          </button>
        </form>
      )}
    </div>
  )
}
