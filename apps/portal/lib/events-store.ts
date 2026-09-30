import { promises as fs } from 'fs'
import path from 'path'

const EVENTS_FILE = path.join(process.cwd(), 'data', 'events.json')

type EventDay = {
events: Record<string, number>
campaigns: Record<string, number>
}

type EventStore = Record<string, EventDay>

let writeQueue: Promise<unknown> = Promise.resolve()

function serialize<T>(fn: () => Promise<T>): Promise<T> {
const result = writeQueue.then(fn)
writeQueue = result.then(
() => undefined,
() => undefined,
)
return result
}

async function readStore(): Promise<EventStore> {
try {
const raw = await fs.readFile(EVENTS_FILE, 'utf-8')
return JSON.parse(raw) as EventStore
} catch {
return {}
}
}

async function writeStore(data: EventStore): Promise<void> {
await fs.mkdir(path.dirname(EVENTS_FILE), { recursive: true })
await fs.writeFile(EVENTS_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

function todayKey(): string {
return new Date().toISOString().slice(0, 10)
}

// Lista branca de eventos aceites - evita que um pedido malicioso encha o
// ficheiro com nomes de eventos arbitrarios.
const ALLOWED_EVENTS = new Set(['lead', 'whatsapp_click', 'calculator_use', 'diagnostico_start'])

export function recordEvent(name: string): Promise<void> {
return serialize(async () => {
if (!ALLOWED_EVENTS.has(name)) return
const date = todayKey()
const store = await readStore()
const day: EventDay = store[date] || { events: {}, campaigns: {} }
day.events[name] = (day.events[name] || 0) + 1
store[date] = day
await writeStore(store)
})
}

export function recordCampaign(utmSource: string, utmCampaign?: string): Promise<void> {
return serialize(async () => {
const label = utmCampaign ? `${utmSource} / ${utmCampaign}` : utmSource
const date = todayKey()
const store = await readStore()
const day: EventDay = store[date] || { events: {}, campaigns: {} }
day.campaigns[label] = (day.campaigns[label] || 0) + 1
store[date] = day
await writeStore(store)
})
}

export async function getEventSummary(days: number): Promise<{
events: Record<string, number>
campaigns: { label: string; count: number }[]
}> {
const store = await readStore()
const cutoff = new Date()
cutoff.setDate(cutoff.getDate() - days)
cutoff.setHours(0, 0, 0, 0)

const events: Record<string, number> = {}
const campaignTotals: Record<string, number> = {}

for (const [dateStr, day] of Object.entries(store)) {
if (new Date(dateStr) < cutoff) continue
for (const [name, count] of Object.entries(day.events || {})) {
events[name] = (events[name] || 0) + count
}
for (const [label, count] of Object.entries(day.campaigns || {})) {
campaignTotals[label] = (campaignTotals[label] || 0) + count
}
}

const campaigns = Object.entries(campaignTotals)
.sort((a, b) => b[1] - a[1])
.slice(0, 10)
.map(([label, count]) => ({ label, count }))

return { events, campaigns }
}
