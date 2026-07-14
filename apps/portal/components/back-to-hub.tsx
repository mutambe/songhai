import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function BackToHub() {
  return (
    <Link
      href="/portal"
      className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Painéis
    </Link>
  )
}
