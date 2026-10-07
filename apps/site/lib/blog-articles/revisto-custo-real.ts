import type { BlogPost } from '@/lib/blog'
import { formatMZN, getPlan } from '@/lib/plans'
import { AUTHOR, REVISED_AT } from './shared'

const S = getPlan('simples')
const M = getPlan('medio')
const A = getPlan('avancado')

export const custoReal: BlogPost = {
  slug: 'custo-real-ia-pme-mocambique',
  title: 'Custo real de IA para PME moçambicanas, sem surpresas',
  excerpt:
    'O que está incluído no preço de um agente de IA, o que fica de fora, os custos que aparecem depois e as perguntas a fazer a qualquer fornecedor antes de assinar.',
  category: 'Guias',
  tags: ['preços', 'pme', 'contratos'],
  status: 'published',
  publishedAt: '2026-07-18T00:00:00.000Z',
  updatedAt: REVISED_AT,
  readingTime: '9 min',
  author: AUTHOR,
  gradient: 'from-[#122733] via-[#c89b3c] to-[#2f6e62]',
  coverImage: '/blog-covers/custo-real-1280.webp',
  icon: 'wallet',
  content: {
    lead:
      '"Quanto vai custar isto?" é a primeira pergunta de qualquer empresa antes de contactar uma agência. Muitas respondem "contacte-nos para orçamento", e o número só aparece depois de duas reuniões. Preferimos o contrário: pôr os valores à vista, explicar o que cada um cobre e dizer também o que não está incluído. É isso que torna um preço "sem surpresas".',
    sections: [
      {
        heading: 'A estrutura do preço',
        body: `<p>Há dois valores a ter em conta: o <strong>setup</strong>, pago uma única vez no início, e a <strong>mensalidade</strong>.</p>
<div class="overflow-x-auto"><table>
<thead><tr><th>Plano</th><th>Setup (único)</th><th>Mensalidade</th><th>Suporte</th></tr></thead>
<tbody>
<tr><td>${S.name}</td><td>${formatMZN(S.setup)}</td><td>a partir de ${formatMZN(S.monthly)}</td><td>Horário laboral, por email e WhatsApp</td></tr>
<tr><td>${M.name}</td><td>a partir de ${formatMZN(M.setup)}</td><td>a partir de ${formatMZN(M.monthly)}</td><td>Prioritário, resposta em menos de 2 horas</td></tr>
<tr><td>${A.name}</td><td>a partir de ${formatMZN(A.setup)}</td><td>a partir de ${formatMZN(A.monthly)}</td><td>Resposta em menos de 1 hora; 24/7 para incidentes críticos</td></tr>
<tr><td>Enterprise</td><td colspan="2">Proposta à medida</td><td>Gestor de conta dedicado</td></tr>
</tbody></table></div>
<p>O setup paga a configuração do agente, a ligação ao WhatsApp e aos sistemas, a escrita da base de conhecimento, os testes e a formação da equipa. A mensalidade paga o alojamento, o uso do modelo de IA, os ajustes do mês e o suporte.</p>`,
      },
      {
        heading: 'O que está incluído',
        body: `<ul>
<li><strong>Agente configurado para o seu negócio</strong>, com a sua informação, o seu tom e as suas regras.</li>
<li><strong>Ligação ao WhatsApp</strong> e ao Google Calendar em todos os planos.</li>
<li><strong>Formação da equipa</strong> para acompanhar e corrigir o agente.</li>
<li><strong>Ajustes mensais</strong>: 2 no Simples, 4 no Médio, ilimitados no Avançado. Um ajuste é, por exemplo, mudar preços, acrescentar perguntas frequentes ou alterar uma regra de passagem.</li>
<li><strong>Ligação a um CRM</strong> e qualificação automática de clientes a partir do plano Médio.</li>
<li><strong>Integrações múltiplas e pagamentos M-Pesa</strong> no plano Avançado.</li>
</ul>`,
      },
      {
        heading: 'O que não está incluído',
        body: `<p>É aqui que costumam aparecer as surpresas, por isso fica tudo escrito:</p>
<ul>
<li><strong>Desenvolvimento à medida</strong> fora do âmbito acordado. Configurar não é o mesmo que programar um sistema novo.</li>
<li><strong>Consultoria estratégica</strong>, vendida à parte.</li>
<li><strong>Integrações com sistemas antigos</strong> sem API, avaliadas caso a caso.</li>
<li><strong>Ajustes acima do limite do plano</strong>.</li>
<li><strong>Custos da Meta</strong> no canal oficial do WhatsApp, que dependem do tipo e da quantidade de mensagens que a empresa envia por iniciativa própria. Estimamos este valor no diagnóstico, antes de qualquer compromisso.</li>
</ul>
<p>Os extras mais comuns têm preço publicado: integração com outro CRM (1.000 a 2.000 MZN), integração com ERP (2.000 a 5.000 MZN), relatório personalizado (500 MZN), formação extra (200 MZN por hora) e um segundo agente (40% do plano base). A lista completa está em <a href="/precos">songhai.cc/precos</a>.</p>`,
      },
      {
        heading: 'Como saber se compensa',
        body: `<p>A conta básica é: <strong>horas que a equipa gasta por mês na tarefa × custo de uma hora dessa pessoa</strong>. Se o resultado for maior do que a mensalidade, o agente paga-se só com o tempo poupado.</p>
<p><em>Exemplo ilustrativo:</em> uma equipa gasta 40 horas por mês a responder a mensagens repetidas, a um custo de 300 MZN por hora. São 12.000 MZN de tempo. O plano Simples custa ${formatMZN(S.monthly)}, o que deixa 7.000 MZN por mês de diferença, e o setup recupera-se no primeiro mês. Com volumes maiores, o plano indicado sobe e a conta tem de ser refeita.</p>
<p>Esta conta deixa de fora o ganho que muitas vezes é maior: as vendas que deixam de se perder por falta de resposta à noite e ao fim de semana.</p>`,
      },
      {
        heading: 'Perguntas a fazer antes de assinar',
        body: `<p>Seja com a SONGHAI ou com outro fornecedor, estas perguntas evitam a maior parte dos problemas. Use o teste abaixo para avaliar a proposta que tem em mãos:</p>`,
        widget: {
          type: 'checklist',
          title: 'A proposta que recebeu é "sem surpresas"?',
          items: [
            'Os preços estão em meticais, e não em dólares a converter.',
            'O setup e a mensalidade estão separados e escritos.',
            'Está claro o que fica de fora e quanto custa à parte.',
            'Pode cancelar sem penalidade, ou com um aviso prévio curto.',
            'Os dados e as conversas dos seus clientes continuam a ser seus se sair.',
            'O suporte é em português, com horários e tempos de resposta escritos.',
            'Os custos da Meta (WhatsApp oficial) foram explicados com números.',
          ],
          results: [
            { min: 0, title: 'Proposta com muitas zonas cinzentas', body: 'Peça por escrito as respostas que faltam antes de assinar. Uma proposta clara não tem nada a esconder.' },
            { min: 4, title: 'Razoável, com pontos a esclarecer', body: 'A base está lá. Esclareça os pontos em falta, sobretudo cancelamento e propriedade dos dados.' },
            { min: 6, title: 'Proposta transparente', body: 'Tem a informação de que precisa para decidir. Agora a pergunta é só se os números compensam no seu caso.' },
          ],
        },
      },
      {
        heading: 'Formas de reduzir o risco',
        body: `<ul>
<li><strong>Piloto de um mês</strong> com setup gratuito e 50% de desconto na primeira mensalidade.</li>
<li><strong>Cancelamento sem penalidade</strong>, em qualquer mês.</li>
<li><strong>Garantia de horas:</strong> se no primeiro trimestre o agente não poupar pelo menos 10 horas por mês, devolvemos a diferença em crédito.</li>
<li><strong>Descontos</strong> de 10% pagando seis meses e de 15% pagando doze, e descontos no segundo e terceiro agente.</li>
</ul>
<p>Para fazer as contas com os números da sua empresa, marque o <a href="/diagnostico">diagnóstico gratuito de 30 minutos</a>. E se quiser ver exemplos de custos e resultados explicados em poucas linhas, siga a SONGHAI no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> e no <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a>.</p>`,
      },
    ],
    quote: 'Um preço só é transparente quando também diz o que fica de fora.',
    callout: {
      title: 'Sem penalidade se não resultar',
      body: 'Se não vir retorno, pode cancelar em qualquer mês sem custo de cancelamento. E os dados dos seus clientes não são vendidos, partilhados nem usados para treinar modelos de IA.',
    },
  },
}
