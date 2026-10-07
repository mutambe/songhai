import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PillButton } from '@/components/pill-button'
import { formatDate } from '@/lib/blog'
import { getPublishedPost } from '@/lib/blog-store'
import { OPEN_GRAPH_DEFAULTS } from '@/lib/seo'
import { PostIllustration } from '@/components/blog/post-icon'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) return { title: 'Artigo não encontrado' }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'SONGHAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://songhai.cc/songhai-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://songhai.cc/blog/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        // Escapar "<" evita que um título/excerto com "</script>" feche o bloco
        // mais cedo e permita injetar HTML/script a seguir.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }}
      />
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
              <span>{formatDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
            </div>
          </div>

          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt={`Ilustração do artigo: ${post.title}`}
              className="mt-8 h-52 w-full rounded-3xl object-cover sm:h-72"
            />
          ) : (
            <div
              className={`relative mt-8 h-52 overflow-hidden rounded-3xl bg-gradient-to-br ${post.gradient} sm:h-72`}
            >
              <PostIllustration
                icon={post.icon}
                className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 text-paper/25 sm:h-72 sm:w-72"
              />
            </div>
          )}

          <div className="mt-10">
            <p className="text-pretty font-serif text-xl leading-relaxed text-foreground">
              {post.content.lead}
            </p>

            {post.content.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                <div
                  className="prose prose-lg mt-4 max-w-none font-serif leading-relaxed text-ink-soft prose-headings:font-serif prose-headings:text-foreground prose-a:text-teal prose-strong:text-foreground prose-img:rounded-2xl"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
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

            {post.tags?.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-paper-muted px-3 py-1 text-xs font-medium text-ink-soft transition-colors hover:text-teal"
                  >
                    #{tag}
                  </Link>
                ))}
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
