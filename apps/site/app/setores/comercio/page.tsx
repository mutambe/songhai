import type { Metadata } from 'next'
import { VerticalPage } from '@/components/vertical-page'
import { VERTICALS } from '@/lib/verticals'

const v = VERTICALS.comercio

export const metadata: Metadata = {
  title: v.metaTitle,
  description: v.metaDescription,
  alternates: { canonical: '/setores/comercio' },
  openGraph: { title: v.metaTitle, description: v.metaDescription, url: '/setores/comercio' },
  twitter: { card: 'summary', title: v.metaTitle, description: v.metaDescription },
}

export default function ComercioPage() {
  return <VerticalPage v={v} />
}
