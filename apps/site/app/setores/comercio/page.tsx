import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { VerticalPage } from '@/components/vertical-page'
import { VERTICALS } from '@/lib/verticals'

const v = VERTICALS.comercio

export const metadata: Metadata = pageMetadata({
  title: v.metaTitle,
  description: v.metaDescription,
  path: '/setores/comercio',
})

export default function ComercioPage() {
  return <VerticalPage v={v} />
}
