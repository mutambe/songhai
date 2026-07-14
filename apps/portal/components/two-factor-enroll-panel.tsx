'use client'

import { useState } from 'react'
import { AlertCircle, KeyRound, Mail } from 'lucide-react'

type Method = 'totp' | 'email'

export function TwoFactorEnrollPanel({
  token,
  onDone,
}: {
  token?: string
  onDone: (sessionCreated: boolean) => void
}) {
  const [method, setMethod] = useState<Method>('totp')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  const [secret, setSecret] = useState('')
  const [code, setCode] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const startTotpSetup = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/2fa/totp/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível gerar o código.')
      setQrCodeDataUrl(json.qrCodeDataUrl)
      setSecret(json.secret)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível gerar o código.')
    } finally {
      setLoading(false)
    }
  }

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
      onDone(!!json.sessionCreated)
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

      <div className="grid grid-cols-2 gap-2 rounded-full border border-line bg-sand p-1">
        <button
          type="button"
          onClick={() => setMethod('totp')}
          className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            method === 'totp' ? 'bg-primary text-primary-foreground' : 'text-ink-soft'
          }`}
        >
          <KeyRound className="h-3.5 w-3.5" />
          Autenticador
        </button>
        <button
          type="button"
          onClick={() => setMethod('email')}
          className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            method === 'email' ? 'bg-primary text-primary-foreground' : 'text-ink-soft'
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          E-mail
        </button>
      </div>

      {method === 'totp' && (
        <div className="space-y-4">
          {!qrCodeDataUrl ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-ink-soft">
                Use uma aplicação como Google Authenticator ou Authy para gerar códigos de 6
                dígitos.
              </p>
              <button
                type="button"
                onClick={startTotpSetup}
                disabled={loading}
                className="w-full rounded-full border border-line px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-ink/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'A gerar...' : 'Configurar aplicação autenticadora'}
              </button>
            </div>
          ) : (
            <form onSubmit={confirmCode} className="space-y-4">
              <div className="flex justify-center rounded-2xl border border-line bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrCodeDataUrl} alt="Código QR para configurar o autenticador" className="h-44 w-44" />
              </div>
              <p className="text-center text-xs text-ink-soft">
                Não consegue ler o código? Insira manualmente:{' '}
                <code className="rounded bg-paper-muted px-1.5 py-0.5">{secret}</code>
              </p>
              <div>
                <label htmlFor="totp-code" className="mb-2 block text-sm font-medium text-foreground">
                  Código de 6 dígitos
                </label>
                <input
                  id="totp-code"
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
                {loading ? 'A confirmar...' : 'Confirmar e ativar'}
              </button>
            </form>
          )}
        </div>
      )}

      {method === 'email' && (
        <div className="space-y-4">
          {!emailSent ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-ink-soft">
                Enviamos um código de 6 dígitos para o seu e-mail sempre que precisar de
                confirmar a sua identidade.
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
              <p className="text-sm leading-relaxed text-ink-soft">
                Insira o código de 6 dígitos que enviámos para o seu e-mail.
              </p>
              <div>
                <label htmlFor="email-code" className="mb-2 block text-sm font-medium text-foreground">
                  Código de 6 dígitos
                </label>
                <input
                  id="email-code"
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
                {loading ? 'A confirmar...' : 'Confirmar e ativar'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
