import type { Metadata } from 'next'
import { VerticalPage } from '@/components/vertical-page'
import { VERTICALS } from '@/lib/verticals'

const v = VERTICALS.servicos

export const metadata: Metadata = {
  title: v.metaTitle,
  description: v.metaDescription,
  alternates: { canonical: '/setores/servicos' },
  openGraph: { title: v.metaTitle, description: v.metaDescription, url: '/setores/servicos' },
  twitter: { card: 'summary', title: v.metaTitle, description: v.metaDescription },
}

export default function ServicosPage() {
  return <VerticalPage v={v} />
}
