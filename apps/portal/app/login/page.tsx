'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { AuthCard } from '@/components/auth-card'
import { TwoFactorEnrollPanel } from '@/components/two-factor-enroll-panel'
import { TwoFactorVerifyPanel } from '@/components/two-factor-verify-panel'

type Step =
  | { name: 'credentials' }
  | { name: 'password-change'; token: string }
  | { name: '2fa-enroll'; token: string }
  | { name: '2fa-verify'; token: string; methods: ('totp' | 'email')[] }

export default function LoginPage() {
  return (
    <Suspense>
      <LoginFlow />
    </Suspense>
  )
}

function LoginFlow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>({ name: 'credentials' })

  const goToPortal = () => {
    router.push(searchParams.get('next') || '/portal')
    router.refresh()
  }

  if (step.name === 'password-change') {
    return (
      <PasswordChangeStep
        token={step.token}
        onNext={(nextStep) => setStep(nextStep)}
      />
    )
  }

  if (step.name === '2fa-enroll') {
    return (
      <AuthCard
        title="Configure a autenticação de dois fatores"
        subtitle="É obrigatório ativar pelo menos um método antes de continuar."
      >
        <TwoFactorEnrollPanel
          token={step.token}
          onDone={(sessionCreated) => {
            if (sessionCreated) goToPortal()
          }}
        />
      </AuthCard>
    )
  }

  if (step.name === '2fa-verify') {
    return (
      <AuthCard title="Verificação em duas etapas" subtitle="Confirme a sua identidade para continuar.">
        <TwoFactorVerifyPanel token={step.token} methods={step.methods} onDone={goToPortal} />
      </AuthCard>
    )
  }

  return <CredentialsStep onNext={(nextStep) => setStep(nextStep)} onDone={goToPortal} />
}

function CredentialsStep({
  onNext,
  onDone,
}: {
  onNext: (step: Step) => void
  onDone: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Preencha o e-mail e a senha.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível entrar.')

      if (json.step === 'password-change') {
        onNext({ name: 'password-change', token: json.token })
      } else if (json.step === '2fa-enroll') {
        onNext({ name: '2fa-enroll', token: json.token })
      } else if (json.step === '2fa-verify') {
        onNext({ name: '2fa-verify', token: json.token, methods: json.methods })
      } else {
        onDone()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Entrar no Portal"
      subtitle="Acesso interno da equipa Songhai aos sistemas, clientes e dashboards."
      footer={
        <>
          Ainda não tem conta?{' '}
          <Link href="/registo" className="font-medium text-mint hover:text-mint/80">
            Pedir registo
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

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

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Senha
            </label>
            <Link href="/recuperar" className="text-xs text-ink-soft hover:text-mint">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-line bg-sand px-4 py-3 pr-11 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-ink-soft hover:text-foreground"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'A entrar...' : 'Entrar'}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </AuthCard>
  )
}

function PasswordChangeStep({
  token,
  onNext,
}: {
  token: string
  onNext: (step: Step) => void
}) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

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
      const res = await fetch('/api/auth/force-change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível alterar a senha.')

      if (json.step === '2fa-enroll') {
        onNext({ name: '2fa-enroll', token: json.token })
      } else {
        onNext({ name: '2fa-verify', token: json.token, methods: json.methods })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível alterar a senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Defina uma nova senha"
      subtitle="Por segurança, tem de escolher uma nova senha antes de continuar."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="new-password" className="mb-2 block text-sm font-medium text-foreground">
            Nova senha
          </label>
          <input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            required
            autoFocus
            className="w-full rounded-lg border border-line bg-sand px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-mint focus-visible:ring-2 focus-visible:ring-mint"
          />
        </div>

        <div>
          <label htmlFor="confirm-new-password" className="mb-2 block text-sm font-medium text-foreground">
            Confirmar nova senha
          </label>
          <input
            id="confirm-new-password"
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
          {loading ? 'A guardar...' : 'Continuar'}
        </button>
      </form>
    </AuthCard>
  )
}
