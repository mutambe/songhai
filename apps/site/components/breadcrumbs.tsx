import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const SITE_URL = 'https://songhai.cc'

export type Crumb = { name: string; href: string }

// Caminho visível ("Início › Blog › Artigo") + BreadcrumbList em JSON-LD, que o
// Google mostra nos resultados no lugar do endereço cru.
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const trail = [{ name: 'Início', href: '/' }, ...items]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    // Âncoras (ex.: "/#setores") não são páginas — ficam só no caminho visível.
    itemListElement: trail.filter((c) => !c.href.includes('#')).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.href === '/' ? '' : c.href}`,
    })),
  }

  return (
    <nav aria-label="Caminho" className={className}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
        {trail.map((c, i) => {
          const last = i === trail.length - 1
          return (
            <li key={c.href} className="flex min-w-0 items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />}
              {last ? (
                <span aria-current="page" className="truncate text-foreground">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-foreground">
                  {c.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
