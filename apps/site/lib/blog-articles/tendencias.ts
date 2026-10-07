import type { BlogPost } from '@/lib/blog'
import { AUTHOR } from './shared'

export const tendencias: BlogPost = {
  slug: 'tendencias-vendas-whatsapp-ia-brasil-india-quenia-mocambique',
  title: 'O que o Brasil, a Índia e o Quénia mostram sobre o futuro das vendas pelo WhatsApp em Moçambique',
  excerpt:
    'Pagamentos dentro da conversa, agentes que executam tarefas, mensagens pagas por unidade. As tendências que já mudaram o comércio noutros mercados, e o que significam para as empresas moçambicanas.',
  category: 'Guias',
  tags: ['tendências', 'mercados', 'whatsapp', 'pagamentos'],
  status: 'published',
  publishedAt: '2026-08-01T07:00:00.000Z',
  readingTime: '12 min',
  author: AUTHOR,
  gradient: 'from-[#1b3a4b] via-[#c89b3c] to-[#122733]',
  coverImage: '/blog-covers/tendencias-1280.webp',
  icon: 'trending-up',
  content: {
    lead:
      'Moçambique não precisa de adivinhar para onde vai o comércio pelo WhatsApp. Há países onde este caminho começou mais cedo, e os resultados estão à vista. O Quénia mostrou o que acontece quando o dinheiro passa para o telemóvel. A Índia e o Brasil mostraram o que acontece quando a loja, o pagamento e o atendimento passam para dentro da conversa. Vale a pena olhar para os três com atenção, e com algum sentido crítico.',
    sections: [
      {
        heading: 'Quénia: quando o dinheiro passou para o telemóvel',
        body: `<p>O M-Pesa nasceu no Quénia em 2007, lançado pela Safaricom. Começou como forma de enviar dinheiro a familiares e acabou por se tornar a infraestrutura de pagamentos de boa parte da economia: pequenos comerciantes, transportes, contas de serviços, salários.</p>
<p>A lição para nós não é o M-Pesa em si, que em Moçambique existe desde 2013 através da Vodacom, ao lado do e-Mola e do mKesh. A lição é o que veio depois: <strong>quando quase toda a gente consegue pagar pelo telemóvel, o passo seguinte é vender pelo telemóvel de ponta a ponta</strong>. O pagamento deixa de ser o obstáculo e o obstáculo passa a ser o atendimento: responder depressa, confirmar sem erros, entregar a horas.</p>
<p>Em Moçambique, a primeira parte já aconteceu. A segunda está a começar.</p>`,
      },
      {
        heading: 'Índia: comprar sem sair da conversa',
        body: `<p>A Índia juntou duas coisas: um sistema público de pagamentos instantâneos (o UPI, lançado em 2016) e uma utilização massiva do WhatsApp. O resultado foi a compra feita inteiramente dentro da conversa. Em 2022, a JioMart passou a permitir encomendar mercearia diretamente no WhatsApp, do catálogo ao carrinho e ao pagamento, sem abrir outra aplicação.</p>
<p>O que isto ensina:</p>
<ul>
<li><strong>Cada aplicação a mais é um cliente a menos.</strong> Pedir ao cliente que saia do WhatsApp para um site, preencha um formulário e volte é perder parte dele pelo caminho.</li>
<li><strong>O catálogo tem de estar onde está a conversa.</strong> O WhatsApp Business já tem catálogo e carrinho. A maioria das empresas moçambicanas ainda não os usa, ou usa-os desatualizados.</li>
</ul>`,
      },
      {
        heading: 'Brasil: o WhatsApp como balcão principal',
        body: `<p>No Brasil, o Pix, lançado pelo Banco Central em 2020, tornou o pagamento instantâneo uma coisa banal. Ao mesmo tempo, o WhatsApp tornou-se o principal canal de atendimento de uma enorme quantidade de empresas, das pequenas lojas às grandes marcas. Foi também ali que o próprio WhatsApp testou pagamentos dentro da conversa.</p>
<p>A consequência mais interessante não foi tecnológica, foi de expectativa: <strong>os clientes passaram a esperar resposta no WhatsApp em minutos, a qualquer hora</strong>. As empresas que não acompanharam ficaram com fama de lentas, mesmo quando o produto era bom.</p>
<p>Foi essa pressão que levou ao uso generalizado de automação e, mais recentemente, de agentes de IA no atendimento. Moçambique tem uma vantagem aqui: pode aprender com os erros. Muitas empresas brasileiras começaram com robôs de menu rígidos que irritavam os clientes, e tiveram de recomeçar.</p>`,
      },
      {
        heading: 'Cinco tendências que vão chegar cá',
        body: `<ol>
<li><strong>Agentes que fazem, não só respondem.</strong> A geração anterior de bots respondia a perguntas. Os agentes atuais consultam stock, marcam na agenda, geram referências de pagamento e atualizam o CRM. A própria Meta tem vindo a testar assistentes de IA para empresas dentro do WhatsApp.</li>
<li><strong>Pagamento dentro da conversa.</strong> Em Moçambique, a forma mais realista é a ligação do agente às carteiras móveis: o cliente recebe o pedido de pagamento no telemóvel e confirma com o PIN, sem capturas de ecrã.</li>
<li><strong>Mensagens pagas por unidade.</strong> Em 2025 a Meta mudou a forma de cobrar o canal oficial, passando a cobrar por mensagem em várias categorias. Isto vai premiar quem envia pouco e bem, e castigar quem dispara campanhas em massa.</li>
<li><strong>Notas de voz como texto.</strong> Em mercados onde se grava mais do que se escreve, como o nosso, a transcrição automática de notas de voz vai tornar-se essencial para qualquer agente.</li>
<li><strong>Confiança e proteção de dados.</strong> Com mais burlas pelo WhatsApp, os clientes vão preferir empresas com número verificado, regras claras ("nunca pedimos o PIN") e dados bem guardados.</li>
</ol>`,
      },
      {
        heading: 'O que é diferente em Moçambique',
        body: `<p>Copiar o que funcionou noutro país sem ajustar é um erro comum. Há diferenças que contam:</p>
<ul>
<li><strong>Custo dos dados móveis.</strong> Mensagens com muitas fotografias e vídeos pesam no pacote do cliente. Um bom agente responde com texto curto e só envia imagens quando pedidas.</li>
<li><strong>Cobertura de rede fora das cidades.</strong> Em zonas rurais, as mensagens podem chegar com atraso. Fluxos de pagamento têm de tolerar isso.</li>
<li><strong>Línguas nacionais.</strong> Português e inglês funcionam bem. Changana, ronga, emakhuwa, sena e as outras línguas ainda exigem testes cuidadosos antes de qualquer promessa.</li>
<li><strong>Energia.</strong> Lojas com cortes de energia frequentes beneficiam de ter o atendimento a correr num servidor, e não no telemóvel ou no computador da loja.</li>
<li><strong>Empresas pequenas.</strong> A maioria das empresas tem poucas pessoas. As soluções têm de ser simples de usar e baratas para começar, em meticais.</li>
</ul>`,
        widget: {
          type: 'pros-cons',
          question: 'Adotar já, ou esperar que o mercado amadureça?',
          pros: [
            { title: 'Vantagem sobre a concorrência', detail: 'Enquanto poucos respondem a qualquer hora, quem o faz destaca-se mais.' },
            { title: 'Os clientes já lá estão', detail: 'WhatsApp e carteiras móveis já fazem parte do dia a dia dos seus clientes.' },
            { title: 'Aprender com tempo', detail: 'Quem começa cedo afina o agente com calma, antes de ser obrigatório.' },
            { title: 'Custos de entrada baixos', detail: 'Hoje é possível começar com um plano pequeno e um piloto de um mês.' },
          ],
          cons: [
            { title: 'Tecnologia a mudar depressa', detail: 'Regras e preços do WhatsApp e dos modelos de IA mudam várias vezes por ano.' },
            { title: 'Clientes ainda a habituar-se', detail: 'Alguns segmentos preferem falar com uma pessoa e vão demorar a mudar.' },
            { title: 'Exige organização interna', detail: 'Preços, stock e regras têm de estar escritos antes de qualquer automação.' },
            { title: 'Línguas nacionais ainda limitadas', detail: 'Se os seus clientes escrevem sobretudo em línguas nacionais, o ganho hoje é menor.' },
          ],
        },
      },
      {
        heading: 'Em que fase está a sua empresa?',
        body: `<p>As empresas que mais beneficiaram destas tendências noutros mercados passaram por fases parecidas. Veja onde está a sua:</p>`,
        widget: {
          type: 'checklist',
          title: 'Maturidade das vendas pelo WhatsApp',
          items: [
            'Usa o WhatsApp Business (não o WhatsApp pessoal) para falar com clientes.',
            'Tem catálogo de produtos ou serviços atualizado no WhatsApp.',
            'Aceita pagamentos por M-Pesa, e-Mola ou mKesh numa conta da empresa.',
            'Responde a mensagens fora do horário de expediente no próprio dia.',
            'Regista os clientes e as conversas num sistema, e não só no telemóvel.',
            'Sabe quanto tempo demora, em média, a responder a um cliente novo.',
            'Volta a contactar clientes antigos com ofertas ou lembretes.',
          ],
          results: [
            { min: 0, title: 'Fase de arranque', body: 'O primeiro passo é separar o WhatsApp da empresa do pessoal e montar um catálogo. É gratuito e muda logo a imagem da empresa.' },
            { min: 3, title: 'Fase de organização', body: 'A base existe. O passo seguinte é registar os clientes num sistema e responder mais depressa, que é onde um agente simples começa a fazer diferença.' },
            { min: 5, title: 'Pronta para automatizar', body: 'Tem os processos no sítio. Um agente ligado ao CRM e aos pagamentos pode multiplicar o que a equipa já faz bem.' },
            { min: 7, title: 'À frente do mercado', body: 'Está onde as empresas mais avançadas do Brasil e da Índia estavam há poucos anos. O desafio agora é medir e afinar.' },
          ],
        },
      },
      {
        heading: 'Para onde vamos',
        body: `<p>O padrão que se repete nos três países é simples: primeiro os clientes passam a usar o telemóvel para tudo, depois os pagamentos ficam instantâneos, e por fim o atendimento tem de acompanhar essa velocidade. Moçambique já fez as duas primeiras partes. A terceira é a que está em aberto, e é também a que mais depende das empresas e menos dos operadores ou do Estado.</p>
<p>Na SONGHAI acompanhamos estes mercados de perto e trazemos para cá o que faz sentido, adaptado a meticais, às nossas carteiras móveis e às nossas línguas. Partilhamos o que aprendemos no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> e no <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a> da SONGHAI.</p>
<p>Se quiser perceber em que ponto está a sua empresa e qual seria o passo seguinte, o <a href="/diagnostico">diagnóstico gratuito de 30 minutos</a> é o melhor sítio para começar.</p>`,
      },
    ],
    quote:
      'Os clientes moçambicanos já pagam pelo telemóvel e já falam com as empresas pelo WhatsApp. Falta que as empresas respondam ao mesmo ritmo.',
    callout: {
      title: 'Para levar daqui',
      body: 'Não é preciso adotar todas as tendências ao mesmo tempo. Escolha a que resolve o problema que mais lhe custa hoje, seja responder tarde, confirmar pagamentos ou perder clientes antigos, e comece por aí.',
    },
  },
}
