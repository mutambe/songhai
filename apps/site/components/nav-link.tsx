'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Ligação do menu. Na página inicial, "/#sectores" passa a "#sectores" simples:
// o navegador troca a âncora em vez de a empilhar (#solucoes#sectores).
export function NavLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname()
  if (pathname === '/' && href.startsWith('/#')) {
    const { children, className, onClick } = props
    return (
      <a href={href.slice(1)} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
  return <Link href={href} {...props} />
}
