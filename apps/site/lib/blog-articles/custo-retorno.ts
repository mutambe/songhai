import type { BlogPost } from '@/lib/blog'
import { formatMZN, getPlan } from '@/lib/plans'
import { AUTHOR } from './shared'

const S = getPlan('simples')
const M = getPlan('medio')
const A = getPlan('avancado')

export const custoRetorno: BlogPost = {
  slug: 'quanto-custa-agente-whatsapp-e-quanto-devolve',
  title: 'Quanto custa um agente de WhatsApp em Moçambique, e quanto devolve: as contas em meticais',
  excerpt:
    'Setup, mensalidade, custos que ninguém menciona e uma calculadora para fazer as contas ao seu caso. Com três exemplos ilustrativos e os casos em que não compensa.',
  category: 'Guias',
  tags: ['preços', 'retorno', 'whatsapp'],
  status: 'published',
  publishedAt: '2026-09-23T07:00:00.000Z',
  readingTime: '10 min',
  author: AUTHOR,
  gradient: 'from-[#122733] via-[#2f6e62] to-[#c89b3c]',
  coverImage: '/blog-covers/custo-retorno-1280.webp',
  icon: 'calculator',
  content: {
    lead:
      'A pergunta que mais ouvimos depois de "funciona mesmo?" é "quanto custa?". A segunda é mais difícil de responder do que parece, porque o preço do agente é só metade da conta. A outra metade é quanto lhe custa hoje não ter um. Este artigo faz as duas.',
    sections: [
      {
        heading: 'O que entra no preço',
        body: `<p>Um agente tem dois custos: um <strong>setup</strong>, pago uma vez, que cobre a configuração, a ligação ao WhatsApp, a escrita da base de conhecimento e os testes; e uma <strong>mensalidade</strong>, que cobre o alojamento, o uso do modelo de IA, os ajustes do mês e o suporte.</p>
<p>Na SONGHAI os valores são públicos:</p>
<table>
<thead><tr><th>Plano</th><th>Mensalidade</th><th>Setup</th><th>Para quem</th></tr></thead>
<tbody>
<tr><td>${S.name}</td><td>a partir de ${formatMZN(S.monthly)}</td><td>${formatMZN(S.setup)}</td><td>Perguntas frequentes, confirmações e marcações</td></tr>
<tr><td>${M.name}</td><td>a partir de ${formatMZN(M.monthly)}</td><td>a partir de ${formatMZN(M.setup)}</td><td>Qualificação de clientes e ligação a um CRM</td></tr>
<tr><td>${A.name}</td><td>a partir de ${formatMZN(A.monthly)}</td><td>a partir de ${formatMZN(A.setup)}</td><td>Várias integrações, pagamentos M-Pesa e volume alto</td></tr>
</tbody>
</table>
<p>O "a partir de" existe porque o trabalho de ligar um agente a um sistema que a empresa já usa (um CRM, um programa de faturação, uma folha de stock) varia muito. Uma integração simples cabe no setup base. Um sistema antigo sem API pode exigir mais.</p>
<h3>Custos que convém conhecer desde o início</h3>
<ul>
<li><strong>Mensagens da Meta.</strong> Quando o agente usa o canal oficial do WhatsApp, a Meta cobra algumas categorias de mensagens, sobretudo as que a empresa envia por iniciativa própria (lembretes, avisos, campanhas). As respostas a quem escreveu primeiro seguem regras diferentes. Explicamos o impacto no seu caso durante o diagnóstico, com números.</li>
<li><strong>Tempo da equipa no primeiro mês.</strong> Alguém tem de rever as conversas e apontar o que está mal. Conte com meia hora a uma hora por dia nas primeiras duas semanas, e muito menos depois.</li>
<li><strong>Extras.</strong> Um segundo agente (por exemplo, um para vendas e outro para pós-venda), integrações adicionais ou relatórios à medida têm preços próprios, também publicados na página de preços.</li>
</ul>`,
      },
      {
        heading: 'O custo de não ter agente',
        body: `<p>Esta parte não aparece em nenhuma fatura, por isso é fácil ignorá-la.</p>
<ul>
<li><strong>Horas da equipa.</strong> Cada pergunta de preço respondida à mão leva dois, três, cinco minutos, entre ler, procurar a informação e escrever. Multiplique por dezenas de conversas e por 26 dias de trabalho.</li>
<li><strong>Clientes que desistem.</strong> Quem pede um orçamento a três fornecedores costuma ficar com o primeiro que responde bem. Responder no dia seguinte é, muitas vezes, responder tarde demais.</li>
<li><strong>Erros de cópia.</strong> Pedidos copiados do WhatsApp para um caderno ou para o Excel, com a quantidade ou o bairro trocados.</li>
<li><strong>O vendedor a fazer de recepcionista.</strong> A pessoa que devia estar a fechar negócios grandes passa a manhã a dizer o horário da loja.</li>
</ul>`,
      },
      {
        heading: 'Faça as contas ao seu caso',
        body: `<p>A conta de base é simples: <strong>horas que o agente devolve por mês × custo de uma hora da sua equipa</strong>. Se o resultado for maior do que a mensalidade, o agente paga-se só com o tempo poupado, antes de contar uma única venda a mais.</p>
<p>Mexa nos valores abaixo com os números da sua empresa. A calculadora usa os preços reais dos planos e indica qual faz sentido para o volume que escolher.</p>`,
        widget: { type: 'roi-calculator' },
      },
      {
        heading: 'Três exemplos ilustrativos',
        body: `<p>Os três negócios abaixo não são clientes reais. São perfis comuns, com números redondos, para mostrar como a mesma conta dá resultados muito diferentes.</p>
<h3>Uma ferragem na Matola</h3>
<p>60 conversas por dia, 3 minutos cada, o agente resolve 60% sozinho, uma hora da equipa vale 200 MZN. São cerca de <strong>47 horas por mês</strong>, que valem 9.360 MZN. O volume pede o plano Médio (8.000 MZN), o que deixa um saldo pequeno, perto de 1.360 MZN por mês.</p>
<p>Aqui o tempo poupado quase só paga o plano. A decisão depende de outra coisa: quantas vendas a loja perde hoje à noite e ao domingo. Se forem duas ou três chapas de zinco por semana, a conta muda completamente.</p>
<h3>Uma clínica com duas salas</h3>
<p>35 conversas por dia, 5 minutos cada (marcações levam mais tempo), 50% resolvidas pelo agente, hora a 300 MZN. Cerca de <strong>38 horas por mês</strong>, que valem perto de 11.375 MZN, contra 5.000 MZN do plano Simples. Saldo de mais de 6.000 MZN por mês, e o setup recupera-se no primeiro mês. Somam-se as faltas a consultas que os lembretes evitam.</p>
<h3>Um distribuidor de produtos agrícolas</h3>
<p>Na época alta, 120 conversas por dia, 4 minutos cada, 65% resolvidas, hora a 180 MZN. São mais de <strong>130 horas por mês</strong>, o equivalente a quase uma pessoa a tempo inteiro, com um valor perto de 24.300 MZN. O plano Avançado custa 12.000 MZN e inclui a confirmação de pagamentos por M-Pesa, que neste negócio é metade do trabalho.</p>`,
      },
      {
        heading: 'Quando não compensa',
        body: `<p>Dizemos isto a clientes com alguma frequência, e preferimos dizê-lo antes do que depois:</p>
<ul>
<li><strong>Volume baixo.</strong> Com menos de dez conversas por dia, as respostas rápidas e o catálogo gratuitos do WhatsApp Business costumam chegar.</li>
<li><strong>Informação que muda todos os dias sem dono.</strong> Se os preços mudam diariamente e ninguém os pode atualizar, o agente vai errar.</li>
<li><strong>Vendas que acontecem quase todas ao balcão.</strong> Se o WhatsApp é um canal secundário, o ganho é proporcional.</li>
<li><strong>Relação muito pessoal.</strong> Há negócios em que os clientes compram porque falam com o dono. Aí o agente pode servir só para fora de horas, ou não servir.</li>
</ul>`,
      },
      {
        heading: 'Como reduzir o risco',
        body: `<ul>
<li><strong>Piloto de um mês</strong> com setup gratuito e 50% de desconto na primeira mensalidade. Se não fizer sentido, cancela sem penalidade.</li>
<li><strong>Garantia de horas.</strong> Se no primeiro trimestre o agente não lhe poupar pelo menos 10 horas por mês, devolvemos a diferença em crédito.</li>
<li><strong>Desconto por pagamento antecipado:</strong> 10% pagando seis meses, 15% pagando doze.</li>
<li><strong>Começar pequeno.</strong> A maior parte dos clientes começa no plano Simples, só com o WhatsApp, e sobe quando os números o justificam.</li>
</ul>
<p>Todos os valores e condições estão em <a href="/precos">songhai.cc/precos</a>. Se preferir fazer estas contas com alguém, o <a href="/diagnostico">diagnóstico gratuito</a> serve exatamente para isso. E no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> e no <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a> da SONGHAI publicamos regularmente exemplos de contas como estas.</p>`,
      },
    ],
    quote:
      'O preço do agente aparece na fatura. O preço de responder tarde não aparece em lado nenhum, e costuma ser maior.',
    callout: {
      title: 'Uma regra prática',
      body: 'Se a sua equipa passa mais de duas horas por dia a responder às mesmas perguntas no WhatsApp, quase de certeza que o plano Simples se paga só com esse tempo.',
    },
  },
}
