import type { Metadata } from 'next'

// No Next.js, um `openGraph`/`twitter` definido numa página substitui por
// inteiro o do layout (não há fusão). Sem este helper, as subpáginas perdiam a
// imagem de partilha, o site_name e o locale.
const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'SONGHAI — Agentes de IA no WhatsApp para empresas em Moçambique',
}

export const OPEN_GRAPH_DEFAULTS = {
  siteName: 'SONGHAI',
  locale: 'pt_MZ',
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      type: 'website',
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: '/twitter-image', alt: OG_IMAGE.alt }],
    },
  }
}
