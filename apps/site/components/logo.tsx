import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  withMark = true,
}: {
  className?: string
  withMark?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-foreground',
        className,
      )}
      aria-label="SONGHAI — página inicial"
    >
      {withMark && (
        <span className="logo-glow relative inline-flex h-8 shrink-0 items-center justify-center [aspect-ratio:512/380]">
          <Image
            src="/songhai-mark-light-sm.webp"
            alt="Logótipo SONGHAI"
            width={172}
            height={128}
            className="logo-mark-light absolute inset-0 h-full w-full object-contain"
            priority
          />
          <Image
            src="/songhai-mark-sm.webp"
            alt="Logótipo SONGHAI"
            width={172}
            height={128}
            className="logo-mark-dark absolute inset-0 hidden h-full w-full object-contain"
            priority
          />
          <span aria-hidden="true" className="logo-shine" />
        </span>
      )}
      <span>
        SONGHAI<span className="text-gold">.</span>
      </span>
    </Link>
  )
}
