import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'

const IMAGES_DIR = path.join(process.cwd(), 'data', 'blog-images')

const CONTENT_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

export function isValidBlogImage(file: File) {
  return file.type in CONTENT_TYPES && file.size <= MAX_IMAGE_SIZE
}

export async function saveBlogImage(file: File) {
  const ext = CONTENT_TYPES[file.type]
  await fs.mkdir(IMAGES_DIR, { recursive: true })
  const filename = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const bytes = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(path.join(IMAGES_DIR, filename), bytes)
  return `/blog-images/${filename}`
}
