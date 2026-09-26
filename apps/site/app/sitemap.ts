import type { MetadataRoute } from 'next'
import { listPublishedPosts } from '@/lib/blog-store'

const SITE_URL = 'https://songhai.cc'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPublishedPosts()

  // Sem lastModified: estas páginas não têm uma data de alteração real por
  // trás (ao contrário dos posts do blog, que têm publishedAt/updatedAt).
  // Gerar `new Date()` aqui fingia uma data de "última modificação" igual à
  // hora do build em todas as páginas, um sinal enganoso para o Google.
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/diagnostico`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/precos`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/setores/agricola`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/setores/comercio`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/setores/servicos`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/contacto`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacidade`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...postPages]
}
