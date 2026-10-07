import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  href = '/',
  glow = true,
  size = 'md',
}: {
  className?: string
  href?: string
  glow?: boolean
  size?: 'md' | 'lg'
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2.5 font-serif font-semibold tracking-tight text-foreground',
        size === 'lg' ? 'text-3xl' : 'text-xl',
        className,
      )}
      aria-label="Portal SONGHAI — início"
    >
      <Image
        src="/songhai-mark.png"
        alt="Logótipo SONGHAI"
        width={512}
        height={380}
        className={cn('w-auto object-contain', size === 'lg' ? 'h-12' : 'h-8', glow && 'eagle-glow')}
        priority
      />
      <span>
        SONGHAI<span className="text-gold">.</span>
      </span>
    </Link>
  )
}
