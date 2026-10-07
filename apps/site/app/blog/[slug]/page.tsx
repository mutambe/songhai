import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PillButton } from '@/components/pill-button'
import { formatDate } from '@/lib/blog'
import { getPublishedPost } from '@/lib/blog-store'
import { OPEN_GRAPH_DEFAULTS } from '@/lib/seo'
import { coverSources } from '@/lib/blog-covers'
import { SOCIAL_PROFILES } from '@/lib/social'
import { SocialIcon } from '@/components/social-icon'
import { ArticleWidgetView } from '@/components/blog/article-widget'
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
  const cover = post.coverImage ? coverSources(post.coverImage) : null
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
      images: cover ? [{ url: cover.absolute }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: cover ? [cover.absolute] : undefined,
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
  const cover = post.coverImage ? coverSources(post.coverImage) : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: cover ? [cover.absolute] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    // Artigos assinados por uma pessoa (ex.: Phill Muthambe) usam Person;
    // os da "Equipa Songhai" continuam como Organization.
    author: {
      '@type': post.author.startsWith('Equipa') ? 'Organization' : 'Person',
      name: post.author,
    },
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
          <Breadcrumbs
            items={[
              { name: 'Blog', href: '/blog' },
              { name: post.title, href: `/blog/${slug}` },
            ]}
          />

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
              <span>
                {formatDate(post.publishedAt)}
                {post.updatedAt && post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10) && (
                  <> · atualizado a {formatDate(post.updatedAt)}</>
                )}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
            </div>
          </div>

          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover.src}
              srcSet={cover.srcSet}
              sizes="(min-width: 768px) 720px, 100vw"
              alt={`Ilustração do artigo: ${post.title}`}
              className="mt-8 h-52 w-full rounded-3xl object-cover sm:h-72"
              // É o maior elemento da página (LCP): pedir com prioridade.
              fetchPriority="high"
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
                {section.widget && <ArticleWidgetView widget={section.widget} />}
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

          <div className="mt-10 grid gap-4 rounded-3xl border border-line bg-paper p-6 sm:grid-cols-2 sm:p-7">
            <div>
              <p className="text-sm font-semibold text-foreground">Siga a SONGHAI</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Casos reais, novidades e dicas curtas sobre IA e WhatsApp, todas as semanas.
              </p>
              <ul className="mt-3 flex gap-2">
                {SOCIAL_PROFILES.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`SONGHAI no ${s.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-teal hover:text-teal"
                    >
                      <SocialIcon network={s.name} className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Partilhe este artigo</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Conhece alguém a quem isto pode ser útil?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} https://songhai.cc/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-teal hover:text-teal"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://songhai.cc/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-teal hover:text-teal"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-10">
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
