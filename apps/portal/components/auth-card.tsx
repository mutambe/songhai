import type { ReactNode } from 'react'
import { Logo } from '@/components/logo'
import { EagleMark } from '@/components/eagle-mark'

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 0%, rgba(47,230,171,0.17), transparent 70%), radial-gradient(50% 40% at 90% 100%, rgba(200,155,60,0.14), transparent 70%)',
        }}
      />
      <EagleMark className="pointer-events-none absolute -right-16 -top-16 h-[420px] w-[420px] text-mint/[6%]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo href="https://songhai.cc" glow={false} />
        </div>

        <div className="rounded-3xl border border-line bg-paper p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-15px_rgba(0,0,0,0.6)] sm:p-10">
          <h1 className="text-balance font-serif text-2xl font-semibold leading-tight text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>

        {footer && (
          <p className="mt-6 text-center text-sm text-ink-soft">{footer}</p>
        )}
      </div>
    </main>
  )
}
