import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import { slugify, type BlogPost } from '@/lib/blog'

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json')

async function readStore(): Promise<BlogPost[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(raw) as BlogPost[]
}

async function writeStore(posts: BlogPost[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
}

export async function listPosts(): Promise<BlogPost[]> {
  const posts = await readStore()
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await readStore()
  return posts.find((p) => p.slug === slug) ?? null
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

  Object.assign(post, input, { updatedBy: editorName, updatedAt: new Date().toISOString() })
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
