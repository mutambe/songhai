import { NextResponse } from 'next/server'
import { getSummary, getDailySeries, getBlogStats, hasAnyData } from '@/lib/analytics-store'
import { getSession, hasPermission } from '@/lib/session'

export async function GET() {
  const session = await getSession()
  if (!session || !hasPermission(session, 'canViewMetrics')) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const gotData = await hasAnyData()
  if (!gotData) {
    return NextResponse.json({ configured: true, empty: true })
  }

  const [last7, last30, daily, blogStats] = await Promise.all([
    getSummary(7),
    getSummary(30),
    getDailySeries(30),
    getBlogStats(30),
  ])

  return NextResponse.json({
    configured: true,
    empty: false,
    last7,
    last30,
    daily,
    blogStats,
  })
}
