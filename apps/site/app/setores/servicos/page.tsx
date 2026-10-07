import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { VerticalPage } from '@/components/vertical-page'
import { VERTICALS } from '@/lib/verticals'

const v = VERTICALS.servicos

export const metadata: Metadata = pageMetadata({
  title: v.metaTitle,
  description: v.metaDescription,
  path: '/setores/servicos',
})

export default function ServicosPage() {
  return <VerticalPage v={v} />
}
