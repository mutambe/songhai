import type { BlogPost } from '@/lib/blog'
import { AUTHOR, REVISED_AT } from './shared'

export const agenciasGlobais: BlogPost = {
  slug: 'agencias-globais-mocambique-falham',
  title: 'Porquê agências globais não entendem Moçambique',
  excerpt:
    'Língua, infraestrutura, preços em dólares e suporte noutro fuso: onde os projetos de IA de agências internacionais costumam tropeçar em Moçambique, e quando uma agência global é mesmo a melhor escolha.',
  category: 'Guias',
  tags: ['mercado local', 'agências', 'moçambique'],
  status: 'published',
  publishedAt: '2026-07-17T00:00:00.000Z',
  updatedAt: REVISED_AT,
  readingTime: '9 min',
  author: AUTHOR,
  gradient: 'from-[#1b3a4b] via-[#122733] to-[#c89b3c]',
  coverImage: '/blog-covers/agencias-globais-1280.webp',
  icon: 'map-pin',
  content: {
    lead:
      'Ouvimos a mesma história várias vezes. Uma empresa contrata uma agência internacional, paga em dólares, e meses depois o projeto está parado: o agente responde num português que soa estranho aos clientes, a ligação aos sistemas locais não avança e o suporte demora dias. Não é falta de competência dessas agências. É que foram feitas para outros mercados.',
    sections: [
      {
        heading: 'A língua não é só "português"',
        body: `<p>Uma agência que "fala português" costuma configurar os agentes em português do Brasil ou num português genérico. Para um cliente em Maputo, a diferença nota-se logo: "celular" em vez de telemóvel, "você" a cada frase, "time" em vez de equipa, "contato" em vez de contacto. Parece pouco, mas um agente que soa estrangeiro gera desconfiança, e a confiança é tudo numa conversa de venda.</p>
<p>Há também o que não está em nenhum dicionário: os nomes dos bairros, as abreviaturas que os clientes usam no WhatsApp, a mistura com palavras de línguas nacionais, a forma de tratar um cliente mais velho. Um agente configurado em Moçambique, com conversas reais de clientes moçambicanos, aprende isto. Um agente configurado à distância, não.</p>`,
      },
      {
        heading: 'A infraestrutura local é diferente',
        body: `<p>Muitas PME moçambicanas gerem o negócio com folhas de Excel, programas de faturação locais ou sistemas antigos que ninguém quer substituir. A internet cai, a energia falha, e o WhatsApp é o sistema de comunicação principal.</p>
<p>Uma agência habituada a ligar ferramentas internacionais de última geração tende a pedir que a empresa mude primeiro os seus sistemas. O projeto fica dependente de uma migração que ninguém tinha orçamentado.</p>
<p>A abordagem que funciona é a contrária: trabalhar com o que a empresa já tem. Se o stock está numa folha de Excel, o agente lê a folha. Se o programa de faturação não tem API, procura-se outra forma de trocar os dados. A perfeição técnica pode esperar; o cliente que escreve hoje no WhatsApp não.</p>`,
      },
      {
        heading: 'Preço em dólares, não em meticais',
        body: `<p>Um orçamento em dólares parece razoável até ser convertido. Somam-se as variações do câmbio, as comissões das transferências internacionais e, muitas vezes, licenças de software cobradas por utilizador, também em dólares. Para uma PME, o total pode ultrapassar o orçamento anual de tecnologia antes de o projeto arrancar.</p>
<p>Preços definidos em meticais desde o início, com o setup e a mensalidade separados, permitem planear. É por isso que os nossos estão publicados em <a href="/precos">songhai.cc/precos</a>, sem precisar de pedir orçamento.</p>`,
      },
      {
        heading: 'Suporte fora de horas e fora de português',
        body: `<p>"Suporte 24/7" numa agência global significa muitas vezes uma equipa noutro continente, num fuso diferente, a responder em inglês. Um problema reportado às 9h em Maputo pode ter resposta só ao fim do dia, e a conversa pode exigir três trocas de email para explicar o contexto.</p>
<p>Uma equipa local responde no mesmo fuso, em português, e pode ir ver o problema ao local quando é preciso. Na SONGHAI o suporte está em Maputo, com tempos de resposta escritos em cada plano.</p>`,
      },
      {
        heading: 'Global ou local: uma comparação honesta',
        body: `<p>Seria pouco sério dizer que uma agência local é sempre a melhor escolha. Há casos em que não é. Marque o que pesa mais no seu projeto:</p>`,
        widget: {
          type: 'pros-cons',
          question: 'Para o seu projeto, faz mais sentido uma agência local?',
          pros: [
            { title: 'Português de Moçambique', detail: 'Agentes configurados com a forma como os seus clientes realmente escrevem.' },
            { title: 'Preços em meticais', detail: 'Sem surpresas de câmbio nem comissões de transferências internacionais.' },
            { title: 'Mesmo fuso e presença física', detail: 'Suporte em horário de Maputo e possibilidade de reuniões presenciais.' },
            { title: 'Conhece os sistemas locais', detail: 'M-Pesa, e-Mola, programas de faturação locais, Excel, NUIT.' },
            { title: 'Projetos à escala de uma PME', detail: 'Começar pequeno, com um piloto de um mês, em vez de um projeto de muitos meses.' },
          ],
          cons: [
            { title: 'Equipas mais pequenas', detail: 'Uma agência local tem menos pessoas do que uma multinacional.' },
            { title: 'Projetos multinacionais', detail: 'Se a sua empresa opera em vários países ao mesmo tempo, uma agência global pode coordenar melhor.' },
            { title: 'Ferramentas proprietárias', detail: 'Algumas agências globais têm plataformas próprias muito maduras para setores específicos.' },
            { title: 'Exigências de grupo', detail: 'Filiais de grupos internacionais às vezes têm de usar os fornecedores escolhidos pela sede.' },
          ],
        },
      },
      {
        heading: 'Como avaliar qualquer agência',
        body: `<p>Seja local ou global, peça sempre:</p>
<ul>
<li><strong>Uma demonstração com as suas mensagens reais</strong>, e não com um exemplo preparado.</li>
<li><strong>Preços por escrito em meticais</strong>, com o que está e o que não está incluído.</li>
<li><strong>Quem responde quando algo falha</strong>, em que língua e em quanto tempo.</li>
<li><strong>Um piloto curto</strong> antes de um contrato longo.</li>
<li><strong>Referências de empresas moçambicanas</strong> com quem possa falar.</li>
</ul>
<p>Se quiser pôr a SONGHAI à prova com estas mesmas perguntas, comece pelo <a href="/diagnostico">diagnóstico gratuito de 30 minutos</a>. Partilhamos o nosso trabalho com empresas moçambicanas no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> e no <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a>.</p>`,
      },
    ],
    quote: 'As agências globais não são más. Simplesmente não foram feitas para Moçambique.',
    callout: {
      title: 'O que observamos',
      body: 'Os projetos que encontramos parados raramente falharam por causa da tecnologia. Falharam porque a solução foi desenhada para outro mercado e nunca chegou a ser adaptada ao português, aos sistemas e ao orçamento de uma empresa moçambicana.',
    },
  },
}
