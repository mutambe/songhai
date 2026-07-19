'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Clock, X } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  CATEGORIES,
  formatDate,
  type BlogCategory,
  type BlogPost,
} from '@/lib/blog'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PostIllustration } from '@/components/blog/post-icon'

type Filter = 'Todos' | BlogCategory

export function BlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  return (
    <Suspense>
      <BlogListInner initialPosts={initialPosts} />
    </Suspense>
  )
}

function BlogListInner({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [filter, setFilter] = useState<Filter>('Todos')
  const searchParams = useSearchParams()
  const activeTag = searchParams.get('tag')

  if (initialPosts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-5 pb-24 text-center lg:px-8">
        <p className="text-ink-soft">Ainda não há artigos publicados.</p>
      </div>
    )
  }

  const byTag = activeTag
    ? initialPosts.filter((p) => p.tags?.includes(activeTag))
    : initialPosts

  if (activeTag && byTag.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-5 pb-24 text-center lg:px-8">
        <p className="text-ink-soft">Nenhum artigo com a tag "{activeTag}".</p>
        <Link href="/blog" className="mt-3 inline-block text-sm text-teal hover:underline">
          Ver todos os artigos
        </Link>
      </div>
    )
  }

  const featured = byTag.find((p) => p.featured) ?? byTag[0]
  const rest = byTag.filter((p) => p.slug !== featured.slug)
  const filtered =
    filter === 'Todos' ? rest : rest.filter((p) => p.category === filter)

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      {activeTag && (
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-soft">
          <span>
            A filtrar por tag: <span className="font-medium text-foreground">#{activeTag}</span>
          </span>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs hover:border-ink/30 hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Limpar
          </Link>
        </div>
      )}

      {/* Featured */}
      <Reveal>
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-line bg-paper lg:grid-cols-2"
        >
          <div
            className={`relative min-h-56 overflow-hidden bg-gradient-to-br ${featured.gradient} bg-cover bg-center p-8`}
            style={featured.coverImage ? { backgroundImage: `url(${featured.coverImage})` } : undefined}
          >
            {!featured.coverImage && (
              <PostIllustration
                icon={featured.icon}
                className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-paper/25"
              />
            )}
            <span className="relative inline-flex rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-indigo-deep">
              {featured.category}
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <p className="text-xs font-medium uppercase tracking-wider text-teal">
              Em destaque
            </p>
            <h2 className="mt-3 text-balance font-serif text-2xl font-semibold leading-tight text-foreground lg:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-ink-soft">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-4 text-sm text-ink-soft">
              <span>{formatDate(featured.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {featured.readingTime}
              </span>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-indigo-deep transition-colors group-hover:text-gold">
              Ler artigo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </Reveal>

      {/* Filters */}
      <div className="mt-12 flex flex-wrap gap-2">
        {(['Todos', ...CATEGORIES] as Filter[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              filter === cat
                ? 'border-indigo-deep bg-primary text-primary-foreground'
                : 'border-line bg-paper text-ink-soft hover:border-ink/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <RevealGroup
        key={filter}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((post) => (
          <RevealItem key={post.slug}>
            <motion.div whileHover={{ y: -4 }} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-shadow hover:shadow-xl hover:shadow-ink/5"
              >
                <div
                  className={`relative h-40 overflow-hidden bg-gradient-to-br ${post.gradient} bg-cover bg-center p-5`}
                  style={post.coverImage ? { backgroundImage: `url(${post.coverImage})` } : undefined}
                >
                  {!post.coverImage && (
                    <PostIllustration
                      icon={post.icon}
                      className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-paper/25"
                    />
                  )}
                  <span className="relative inline-flex rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-indigo-deep">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-balance font-serif text-lg font-semibold leading-snug text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-ink-soft">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </RevealItem>
        ))}
      </RevealGroup>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink-soft">
          Ainda não há artigos nesta categoria.
        </p>
      )}
    </div>
  )
}
