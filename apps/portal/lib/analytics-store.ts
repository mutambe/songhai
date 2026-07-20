import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

const DATA_FILE = path.join(process.cwd(), 'data', 'analytics.json')

type DayStats = {
  pageviews: number
  visitorHashes: string[]
  paths: Record<string, number>
}

type Store = Record<string, DayStats>

let writeQueue: Promise<unknown> = Promise.resolve()

function serialize<T>(fn: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(fn, fn)
  writeQueue = result.then(
    () => undefined,
    () => undefined,
  )
  return result
}

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as Store
  } catch {
    return {}
  }
}

async function writeStore(data: Store) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

function hashVisitor(ip: string, userAgent: string, date: string) {
  return crypto
    .createHash('sha256')
    .update(`${ip}|${userAgent}|${date}`)
    .digest('hex')
    .slice(0, 16)
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function recordPageview(input: { path: string; ip: string; userAgent: string }) {
  return serialize(async () => {
    const date = todayKey()
    const store = await readStore()
    if (!store[date]) {
      store[date] = { pageviews: 0, visitorHashes: [], paths: {} }
    }
    const day = store[date]
    day.pageviews += 1
    day.paths[input.path] = (day.paths[input.path] ?? 0) + 1

    const hash = hashVisitor(input.ip, input.userAgent, date)
    if (!day.visitorHashes.includes(hash)) {
      day.visitorHashes.push(hash)
    }

    await writeStore(store)
  })
}

export async function getSummary(days: number) {
  const store = await readStore()
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - (days - 1))
  cutoff.setHours(0, 0, 0, 0)

  let pageviews = 0
  let homeViews = 0
  const visitorSet = new Set<string>()
  const pathTotals: Record<string, number> = {}

  for (const [dateStr, day] of Object.entries(store)) {
    if (new Date(dateStr) < cutoff) continue
    pageviews += day.pageviews
    homeViews += day.paths['/'] ?? 0
    day.visitorHashes.forEach((h) => visitorSet.add(h))
    for (const [p, count] of Object.entries(day.paths)) {
      pathTotals[p] = (pathTotals[p] ?? 0) + count
    }
  }

  const topPaths = Object.entries(pathTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, count]) => ({ path, count }))

  return {
    pageviews,
    visitors: visitorSet.size,
    homeViews,
    topPaths,
  }
}

export async function getDailySeries(days: number) {
  const store = await readStore()
  const series: { date: string; pageviews: number; visitors: number }[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const day = store[key]
    series.push({
      date: key,
      pageviews: day?.pageviews ?? 0,
      visitors: day?.visitorHashes.length ?? 0,
    })
  }

  return series
}

export async function getBlogStats(days: number) {
  const store = await readStore()
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - (days - 1))
  cutoff.setHours(0, 0, 0, 0)

  const postTotals: Record<string, number> = {}

  for (const [dateStr, day] of Object.entries(store)) {
    if (new Date(dateStr) < cutoff) continue
    for (const [p, count] of Object.entries(day.paths)) {
      if (p.startsWith('/blog/')) {
        postTotals[p] = (postTotals[p] ?? 0) + count
      }
    }
  }

  return Object.entries(postTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([path, count]) => ({ path, count }))
}

export async function hasAnyData() {
  const store = await readStore()
  return Object.keys(store).length > 0
}
