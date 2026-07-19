export type BlogCategory =
  | 'Agentes de IA'
  | 'Automação'
  | 'Casos de uso'
  | 'Guias'

export type BlogStatus = 'draft' | 'published'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  tags: string[]
  status: BlogStatus
  /** Data/hora ISO. Um post "published" com publishedAt no futuro fica agendado. */
  publishedAt: string
  readingTime: string
  author: string
  gradient: string
  coverImage?: string
  /** Nome de um ícone em components/blog/post-icon.tsx, usado como ilustração do artigo. */
  icon?: string
  featured?: boolean
  updatedBy?: string
  updatedAt?: string
  content: {
    lead: string
    sections: { heading: string; body: string }[]
    quote?: string
    callout?: { title: string; body: string }
  }
}

export const CATEGORIES: BlogCategory[] = [
  'Agentes de IA',
  'Automação',
  'Casos de uso',
  'Guias',
]

export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function isPubliclyVisible(post: Pick<BlogPost, 'status' | 'publishedAt'>) {
  return post.status === 'published' && new Date(post.publishedAt).getTime() <= Date.now()
}
