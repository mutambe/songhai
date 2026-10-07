import type { BlogPost } from '@/lib/blog'
import { AUTHOR } from './shared'

export const setores: BlogPost = {
  slug: 'agentes-ia-comercio-agricultura-servicos-mocambique',
  title: 'Comércio, agricultura e serviços: o que um agente de IA faz em cada setor',
  excerpt:
    'Três setores, três rotinas diferentes. O dia a dia antes e depois de um agente de IA numa loja, num negócio agrícola e numa empresa de serviços em Moçambique, com o que muda e o que não muda.',
  category: 'Casos de uso',
  tags: ['setores', 'comércio', 'agricultura', 'serviços'],
  status: 'published',
  publishedAt: '2026-08-14T07:00:00.000Z',
  readingTime: '10 min',
  author: AUTHOR,
  gradient: 'from-[#c89b3c] via-[#1b3a4b] to-[#2f6e62]',
  coverImage: '/blog-covers/setores-1280.webp',
  icon: 'store',
  content: {
    lead:
      'Quando se fala de agentes de IA, a conversa tende a ficar no abstrato. Na prática, o que um agente faz depende muito do negócio. Uma ferragem, um fornecedor de milho e uma clínica recebem mensagens muito diferentes, em horas diferentes, com problemas diferentes. Este artigo olha para os três setores onde mais trabalhamos e descreve, com exemplos ilustrativos, como fica o dia a dia.',
    sections: [
      {
        heading: 'O que os três têm em comum',
        body: `<p>Antes das diferenças, o que se repete em todos:</p>
<ul>
<li><strong>O WhatsApp é o canal principal</strong>, muitas vezes mais usado do que o telefone e muito mais do que o email.</li>
<li><strong>Uma parte grande das mensagens é repetida</strong>: preço, disponibilidade, horário, localização.</li>
<li><strong>As mensagens não respeitam o horário.</strong> Chegam à noite, ao domingo, nos feriados.</li>
<li><strong>Quem responde é quem também faz outra coisa</strong>: atende ao balcão, negocia com fornecedores, recebe pacientes.</li>
</ul>
<p>Em todos os casos, o agente faz o mesmo tipo de trabalho: responde ao repetitivo, recolhe a informação que a equipa precisa e passa o resto. O que muda é o conteúdo.</p>`,
      },
      {
        heading: 'Antes e depois, setor a setor',
        body: `<p>Escolha o setor mais próximo do seu:</p>`,
        widget: {
          type: 'tabs',
          title: 'Um dia típico, antes e depois do agente',
          tabs: [
            {
              label: 'Comércio e retalho',
              body: `<p><strong>Exemplo ilustrativo:</strong> uma loja de materiais de construção com três pessoas no balcão.</p>
<p><strong>Antes.</strong> Entre clientes ao balcão, o telefone e o WhatsApp, as mensagens ficam para quando houver tempo. Os pedidos de orçamento com dez artigos levam meia hora a responder. À noite chegam pedidos que só são vistos no dia seguinte, e alguns desses clientes já compraram na loja ao lado.</p>
<p><strong>Depois.</strong></p>
<ul>
<li>O agente envia preços, fotos e disponibilidade a partir do catálogo.</li>
<li>Pedidos de orçamento com vários artigos são respondidos em minutos, com o total e o custo de entrega para o bairro.</li>
<li>O pagamento por M-Pesa é confirmado automaticamente e a encomenda passa para a lista de entregas.</li>
<li>O cliente recebe aviso quando o pedido sai, e deixa de ligar a perguntar.</li>
</ul>
<p><strong>O que não muda:</strong> descontos para clientes grandes, crédito a construtores conhecidos e reclamações continuam com as pessoas da loja.</p>
<p><strong>Plano mais comum:</strong> Agente Médio, ou Avançado quando há volume de pagamentos.</p>`,
            },
            {
              label: 'Agricultura e agronegócio',
              body: `<p><strong>Exemplo ilustrativo:</strong> um distribuidor de sementes, fertilizantes e cereais que trabalha com produtores e compradores de várias províncias.</p>
<p><strong>Antes.</strong> Na época alta, a pessoa que negoceia preços com compradores grandes é a mesma que responde a dezenas de pedidos de cotação por dia. Os compradores perguntam por produtos que já esgotaram, ou que só chegam na próxima colheita. Recolhas e entregas são combinadas por mensagens soltas e às vezes ficam esquecidas.</p>
<p><strong>Depois.</strong></p>
<ul>
<li>O agente responde a pedidos de cotação com os preços atualizados da semana, a qualquer hora.</li>
<li>Ligado ao registo de stock ou de colheita, deixa de prometer o que já não existe e indica quando volta a haver.</li>
<li>Marca recolhas, entregas e visitas ao terreno sem sobreposições.</li>
<li>Confirma encomendas e envia a referência de pagamento.</li>
</ul>
<p><strong>O que não muda:</strong> negociação de grandes volumes e contratos de época continuam a ser feitos por pessoas, com o agente a preparar a informação.</p>
<p><strong>Plano mais comum:</strong> Agente Simples para começar, Médio quando é preciso qualificar compradores.</p>`,
            },
            {
              label: 'Serviços',
              body: `<p><strong>Exemplo ilustrativo:</strong> uma clínica, um escritório de advogados ou um centro de formação.</p>
<p><strong>Antes.</strong> Cada marcação feita por WhatsApp é copiada à mão para a agenda. Remarcações geram conversas longas. Sem lembretes, uma parte dos clientes não aparece e o horário fica vazio. A receção passa o dia a responder às mesmas dúvidas sobre preços, documentos necessários e horários.</p>
<p><strong>Depois.</strong></p>
<ul>
<li>O agente marca, remarca e cancela diretamente na agenda, respeitando as vagas reais.</li>
<li>Envia lembretes na véspera e pede confirmação. Quem não pode vir liberta o horário a tempo.</li>
<li>Recolhe a informação inicial antes da consulta ou reunião: motivo, documentos, dados de contacto.</li>
<li>Faz o seguimento depois do serviço e lembra pagamentos pendentes.</li>
</ul>
<p><strong>O que não muda:</strong> qualquer pergunta clínica ou jurídica é sempre passada a um profissional. O agente não dá conselhos, marca e organiza.</p>
<p><strong>Plano mais comum:</strong> Agente Simples ou Médio.</p>`,
            },
          ],
        },
      },
      {
        heading: 'Vantagens e cuidados por setor',
        body: `<p><strong>No comércio</strong>, o maior ganho costuma estar nas vendas fora de horas e na velocidade dos orçamentos. O maior cuidado é manter preços e stock atualizados, porque um preço errado dado a cem clientes vira cem conversas difíceis.</p>
<p><strong>Na agricultura</strong>, o ganho está em aguentar a época alta sem contratar e em não perder cotações. O cuidado está nos preços que mudam com a campanha e com o câmbio: alguém tem de os atualizar todas as semanas, e o agente deve dizer claramente até quando cada preço é válido.</p>
<p><strong>Nos serviços</strong>, o ganho está nas faltas que deixam de acontecer e no tempo da receção. O cuidado está na confidencialidade: dados de saúde ou de processos jurídicos exigem regras de acesso apertadas e nunca devem ser usados fora do atendimento.</p>`,
        widget: {
          type: 'pros-cons',
          question: 'No seu setor, o agente traz mais ganhos ou mais trabalho?',
          pros: [
            { title: 'Mensagens fora de horas atendidas', detail: 'Em qualquer setor, é aqui que se recuperam mais clientes.' },
            { title: 'Orçamentos e cotações em minutos', detail: 'Quem responde primeiro, e bem, costuma ficar com o negócio.' },
            { title: 'Agenda sem buracos', detail: 'Lembretes e confirmações reduzem as faltas sem aviso.' },
            { title: 'Época alta sem contratar', detail: 'O volume extra de mensagens deixa de exigir pessoas a mais.' },
          ],
          cons: [
            { title: 'Preços que mudam muito', detail: 'Exigem alguém responsável por atualizar a informação do agente.' },
            { title: 'Dados sensíveis', detail: 'Saúde e justiça pedem regras de acesso e cuidados adicionais.' },
            { title: 'Clientes muito habituados ao dono', detail: 'Alguns vão estranhar no início. Convém avisar e manter o contacto humano visível.' },
            { title: 'Integração com sistemas antigos', detail: 'Ligar a um programa de stock ou faturação antigo pode levar mais tempo.' },
          ],
        },
      },
      {
        heading: 'Por onde começar em cada caso',
        body: `<ul>
<li><strong>Comércio:</strong> comece pelo catálogo e pelos orçamentos. Os pagamentos vêm a seguir, quando o fluxo de pedidos estiver estável.</li>
<li><strong>Agricultura:</strong> comece pelas cotações e pela disponibilidade. Defina com clareza a validade de cada preço.</li>
<li><strong>Serviços:</strong> comece pelas marcações e pelos lembretes. É onde o retorno aparece mais depressa.</li>
</ul>
<p>Cada setor tem uma página própria no site, com mais detalhe: <a href="/setores/comercio">comércio e retalho</a>, <a href="/setores/agricola">setor agrícola</a> e <a href="/setores/servicos">empresas de serviços</a>.</p>
<p>Se o seu negócio não cabe em nenhum destes três, provavelmente cabe num diagnóstico. <a href="/diagnostico">Marque aqui os 30 minutos gratuitos</a>, ou acompanhe os casos que publicamos no <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a> e no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> da SONGHAI.</p>`,
      },
    ],
    quote:
      'O agente não precisa de saber vender cimento, sementes ou consultas. Precisa de saber o que a sua empresa responde quando lhe perguntam por eles.',
    callout: {
      title: 'Um exercício de 10 minutos',
      body: 'Abra o WhatsApp da empresa, percorra as últimas 50 conversas e marque as que podiam ter sido respondidas só com a informação que já tem escrita. A percentagem que encontrar é uma boa estimativa do que um agente resolveria.',
    },
  },
}
