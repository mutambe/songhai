'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Clock, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { coverSources } from '@/lib/blog-covers'
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
        <p className="text-ink-soft">Nenhum artigo com a tag &ldquo;{activeTag}&rdquo;.</p>
        <Link href="/blog" className="mt-3 inline-block text-base text-teal hover:underline">
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
        <div className="mb-6 flex items-center gap-2 text-base text-ink-soft">
          <span>
            A filtrar por tag: <span className="font-medium text-foreground">#{activeTag}</span>
          </span>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 bg-foreground/[0.06] px-2.5 py-1 text-base hover:bg-foreground/10 hover:text-foreground"
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
          className="group grid overflow-hidden bg-foreground/[0.05] lg:grid-cols-2"
        >
          <div
            className={`relative min-h-56 overflow-hidden bg-[var(--field-indigo)] bg-cover bg-center p-8`}
            style={featured.coverImage ? { backgroundImage: `url(${coverSources(featured.coverImage).card})` } : undefined}
          >
            {!featured.coverImage && (
              <PostIllustration
                icon={featured.icon}
                className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-paper/25"
              />
            )}
            <span className="relative inline-flex bg-paper/90 px-3 py-1 text-base font-medium text-indigo-deep">
              {featured.category}
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <p className="text-base font-semibold text-teal">
              Em destaque
            </p>
            <h2 className="mt-3 text-balance text-3xl font-black tracking-normal leading-tight text-foreground lg:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-ink-soft">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-4 text-base text-ink-soft">
              <span>{formatDate(featured.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {featured.readingTime}
              </span>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-base font-medium text-indigo-deep transition-colors group-hover:text-gold">
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
            className={`border px-4 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
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
                className="group flex h-full flex-col overflow-hidden bg-foreground/[0.05]"
              >
                <div
                  className={`relative h-40 overflow-hidden bg-[var(--field-indigo)] bg-cover bg-center p-5`}
                  style={post.coverImage ? { backgroundImage: `url(${coverSources(post.coverImage).card})` } : undefined}
                >
                  {!post.coverImage && (
                    <PostIllustration
                      icon={post.icon}
                      className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-paper/25"
                    />
                  )}
                  <span className="relative inline-flex bg-paper/90 px-3 py-1 text-base font-medium text-indigo-deep">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-balance text-xl font-black tracking-normal leading-snug text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-base text-ink-soft">
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
