import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Um só botão em todo o site: rectangular, cor plana, sem sombra nem contorno.
// O nome PillButton mantém-se para não mexer nas páginas que já o importam.
type Variant = 'dark' | 'gold' | 'outline' | 'outline-gold' | 'paper'

const styles: Record<Variant, string> = {
  dark: 'bg-primary text-primary-foreground hover:bg-indigo',
  gold: 'bg-gold text-on-gold hover:brightness-110',
  paper: 'bg-white text-[#1e2158] hover:bg-white/90',
  outline: 'bg-foreground/10 text-foreground hover:bg-foreground/15',
  'outline-gold': 'bg-gold/15 text-gold hover:bg-gold/25',
}

export function PillButton({
  children,
  href,
  variant = 'dark',
  className,
  external,
  onClick,
}: {
  children: ReactNode
  href?: string
  variant?: Variant
  className?: string
  external?: boolean
  onClick?: () => void
}) {
  const classes = cn(
    'inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3.5 text-base font-bold transition-[background-color,filter,transform] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    styles[variant],
    className,
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
