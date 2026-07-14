import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.json')

type Subscriber = { email: string; subscribedAt: string }

async function readStore(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as Subscriber[]
  } catch {
    return []
  }
}

async function writeStore(subscribers: Subscriber[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), 'utf-8')
}

export async function addSubscriber(email: string): Promise<'added' | 'exists'> {
  const subscribers = await readStore()
  if (subscribers.some((s) => s.email === email)) return 'exists'

  subscribers.push({ email, subscribedAt: new Date().toISOString() })
  await writeStore(subscribers)
  return 'added'
}
