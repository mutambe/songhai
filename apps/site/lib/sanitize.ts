import 'server-only'
import sanitizeHtml from 'sanitize-html'

/**
 * Aplicado ao HTML de cada secção de artigo antes de gravar. O editor
 * (Tiptap) só produz um subconjunto destas tags; as tabelas foram inseridas
 * manualmente em alguns artigos existentes, por isso continuam permitidas.
 * Defesa em profundidade: mesmo que a sessão de admin do blog seja
 * comprometida, o conteúdo gravado não pode injetar <script>/on* handlers.
 */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'h2', 'h3', 'strong', 'b', 'em', 'i',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
      'hr', 'br', 'a', 'img',
      'div', 'span', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
      div: ['class'],
      span: ['class'],
      table: ['class'],
      td: ['class'],
      th: ['class'],
    },
    allowedSchemes: ['http', 'https'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  })
}
