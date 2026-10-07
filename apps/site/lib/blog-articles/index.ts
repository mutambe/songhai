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
 * Artigos escritos no código. Chegam a produção com o deploy, ao contrário dos
 * do painel (/admin/blog), que vivem no volume Docker (data/posts.json).
 * São juntos aos do painel em lib/blog-store.ts e prevalecem sobre um artigo
 * do painel com o mesmo slug.
 */
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
