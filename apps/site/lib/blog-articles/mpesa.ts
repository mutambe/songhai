import type { BlogPost } from '@/lib/blog'
import { formatMZN, getPlan } from '@/lib/plans'
import { AUTHOR } from './shared'

const A = getPlan('avancado')

export const mpesa: BlogPost = {
  slug: 'vender-pelo-whatsapp-e-receber-por-m-pesa',
  title: 'Vender pelo WhatsApp e receber por M-Pesa: como funciona um agente que trata da encomenda ao pagamento',
  excerpt:
    'Do "mande o comprovativo" à confirmação automática: o fluxo completo de uma venda com agente de IA e carteira móvel, o que é preciso ter, os riscos e as regras de segurança.',
  category: 'Casos de uso',
  tags: ['m-pesa', 'pagamentos', 'whatsapp'],
  status: 'published',
  publishedAt: '2026-09-10T07:00:00.000Z',
  readingTime: '10 min',
  author: AUTHOR,
  gradient: 'from-[#2f6e62] via-[#122733] to-[#c89b3c]',
  coverImage: '/blog-covers/mpesa-1280.webp',
  icon: 'smartphone',
  content: {
    lead:
      'Em Moçambique, vender pelo WhatsApp e receber por carteira móvel já é a forma normal de fazer negócio para milhares de lojas, produtores e prestadores de serviços. O que quase ninguém automatizou ainda é o meio: confirmar o pagamento, atualizar a encomenda e avisar quem entrega. É aí que se perde mais tempo, e onde acontecem mais erros.',
    sections: [
      {
        heading: 'O fluxo que todos conhecem',
        body: `<p>Quem vende pelo WhatsApp conhece este guião de cor:</p>
<ol>
<li>O cliente pergunta o preço e a disponibilidade.</li>
<li>Alguém responde, às vezes horas depois.</li>
<li>O cliente decide e pergunta "para onde mando?".</li>
<li>A empresa envia o número M-Pesa.</li>
<li>O cliente paga e manda a captura de ecrã do comprovativo.</li>
<li>Alguém abre as mensagens da carteira, procura o pagamento, confere o valor e o nome.</li>
<li>Confirma ao cliente, anota a encomenda num caderno ou no Excel e avisa o estafeta.</li>
</ol>
<p>Sete passos, quase todos manuais. Os problemas aparecem nos sítios previsíveis: capturas de ecrã editadas, pagamentos com o valor errado, encomendas pagas que ficam esquecidas porque a mensagem desceu na lista, e uma pessoa da equipa presa ao telemóvel o dia inteiro para conferir pagamentos.</p>`,
      },
      {
        heading: 'Como fica com um agente',
        body: `<p>Com um agente de IA ligado ao WhatsApp e ao sistema de pagamentos, o mesmo guião fica assim:</p>
<ol>
<li><strong>Pedido.</strong> O cliente escreve o que quer, como escreveria a uma pessoa. O agente confirma produto, quantidade, preço e disponibilidade.</li>
<li><strong>Total.</strong> O agente calcula o valor com a entrega, conforme o bairro, e mostra o resumo.</li>
<li><strong>Pagamento.</strong> O cliente recebe o pedido de pagamento. Com uma conta comercial ligada à API da operadora, o pedido aparece diretamente no telemóvel do cliente e ele só confirma com o PIN. Sem essa ligação, o agente gera uma referência única para aquela encomenda.</li>
<li><strong>Confirmação.</strong> A confirmação do pagamento chega ao sistema pela operadora, não por captura de ecrã. O agente só dá a encomenda como paga quando o dinheiro entrou.</li>
<li><strong>Seguimento.</strong> A encomenda muda de estado, a equipa de entrega é avisada e o cliente recebe a confirmação, e mais tarde o aviso de que a entrega saiu.</li>
</ol>
<p>A equipa deixa de conferir pagamentos um a um. Passa a tratar só das exceções: pagamentos a mais, a menos, reembolsos e clientes com dúvidas.</p>`,
      },
      {
        heading: 'M-Pesa, e-Mola e mKesh',
        body: `<p>As três carteiras móveis do país funcionam de forma parecida para o cliente, mas não para a integração:</p>
<ul>
<li><strong>M-Pesa</strong>, da Vodacom, é a mais usada e a que tem a integração para empresas mais madura. É por onde começa a maior parte dos projetos.</li>
<li><strong>e-Mola</strong>, da Movitel, e <strong>mKesh</strong>, da Tmcel, também podem ser ligadas. As condições dependem do acordo comercial que a empresa tem com cada operadora.</li>
</ul>
<p>Na prática, recomendamos começar com a carteira onde está a maioria dos seus clientes, medir durante um mês e só depois juntar as outras. Transferência bancária e pagamento na entrega podem continuar a existir em paralelo, tratados pela equipa.</p>`,
      },
      {
        heading: 'O que é preciso ter antes',
        body: `<ul>
<li><strong>Uma conta comercial na carteira móvel</strong>, em nome da empresa. Um número pessoal não serve para integração e mistura as contas da empresa com as suas.</li>
<li><strong>Lista de produtos com preços</strong>, mesmo que seja uma folha de Excel. É a partir dela que o agente responde.</li>
<li><strong>Regras de entrega</strong>: bairros servidos, custo por zona, prazos, dias sem entregas.</li>
<li><strong>Política de cancelamentos e reembolsos</strong>, escrita. O agente precisa de saber o que pode prometer.</li>
<li><strong>Alguém responsável pelas exceções</strong>, com nome e horário. É para essa pessoa que o agente passa os casos que não deve resolver sozinho.</li>
</ul>`,
      },
      {
        heading: 'Vantagens e riscos, lado a lado',
        body: `<p>Automatizar pagamentos mexe com dinheiro e com confiança. Vale a pena pesar bem os dois lados, com a realidade do seu negócio à frente:</p>`,
        widget: {
          type: 'pros-cons',
          question: 'Receber pagamentos pelo agente compensa no seu caso?',
          pros: [
            { title: 'Fim dos comprovativos falsos', detail: 'A confirmação vem da operadora. Uma captura de ecrã editada deixa de valer.' },
            { title: 'Vende enquanto a loja está fechada', detail: 'Pedido, pagamento e confirmação acontecem às 23h sem ninguém acordado.' },
            { title: 'Menos erros de valor', detail: 'O total é calculado pelo sistema, com a entrega incluída, sempre da mesma forma.' },
            { title: 'Encomendas que não se perdem', detail: 'Cada pedido tem um estado: por pagar, pago, em entrega, entregue.' },
            { title: 'Uma pessoa a menos presa ao telemóvel', detail: 'Conferir pagamentos deixa de ser o trabalho de alguém a tempo inteiro.' },
          ],
          cons: [
            { title: 'Custo mais alto', detail: `O processamento de pagamentos está no plano Avançado (a partir de ${formatMZN(A.monthly)}/mês) ou como extra nos outros planos.` },
            { title: 'Depende da operadora', detail: 'É preciso conta comercial e aceitar as taxas e regras da carteira móvel.' },
            { title: 'Quando a rede falha', detail: 'Se a operadora ou a internet falharem, tem de existir um plano B combinado com a equipa.' },
            { title: 'Reembolsos continuam manuais', detail: 'Devolver dinheiro é uma decisão que deve passar sempre por uma pessoa.' },
            { title: 'Clientes desconfiados', detail: 'Alguns hesitam em pagar numa conversa automática. É preciso explicar bem e ter um contacto humano visível.' },
          ],
        },
      },
      {
        heading: 'Segurança: as regras que não se negociam',
        body: `<ul>
<li><strong>O agente nunca pede o PIN.</strong> O PIN só é escrito no ecrã de confirmação da própria carteira, no telemóvel do cliente. Diga isto aos seus clientes, por escrito, no perfil do WhatsApp.</li>
<li><strong>Os dados de pagamento ficam no sistema, não na conversa.</strong> A conversa mostra o estado da encomenda, não números de conta.</li>
<li><strong>Acessos com nome.</strong> Cada pessoa da equipa tem o seu acesso, e fica registado quem fez o quê.</li>
<li><strong>Proteção de dados.</strong> Nomes, números e moradas dos clientes são tratados segundo as regras moçambicanas de proteção de dados e de transações eletrónicas, e não são usados para treinar modelos de IA.</li>
</ul>`,
      },
      {
        heading: 'Está pronto?',
        body: `<p>Antes de falar connosco, faça este teste. Se tiver quatro ou mais respostas "sim", o projeto avança depressa.</p>`,
        widget: {
          type: 'checklist',
          title: 'Está pronto para receber pagamentos através do agente?',
          items: [
            'Já recebe a maioria dos pagamentos por carteira móvel.',
            'Tem, ou pode abrir, uma conta comercial em nome da empresa.',
            'Tem a lista de produtos e preços escrita num só sítio.',
            'Sabe quanto custa a entrega para cada bairro ou zona.',
            'Tem uma política de cancelamentos e reembolsos, mesmo que simples.',
            'Há uma pessoa definida para tratar das exceções.',
          ],
          results: [
            { min: 0, title: 'Comece pelo básico', body: 'Antes de automatizar pagamentos, vale a pena organizar a conta comercial e a lista de preços. Um agente simples, só para pedidos, pode ser um bom primeiro passo.' },
            { min: 3, title: 'Quase lá', body: 'Faltam um ou dois pontos. São resolvidos durante a preparação do projeto, normalmente em poucos dias.' },
            { min: 5, title: 'Pronto para avançar', body: 'Tem tudo o que é preciso. A implementação com pagamentos leva tipicamente duas a quatro semanas, incluindo testes com pagamentos reais de baixo valor.' },
          ],
        },
      },
      {
        heading: 'Por onde começar',
        body: `<p>No plano Avançado, o processamento de pagamentos por M-Pesa e outras carteiras já está incluído, com confirmação automática, referências e atualização das encomendas em tempo real. Nos planos Simples e Médio, pode ser acrescentado à parte.</p>
<p>O primeiro passo é o <a href="/diagnostico">diagnóstico gratuito de 30 minutos</a>, onde olhamos para o seu fluxo atual de vendas e pagamentos e dizemos o que faz sentido automatizar primeiro. Os preços estão em <a href="/precos">songhai.cc/precos</a>.</p>
<p>No <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a> da SONGHAI mostramos como estas conversas ficam no telemóvel do cliente, passo a passo.</p>`,
      },
    ],
    quote:
      'O comprovativo em captura de ecrã foi uma solução de recurso. Com a confirmação a vir da operadora, deixa de ser preciso confiar numa imagem.',
    callout: {
      title: 'Diga aos seus clientes',
      body: 'Ponha no perfil do WhatsApp da empresa: "Nunca pedimos o seu PIN. O pagamento é sempre confirmado no ecrã da sua carteira." Uma frase destas evita muitas burlas em seu nome.',
    },
  },
}
