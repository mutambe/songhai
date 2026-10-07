'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'dark' | 'gold' | 'outline' | 'outline-gold'

const styles: Record<Variant, string> = {
  dark: 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25',
  gold: 'bg-gold text-on-gold hover:shadow-lg hover:shadow-gold/30',
  outline:
    'border border-line bg-transparent text-foreground hover:border-ink/40',
  'outline-gold':
    'border-2 border-gold bg-transparent text-gold hover:bg-gold/5 transition-colors',
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
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    styles[variant],
    className,
  )

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {children}
    </motion.span>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      )
    }
    return <Link href={href}>{content}</Link>
  }

  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  )
}
