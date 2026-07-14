import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'systems.json')

export type SystemStatus = 'ativo' | 'em-breve'

export type InternalSystem = {
  id: string
  name: string
  description: string
  href: string
  icon: string
  status: SystemStatus
  previewImage?: string
}

export type DashboardType = 'powerbi' | 'html'

export type Dashboard = {
  id: string
  name: string
  description: string
  type: DashboardType
  href: string
  createdAt: string
  previewImage?: string
}

type StoreData = {
  internalSystems: InternalSystem[]
  dashboards: Dashboard[]
}

async function readStore(): Promise<StoreData> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as StoreData
  } catch {
    return { internalSystems: [], dashboards: [] }
  }
}

async function writeStore(data: StoreData) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const PREVIEW_IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}
const MAX_PREVIEW_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

export function isValidPreviewImage(file: File) {
  return file.type in PREVIEW_IMAGE_TYPES && file.size <= MAX_PREVIEW_IMAGE_SIZE
}

export async function savePreviewImage(scope: 'systems' | 'dashboards', slug: string, file: File) {
  const ext = PREVIEW_IMAGE_TYPES[file.type]
  const dir = path.join(process.cwd(), 'public', 'previews', scope)
  await fs.mkdir(dir, { recursive: true })
  const filename = `${slug}-${Date.now().toString(36)}.${ext}`
  const bytes = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(path.join(dir, filename), bytes)
  return `/previews/${scope}/${filename}`
}

async function deletePreviewImage(previewImage: string | undefined) {
  if (!previewImage) return
  const filePath = path.join(process.cwd(), 'public', previewImage)
  await fs.unlink(filePath).catch(() => {})
}

export async function listInternalSystems() {
  const data = await readStore()
  return data.internalSystems
}

export async function addInternalSystem(input: {
  name: string
  description: string
  href: string
  previewImage?: string
}) {
  const data = await readStore()
  const id = `${slugify(input.name)}-${Date.now().toString(36)}`
  const system: InternalSystem = {
    id,
    name: input.name,
    description: input.description,
    href: input.href,
    icon: 'link',
    status: 'ativo',
    previewImage: input.previewImage,
  }
  data.internalSystems.push(system)
  await writeStore(data)
  return system
}

export async function updateInternalSystem(
  id: string,
  input: { name: string; description: string; href: string; previewImage?: string },
) {
  const data = await readStore()
  const system = data.internalSystems.find((s) => s.id === id)
  if (!system) return null

  system.name = input.name
  system.description = input.description
  system.href = input.href
  if (input.previewImage) {
    await deletePreviewImage(system.previewImage)
    system.previewImage = input.previewImage
  }
  await writeStore(data)
  return system
}

export async function deleteInternalSystem(id: string) {
  const data = await readStore()
  const index = data.internalSystems.findIndex((s) => s.id === id)
  if (index === -1) return false

  const [system] = data.internalSystems.splice(index, 1)
  await writeStore(data)
  await deletePreviewImage(system.previewImage)
  return true
}

export async function listDashboards() {
  const data = await readStore()
  return data.dashboards
}

export async function getDashboardById(id: string) {
  const data = await readStore()
  return data.dashboards.find((d) => d.id === id) ?? null
}

export async function addDashboard(input: {
  name: string
  description: string
  type: DashboardType
  href: string
  previewImage?: string
}) {
  const data = await readStore()
  const id = `${slugify(input.name)}-${Date.now().toString(36)}`
  const dashboard: Dashboard = {
    id,
    name: input.name,
    description: input.description,
    type: input.type,
    href: input.href,
    createdAt: new Date().toISOString(),
    previewImage: input.previewImage,
  }
  data.dashboards.push(dashboard)
  await writeStore(data)
  return dashboard
}

export async function updateDashboard(
  id: string,
  input: { name: string; description: string; href?: string; previewImage?: string },
) {
  const data = await readStore()
  const dashboard = data.dashboards.find((d) => d.id === id)
  if (!dashboard) return null

  dashboard.name = input.name
  dashboard.description = input.description
  if (dashboard.type === 'powerbi' && input.href) {
    dashboard.href = input.href
  }
  if (input.previewImage) {
    await deletePreviewImage(dashboard.previewImage)
    dashboard.previewImage = input.previewImage
  }
  await writeStore(data)
  return dashboard
}

export async function deleteDashboard(id: string) {
  const data = await readStore()
  const index = data.dashboards.findIndex((d) => d.id === id)
  if (index === -1) return false

  const [dashboard] = data.dashboards.splice(index, 1)
  await writeStore(data)

  if (dashboard.type === 'html') {
    const filePath = path.join(process.cwd(), 'public', dashboard.href)
    await fs.unlink(filePath).catch(() => {})
  }
  await deletePreviewImage(dashboard.previewImage)

  return true
}
