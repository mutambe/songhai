import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PillButton } from '@/components/pill-button'
import { formatDate } from '@/lib/blog'
import { getPost } from '@/lib/blog-store'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Artigo não encontrado — SONGHAI' }
  return {
    title: `${post.title} — SONGHAI`,
    description: post.excerpt,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao blog
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
              {post.category}
            </span>
            <h1 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-4 text-sm text-ink-soft">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
            </div>
          </div>

          <div
            className={`mt-8 h-52 rounded-3xl bg-gradient-to-br ${post.gradient}`}
          />

          <div className="mt-10">
            <p className="text-pretty font-serif text-xl leading-relaxed text-foreground">
              {post.content.lead}
            </p>

            {post.content.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 text-pretty font-serif text-lg leading-relaxed text-ink-soft"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}

            {post.content.quote && (
              <blockquote className="my-10 border-l-4 border-gold pl-6">
                <p className="text-balance font-serif text-2xl font-medium italic leading-snug text-indigo-deep">
                  {post.content.quote}
                </p>
              </blockquote>
            )}

            {post.content.callout && (
              <div className="my-10 rounded-2xl border border-line bg-paper p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-teal">
                  {post.content.callout.title}
                </p>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  {post.content.callout.body}
                </p>
              </div>
            )}
          </div>

          <div className="mt-14 rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-10">
            <h2 className="text-balance font-serif text-2xl font-semibold sm:text-3xl">
              Pronto para recuperar o tempo da sua equipa?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-primary-foreground/75">
              Agende um diagnóstico gratuito de 30 minutos com a equipa da
              Songhai.
            </p>
            <div className="mt-7 flex justify-center">
              <PillButton
                href="https://wa.me/258848986002"
                variant="gold"
                external
              >
                Falar no WhatsApp
              </PillButton>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
