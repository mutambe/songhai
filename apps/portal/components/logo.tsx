import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  href = '/',
  glow = true,
}: {
  className?: string
  href?: string
  glow?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-foreground',
        className,
      )}
      aria-label="Portal SONGHAI — início"
    >
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center">
        {glow && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-mint/25 blur-md"
          />
        )}
        <Image
          src="/songhai-logo.png"
          alt="Logótipo SONGHAI"
          width={36}
          height={36}
          className="relative h-9 w-9 rounded-full object-cover"
          priority
        />
      </span>
      <span>
        SONGHAI<span className="text-gold">.</span>
      </span>
    </Link>
  )
}
