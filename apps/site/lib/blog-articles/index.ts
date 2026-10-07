import type { BlogPost } from '@/lib/blog'
import { agenteWhatsapp } from './agente-whatsapp'
import { custoRetorno } from './custo-retorno'
import { mpesa } from './mpesa'
import { songhaiCrm } from './songhaicrm'
import { setores } from './setores'
import { tendencias } from './tendencias'
import { automacaoVsIa } from './revisto-automacao-vs-ia'
import { custoReal } from './revisto-custo-real'
import { agenciasGlobais } from './revisto-agencias-globais'
import { metodoMaie } from './revisto-metodo-maie'
import { clinicas } from './revisto-clinicas'

/**
 * Artigos escritos no código, copiados uma única vez para data/posts.json (o
 * volume da VPS) por lib/blog-store.ts. Depois da cópia são geridos no painel
 * /admin/blog como qualquer outro artigo; alterar este ficheiro não muda o
 * site. Para forçar uma nova cópia (substituindo as edições feitas no painel),
 * aumentar CODE_ARTICLES_VERSION.
 */
export const CODE_ARTICLES_VERSION = 1

export const CODE_ARTICLES: BlogPost[] = [
  // Novos, publicados entre agosto e outubro de 2026.
  agenteWhatsapp,
  custoRetorno,
  mpesa,
  songhaiCrm,
  setores,
  tendencias,
  // Os 5 originais de julho de 2026, revistos e enriquecidos em outubro.
  automacaoVsIa,
  custoReal,
  agenciasGlobais,
  metodoMaie,
  clinicas,
]
