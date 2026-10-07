import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import { isPubliclyVisible, slugify, type ArticleWidget, type BlogPost } from '@/lib/blog'
import { sanitizeArticleHtml } from '@/lib/sanitize'
import { CODE_ARTICLES, CODE_ARTICLES_VERSION } from '@/lib/blog-articles'

// O HTML dos separadores (widget "tabs") é editável no painel, por isso passa
// pelo mesmo filtro que o corpo das secções.
function sanitizeWidget(widget: ArticleWidget | undefined): ArticleWidget | undefined {
  if (!widget || widget.type !== 'tabs') return widget
  return { ...widget, tabs: widget.tabs.map((t) => ({ ...t, body: sanitizeArticleHtml(t.body) })) }
}

function sanitizeContent(content: BlogPost['content']): BlogPost['content'] {
  return {
    ...content,
    sections: content.sections.map((section) => ({
      ...section,
      body: sanitizeArticleHtml(section.body),
      widget: sanitizeWidget(section.widget),
    })),
  }
}

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json')
// Regista que versão dos artigos escritos no código já foi copiada para
// posts.json, para a cópia acontecer uma só vez (ver seedCodeArticles).
const SEED_FILE = path.join(process.cwd(), 'data', 'blog-seed.json')

async function readRaw(): Promise<BlogPost[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(raw) as BlogPost[]
}

/**
 * Copia os artigos de lib/blog-articles para posts.json (o volume da VPS),
 * uma vez por versão: os novos são acrescentados e os 5 originais de julho
 * são substituídos pelas versões revistas. Depois disso o painel /admin/blog
 * é a única fonte: edições e apagamentos feitos lá nunca são desfeitos,
 * porque blog-seed.json lembra que a cópia já foi feita.
 */
async function seedCodeArticles(posts: BlogPost[]): Promise<boolean> {
  let seeded: Record<string, number> = {}
  try {
    seeded = JSON.parse(await fs.readFile(SEED_FILE, 'utf-8'))
  } catch {}

  let changed = false
  for (const article of CODE_ARTICLES) {
    if ((seeded[article.slug] ?? 0) >= CODE_ARTICLES_VERSION) continue
    const copy: BlogPost = structuredClone(article)
    const index = posts.findIndex((p) => p.slug === article.slug)
    if (index === -1) posts.push(copy)
    else posts[index] = copy
    if (copy.featured) posts.forEach((p) => p !== copy && (p.featured = false))
    seeded[article.slug] = CODE_ARTICLES_VERSION
    changed = true
  }
  if (changed) {
    await writeStore(posts)
    await fs.writeFile(SEED_FILE, JSON.stringify(seeded, null, 2), 'utf-8')
  }
  return changed
}

async function readStore(): Promise<BlogPost[]> {
  const posts = await readRaw()
  await seedCodeArticles(posts)
  return posts
}

async function writeStore(posts: BlogPost[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
}

/** Todos os posts (admin) — inclui rascunhos e agendados. */
export async function listPosts(): Promise<BlogPost[]> {
  const posts = await readStore()
  return [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

/**
 * BLOG_PREVIEW_SCHEDULED=1 mostra também os artigos agendados (data futura),
 * para os rever localmente antes de chegarem. Nunca definir em produção
 * (docker-stack.yml não a define).
 */
function isVisible(post: BlogPost) {
  if (process.env.BLOG_PREVIEW_SCHEDULED === '1') return post.status === 'published'
  return isPubliclyVisible(post)
}

/** Só posts realmente publicados (site público). */
export async function listPublishedPosts(): Promise<BlogPost[]> {
  const posts = await readStore()
  return posts
    .filter(isVisible)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

/** Post por slug (admin) — inclui rascunhos e agendados. */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await readStore()
  return posts.find((p) => p.slug === slug) ?? null
}

/** Post por slug, só se estiver publicamente visível (site público). */
export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const post = (await readStore()).find((p) => p.slug === slug) ?? null
  if (!post || !isVisible(post)) return null
  return post
}

export async function createPost(
  input: Omit<BlogPost, 'slug'> & { slug?: string },
  editorName?: string,
) {
  const posts = await readStore()
  const slug = input.slug?.trim() || slugify(input.title)
  if (posts.some((p) => p.slug === slug)) {
    throw new Error('Já existe um artigo com este slug.')
  }

  const post: BlogPost = {
    ...input,
    slug,
    content: sanitizeContent(input.content),
    updatedBy: editorName,
    updatedAt: new Date().toISOString(),
  }
  if (post.featured) {
    posts.forEach((p) => {
      p.featured = false
    })
  }
  posts.push(post)
  await writeStore(posts)
  return post
}

export async function updatePost(
  slug: string,
  input: Partial<Omit<BlogPost, 'slug'>>,
  editorName?: string,
) {
  const posts = await readStore()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return null

  Object.assign(post, input, {
    content: input.content ? sanitizeContent(input.content) : post.content,
    updatedBy: editorName,
    updatedAt: new Date().toISOString(),
  })
  if (input.featured) {
    posts.forEach((p) => {
      if (p.slug !== slug) p.featured = false
    })
  }
  await writeStore(posts)
  return post
}

export async function deletePost(slug: string) {
  const posts = await readStore()
  const index = posts.findIndex((p) => p.slug === slug)
  if (index === -1) return false

  posts.splice(index, 1)
  await writeStore(posts)
  return true
}
