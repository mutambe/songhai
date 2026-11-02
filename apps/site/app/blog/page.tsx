import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PillButton } from '@/components/pill-button'
import { BlogList } from '@/components/blog/blog-list'
import { Newsletter } from '@/components/blog/newsletter'
import { listPublishedPosts } from '@/lib/blog-store'

const TITLE = 'Blog — IA e Automação em Maputo, Moçambique'
const DESCRIPTION =
  'Artigos práticos sobre agentes de IA, automação de processos e casos de uso reais de empresas em Maputo e em Moçambique.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/blog',
})

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await listPublishedPosts()

  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-[1600px]">
            <h1 className="poster max-w-[20ch] text-[clamp(1.75rem,4.8vw,5rem)]">
              IA a trabalhar pela sua empresa
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-xl leading-snug text-foreground sm:text-2xl">
              Guias, casos de uso e boas práticas sobre agentes de IA e automação
              — em português de Moçambique.
            </p>
            <div className="mt-8">
              <PillButton href="/diagnostico" variant="gold">
                Diagnóstico grátis
              </PillButton>
            </div>
          </div>
        </section>
        <BlogList initialPosts={posts} />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  )
}
