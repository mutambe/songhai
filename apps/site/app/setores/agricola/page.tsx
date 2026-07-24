import type { Metadata } from 'next'
import { VerticalPage } from '@/components/vertical-page'
import { VERTICALS } from '@/lib/verticals'

const v = VERTICALS.agricola

export const metadata: Metadata = {
  title: v.metaTitle,
  description: v.metaDescription,
  alternates: { canonical: '/setores/agricola' },
}

export default function AgricolaPage() {
  return <VerticalPage v={v} />
}
