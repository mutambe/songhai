export type BlogCategory =
  | 'Agentes de IA'
  | 'Automação'
  | 'Casos de uso'
  | 'Guias'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  date: string
  readingTime: string
  author: string
  gradient: string
  featured?: boolean
  updatedBy?: string
  updatedAt?: string
  content: {
    lead: string
    sections: { heading: string; paragraphs: string[] }[]
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
