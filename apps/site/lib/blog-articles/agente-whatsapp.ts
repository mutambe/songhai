import type { BlogPost } from '@/lib/blog'
import { AUTHOR } from './shared'

export const agenteWhatsapp: BlogPost = {
  slug: 'agente-ia-whatsapp-o-que-faz-e-quando-compensa',
  title: 'Agente de IA no WhatsApp: o que faz, o que não faz e quando compensa',
  excerpt:
    'Como funciona por dentro um agente de IA no WhatsApp, onde ajuda de verdade, onde falha e como decidir se é a altura certa para o seu negócio.',
  category: 'Agentes de IA',
  tags: ['whatsapp', 'agentes de ia', 'atendimento'],
  status: 'published',
  publishedAt: '2026-10-07T07:00:00.000Z',
  readingTime: '11 min',
  author: AUTHOR,
  gradient: 'from-[#1b3a4b] via-[#2f6e62] to-[#c89b3c]',
  coverImage: '/blog-covers/agente-whatsapp-1280.webp',
  icon: 'message-circle',
  featured: true,
  content: {
    lead:
      'Quase todas as empresas com quem falamos em Maputo têm o mesmo problema no WhatsApp. As mensagens chegam a qualquer hora, metade delas é a mesma pergunta e a resposta depende de quem está livre naquele momento. Um agente de IA resolve uma boa parte disto. Não resolve tudo, e convém saber onde fica a fronteira antes de pagar por um.',
    sections: [
      {
        heading: 'O que é, sem jargão',
        body: `<p>Um agente de IA no WhatsApp é um programa ligado ao número da sua empresa que lê cada mensagem, percebe o que o cliente quer e responde com a informação que a empresa lhe deu: preços, horários, produtos, regras de entrega, formas de pagamento. Quando a pergunta sai do que ele sabe, ou quando o cliente pede uma pessoa, passa a conversa para alguém da equipa.</p>
<p>Convém separá-lo de duas coisas que já conhece:</p>
<ul>
<li><strong>As respostas automáticas do WhatsApp Business</strong> (mensagem de ausência, saudação, respostas rápidas). São textos fixos. Respondem sempre o mesmo, seja qual for a pergunta.</li>
<li><strong>Os chatbots de menu</strong>, do tipo "digite 1 para preços, 2 para horários". Funcionam enquanto o cliente segue o caminho previsto. Basta escrever "ainda têm cimento de 42,5 e entregam na Machava?" para o menu se perder.</li>
</ul>
<p>O agente lê a frase como ela vem, com erros, abreviaturas e mistura de assuntos, e responde às duas perguntas na mesma mensagem.</p>`,
      },
      {
        heading: 'Como funciona por dentro',
        body: `<p>Há quatro peças, e todas são configuradas por quem implementa o agente, não pelo cliente final:</p>
<ol>
<li><strong>A ligação ao número.</strong> Pode ser feita pela API oficial da Meta (a via mais estável para volumes grandes) ou por ligação direta ao número. A escolha mexe no custo e no risco de bloqueio, por isso decide-se no diagnóstico.</li>
<li><strong>A base de conhecimento.</strong> É o que o agente sabe: tabela de preços, perguntas frequentes, políticas de troca, zonas de entrega, horários. Se esta base estiver errada ou desatualizada, o agente responde errado com toda a confiança. É a peça mais importante e a mais esquecida.</li>
<li><strong>As regras de passagem.</strong> Em que situações o agente para e chama uma pessoa: reclamação, pedido de desconto acima de um valor, cliente que pede para falar com alguém, pergunta que ele não sabe responder.</li>
<li><strong>O registo.</strong> Cada conversa fica guardada, com o que o agente respondeu e porquê. É daqui que saem as correções da semana seguinte.</li>
</ol>
<h3>Uma conversa típica (exemplo ilustrativo)</h3>
<p>Uma ferragem na Matola, 21h40 de uma terça-feira. A loja fechou às 17h.</p>
<ul>
<li><strong>Cliente:</strong> boa noite, quanto está a chapa de zinco 3 metros? preciso de 20</li>
<li><strong>Agente:</strong> Boa noite! A chapa de zinco de 3 metros está a 1.150 MZN a unidade, 20 unidades ficam em 23.000 MZN. Para entrega, em que bairro fica a obra?</li>
<li><strong>Cliente:</strong> Khongolote</li>
<li><strong>Agente:</strong> Para Khongolote a entrega custa 800 MZN e sai no dia seguinte ao pagamento. Quer que deixe o pedido registado? Amanhã às 8h a nossa equipa confirma o stock e envia a referência de pagamento.</li>
</ul>
<p>Os preços acima são inventados para o exemplo. O que interessa é o que aconteceu: o cliente teve resposta às 21h40, a loja ficou com um pedido qualificado (produto, quantidade, local) e ninguém da equipa trabalhou fora de horas.</p>`,
      },
      {
        heading: 'Onde o agente ajuda de verdade',
        body: `<ul>
<li><strong>Perguntas repetidas.</strong> Preço, horário, localização, "têm em stock?", "fazem entrega?". Em muitos negócios isto é a maior parte das mensagens do dia.</li>
<li><strong>Fora de horas e fins de semana.</strong> O cliente que escreve às 22h e só recebe resposta às 9h do dia seguinte muitas vezes já comprou noutro lado.</li>
<li><strong>Qualificação antes da equipa entrar.</strong> O agente recolhe nome, bairro, quantidade, orçamento e urgência. Quando a conversa chega ao vendedor, ele já sabe com quem fala e não perde dez mensagens a perguntar o básico.</li>
<li><strong>Marcações.</strong> Consultas, visitas, recolhas. Ligado ao Google Calendar, o agente vê as vagas e marca sem sobrepor.</li>
<li><strong>Lembretes e confirmações.</strong> "A sua consulta é amanhã às 10h, confirma?" Reduz faltas sem ninguém passar a manhã a ligar.</li>
<li><strong>Picos.</strong> Campanhas, fim do mês, época de colheita, regresso às aulas. O agente responde a cem pessoas ao mesmo tempo com a mesma qualidade com que responde a uma.</li>
</ul>`,
      },
      {
        heading: 'Onde falha, ou onde não deve ser usado',
        body: `<p>Esta parte costuma ficar fora das apresentações comerciais. Não devia.</p>
<ul>
<li><strong>Informação desatualizada.</strong> Se o preço do cimento mudou ontem e ninguém atualizou a base de conhecimento, o agente vai dar o preço antigo a toda a gente. Alguém da empresa tem de ser dono desta informação.</li>
<li><strong>Negociação e reclamações sensíveis.</strong> Um cliente zangado com uma entrega atrasada precisa de uma pessoa, não de uma resposta bem escrita. O agente deve reconhecer o tom e passar a conversa.</li>
<li><strong>Línguas nacionais e mistura de línguas.</strong> O agente entende bem português e inglês, e lida razoavelmente com mistura e calão. Conversas inteiras em changana, ronga ou emakhuwa ainda exigem testes caso a caso antes de prometer o que quer que seja.</li>
<li><strong>Notas de voz.</strong> Muitos clientes preferem gravar. Nem todas as configurações tratam bem notas de voz longas, por isso confirme este ponto no piloto.</li>
<li><strong>Envios em massa.</strong> Usar o número para disparar promoções a milhares de contactos que não pediram é a forma mais rápida de ver o número bloqueado pela Meta. Isto não é um defeito do agente, é uma regra do WhatsApp.</li>
<li><strong>Custo fixo.</strong> O agente tem uma mensalidade, haja muitas ou poucas mensagens. Abaixo de um certo volume não compensa.</li>
</ul>`,
        widget: {
          type: 'pros-cons',
          question: 'Um agente de WhatsApp faz sentido para o seu negócio agora?',
          pros: [
            { title: 'Resposta imediata a qualquer hora', detail: 'Os clientes que escrevem à noite e ao fim de semana deixam de esperar até à manhã seguinte.' },
            { title: 'Equipa livre do repetitivo', detail: 'Quem atendia perguntas de preço passa a tratar de vendas, entregas e clientes difíceis.' },
            { title: 'Pedidos chegam qualificados', detail: 'Produto, quantidade, bairro e urgência já recolhidos antes de alguém pegar na conversa.' },
            { title: 'Aguenta picos sem contratar', detail: 'Campanhas e épocas altas deixam de significar mensagens sem resposta.' },
            { title: 'Tudo fica registado', detail: 'Sabe quem perguntou o quê, quando, e o que lhe foi respondido.' },
          ],
          cons: [
            { title: 'Mensalidade fixa', detail: 'Paga o mesmo em meses fracos. Com pouco volume, o custo pode não se justificar.' },
            { title: 'Exige informação organizada', detail: 'Preços, regras e stock têm de estar escritos e atualizados por alguém da empresa.' },
            { title: 'Não substitui o contacto humano', detail: 'Reclamações, negociação e clientes de longa data continuam a precisar de uma pessoa.' },
            { title: 'Semanas de afinação', detail: 'No primeiro mês há respostas a corrigir. É normal, mas exige atenção da equipa.' },
            { title: 'Alguns clientes desconfiam', detail: 'Há quem prefira saber que fala com uma pessoa. A transparência resolve a maioria dos casos.' },
          ],
        },
      },
      {
        heading: 'Como saber se é a altura certa',
        body: `<p>Não há uma regra única, mas há sinais que se repetem nas empresas onde o agente se paga depressa. Responda com sinceridade:</p>`,
        widget: {
          type: 'checklist',
          title: 'É altura de pôr um agente no seu WhatsApp?',
          items: [
            'Recebe mais de 20 mensagens de clientes por dia no WhatsApp.',
            'Mais de metade dessas mensagens são perguntas que já respondeu muitas vezes.',
            'Recebe mensagens fora do horário de expediente e responde só no dia seguinte.',
            'Já perdeu vendas porque respondeu tarde.',
            'Tem os preços e as regras do negócio escritos em algum lado (folha de Excel, documento, catálogo).',
            'Há alguém na equipa que pode rever as conversas do agente meia hora por semana.',
            'A mesma pessoa que vende é a que responde às mensagens repetidas.',
          ],
          results: [
            {
              min: 0,
              title: 'Ainda não é a altura',
              body: 'Com este volume, as respostas rápidas e o catálogo do WhatsApp Business dão conta do recado. Volte a fazer este teste quando as mensagens aumentarem.',
            },
            {
              min: 3,
              title: 'Vale a pena testar',
              body: 'Há ganho, mas convém confirmar com números reais. Um piloto de um mês com o plano Simples é a forma mais barata de tirar a dúvida.',
            },
            {
              min: 5,
              title: 'Está a perder tempo e vendas',
              body: 'O seu caso é o típico em que o agente se paga nos primeiros meses. O que falta é organizar a informação e definir quando a conversa passa para a equipa.',
            },
          ],
        },
      },
      {
        heading: 'Como começar sem arriscar',
        body: `<p>A maneira mais segura é um piloto curto, com metas definidas antes de começar. Na SONGHAI fazemos assim:</p>
<ol>
<li><strong>Diagnóstico gratuito de 30 minutos.</strong> Olhamos para as suas conversas reais e dizemos se compensa, e com que plano. Às vezes a resposta é que não compensa, e dizemo-lo.</li>
<li><strong>Preparação.</strong> Precisamos das 30 perguntas que mais recebe, da tabela de preços, das regras de entrega e de pagamento, e do nome de quem recebe as conversas passadas pelo agente.</li>
<li><strong>Piloto de um mês.</strong> Setup gratuito e 50% de desconto no primeiro mês. Um agente simples fica pronto em 5 a 7 dias úteis.</li>
<li><strong>Medição.</strong> No fim do mês olhamos para três números: tempo até à primeira resposta, percentagem de conversas resolvidas sem ninguém da equipa e conversas fora de horas que acabaram em venda.</li>
</ol>
<p>Se os números não convencerem, cancela sem penalidade. Os preços de cada plano estão em <a href="/precos">songhai.cc/precos</a>, em meticais e sem letras pequenas.</p>
<p>Publicamos casos e dicas curtas sobre isto no <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a> e no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> da SONGHAI. Se este tema lhe interessa, é lá que vai encontrar a continuação.</p>`,
      },
    ],
    quote:
      'Um agente bem configurado não substitui a sua equipa. Tira-lhe da frente as perguntas que ela já sabe responder de olhos fechados.',
    callout: {
      title: 'Antes de decidir',
      body: 'Conte quantas mensagens recebeu no WhatsApp na última semana e quantas eram a mesma pergunta. Esse número diz mais sobre o seu caso do que qualquer demonstração.',
    },
  },
}
