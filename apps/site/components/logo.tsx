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
        'inline-flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-foreground',
        className,
      )}
      aria-label="SONGHAI — página inicial"
    >
      {withMark && (
        <span className="relative inline-flex h-8 shrink-0 items-center justify-center">
          <Image
            src="/songhai-mark-light.png"
            alt="Logótipo SONGHAI"
            width={512}
            height={380}
            className="logo-mark-light relative h-8 w-auto object-contain"
            priority
          />
          <Image
            src="/songhai-mark.png"
            alt="Logótipo SONGHAI"
            width={512}
            height={380}
            className="logo-mark-dark absolute inset-0 hidden h-8 w-auto object-contain"
            priority
          />
        </span>
      )}
      <span>
        SONGHAI<span className="text-gold">.</span>
      </span>
    </Link>
  )
}
