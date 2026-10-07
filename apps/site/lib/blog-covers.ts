// Capas dos artigos, servidas a partir de songhai.cc (sem cookies de terceiros).
//
// Capas locais: public/blog-covers/<nome>-<largura>.webp, em 640/960/1280/1600px
// e formato 2:1. O artigo aponta para a versão 1280 ("/blog-covers/<nome>-1280.webp")
// e o srcset é gerado aqui. Regra de imagem da marca: pessoas negras sem rostos
// identificáveis, ou um robô com uma conversa ilustrativa, sempre ligados ao
// assunto do artigo.
//
// Fotografias da Licença Unsplash (uso comercial gratuito, sem atribuição
// obrigatória), recortadas e convertidas:
//   agente-whatsapp   nzVztZUZ3YI  Sieuwert Otterloo (+ conversa ilustrativa)
//   custo-retorno     ZeIwbS3woy0  Iwaria Inc.
//   mpesa             9Ge8ngH6JeQ  Mohamed Nohassi (+ conversa ilustrativa)
//   songhaicrm        l3MMvRYdPhc  Cytonn Photography
//   setores           s8Kzx7C6yqo  Ali Mkumbwa
//   tendencias        HuE1cJo-x34  Franck V. (+ conversa ilustrativa)
//   automacao-vs-ia   ZJEKICY5EXY  Cytonn Photography
//   custo-real        GJao3ZTX9gU  Cytonn Photography
//   agencias-globais  n95VMLxqM2I  Cytonn Photography
//   metodo-maie       DqWEAOHsAvc  Adeolu Eletu
//   clinicas          L8tWZT4CcVQ  National Cancer Institute
// (https://unsplash.com/photos/<id>)

const SITE_URL = 'https://songhai.cc'
const WIDTHS = [640, 960, 1280, 1600] as const

export type CoverSources = {
  src: string
  srcSet?: string
  /** URL absoluto para og:image / JSON-LD. */
  absolute: string
  /** Versão média, para fundos de cartões na listagem do blog. */
  card: string
}

export function coverSources(url: string): CoverSources {
  const local = url.match(/^\/blog-covers\/(.+)-\d+\.webp$/)
  if (local) {
    const file = (w: number) => `/blog-covers/${local[1]}-${w}.webp`
    return {
      src: file(1280),
      srcSet: WIDTHS.map((w) => `${file(w)} ${w}w`).join(', '),
      absolute: `${SITE_URL}${file(1280)}`,
      card: file(960),
    }
  }

  // Pexels (artigos antigos do painel): pelo menos pedir larguras adequadas.
  if (url.startsWith('https://images.pexels.com/')) {
    const sized = (w: number) => {
      const u = new URL(url)
      u.searchParams.set('w', String(w))
      return u.toString()
    }
    return {
      src: url,
      srcSet: WIDTHS.map((w) => `${sized(w)} ${w}w`).join(', '),
      absolute: url,
      card: sized(960),
    }
  }

  // Imagens enviadas pelo painel (/blog-images/...) ou outras origens.
  const absolute = url.startsWith('/') ? `${SITE_URL}${url}` : url
  return { src: url, absolute, card: url }
}
