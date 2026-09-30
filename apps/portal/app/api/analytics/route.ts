import { NextResponse } from 'next/server'
import { getSummary, getDailySeries, getBlogStats, hasAnyData } from '@/lib/analytics-store'
import { getEventSummary } from '@/lib/events-store'
import { getSession, hasPermission } from '@/lib/session'

export async function GET() {
  const session = await getSession()
  if (!session || !hasPermission(session, 'canViewMetrics')) {
    return NextResponse.json({ error: 'Nao autorizado.' }, { status: 403 })
  }

const gotData = await hasAnyData()
  if (!gotData) {
    return NextResponse.json({ configured: true, empty: true })
  }

const [last7, last30, daily, blogStats, eventSummary] = await Promise.all([
  getSummary(7),
  getSummary(30),
  getDailySeries(30),
  getBlogStats(30),
  getEventSummary(30),
  ])

return NextResponse.json({
  configured: true,
  empty: false,
  last7,
  last30,
  daily,
  blogStats,
  leads: eventSummary.events.lead || 0,
  whatsappClicks: eventSummary.events.whatsapp_click || 0,
  calculatorUses: eventSummary.events.calculator_use || 0,
  diagnosticoStarts: eventSummary.events.diagnostico_start || 0,
  campaigns: eventSummary.campaigns,
})
}
