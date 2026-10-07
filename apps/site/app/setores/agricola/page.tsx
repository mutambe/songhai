import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { VerticalPage } from '@/components/vertical-page'
import { VERTICALS } from '@/lib/verticals'

const v = VERTICALS.agricola

export const metadata: Metadata = pageMetadata({
  title: v.metaTitle,
  description: v.metaDescription,
  path: '/setores/agricola',
})

export default function AgricolaPage() {
  return <VerticalPage v={v} />
}
