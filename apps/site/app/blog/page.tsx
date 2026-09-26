import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BlogList } from '@/components/blog/blog-list'
import { Newsletter } from '@/components/blog/newsletter'
import { listPublishedPosts } from '@/lib/blog-store'

const TITLE = 'Blog — IA e Automação em Maputo, Moçambique'
const DESCRIPTION =
  'Artigos práticos sobre agentes de IA, automação de processos e casos de uso reais de empresas em Maputo e em Moçambique.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/blog' },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await listPublishedPosts()

  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-5 pb-14 pt-16 text-center lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
              Blog
            </p>
            <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Ideias para pôr a IA a trabalhar pela sua empresa
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
              Guias, casos de uso e boas práticas sobre agentes de IA e automação
              — em português de Moçambique.
            </p>
          </div>
        </section>
        <BlogList initialPosts={posts} />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  )
}
