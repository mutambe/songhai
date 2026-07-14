'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, Send } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !accepted) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Não foi possível subscrever.')
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível subscrever.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-5 pb-24 lg:px-8">
      <Reveal className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-line bg-paper p-8 text-center sm:p-12">
          <h2 className="text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Receba insights sobre IA e automação
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-ink-soft">
            Artigos práticos sobre como poupar tempo com IA, diretamente na sua
            caixa de entrada. Sem spam.
          </p>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-7 max-w-md space-y-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                O seu e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="o.seu@email.com"
                className="flex-1 rounded-full border border-line bg-sand px-5 py-3 text-sm text-foreground outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-gold"
              />
              <button
                type="submit"
                disabled={!accepted || loading || sent}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sent ? (
                  <>
                    <Check className="h-4 w-4" /> Subscrito
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> {loading ? 'A subscrever...' : 'Subscrever'}
                  </>
                )}
              </button>
            </div>
            <label className="flex items-start gap-3 text-xs text-ink-soft">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-line accent-teal"
                required
              />
              <span>
                Concordo em receber notificações por email e aceito a{' '}
                <Link
                  href="/privacidade"
                  className="underline hover:text-ink transition-colors"
                >
                  Política de Privacidade
                </Link>
              </span>
            </label>
          </form>
        </div>
      </Reveal>
    </section>
  )
}
