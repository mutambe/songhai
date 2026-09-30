import type { Metadata } from 'next'
import { VerticalPage } from '@/components/vertical-page'
import { VERTICALS } from '@/lib/verticals'

const v = VERTICALS.agricola

export const metadata: Metadata = {
  title: v.metaTitle,
  description: v.metaDescription,
  alternates: { canonical: '/setores/agricola' },
  openGraph: { title: v.metaTitle, description: v.metaDescription, url: '/setores/agricola' },
  twitter: { card: 'summary_large_image', title: v.metaTitle, description: v.metaDescription },
}

export default function AgricolaPage() {
  return <VerticalPage v={v} />
}
