import type { BlogPost } from '@/lib/blog'
import { AUTHOR } from './shared'

export const songhaiCrm: BlogPost = {
  slug: 'songhaicrm-crm-para-vender-pelo-whatsapp-em-mocambique',
  title: 'SonghaiCRM: o CRM para quem vende pelo WhatsApp em Moçambique',
  excerpt:
    'Conversas, funil de vendas e agentes de IA no mesmo sítio, em meticais, no fuso de Maputo e com os dados no servidor da sua empresa. O que tem, para quem é e quais os limites.',
  category: 'Automação',
  tags: ['songhaicrm', 'crm', 'whatsapp', 'vendas'],
  status: 'published',
  publishedAt: '2026-08-27T07:00:00.000Z',
  readingTime: '11 min',
  author: AUTHOR,
  gradient: 'from-[#122733] via-[#1b3a4b] to-[#2f6e62]',
  coverImage: '/blog-covers/songhaicrm-1280.webp',
  icon: 'layout-dashboard',
  content: {
    lead:
      'A maior parte das empresas moçambicanas que vende pelo WhatsApp gere os clientes em três sítios ao mesmo tempo: o telemóvel de quem atende, um caderno ou folha de Excel, e a memória da equipa. Funciona até o negócio crescer, até alguém sair da empresa com o telemóvel, ou até dois vendedores responderem ao mesmo cliente com preços diferentes. O SonghaiCRM existe para juntar tudo isto num só lugar.',
    sections: [
      {
        heading: 'Porque mais um CRM',
        body: `<p>Há muitos CRMs no mercado. A maioria foi pensada para outro contexto:</p>
<ul>
<li><strong>Feitos à volta do email</strong>, com o WhatsApp como módulo extra, muitas vezes pago à parte.</li>
<li><strong>Cobrados em dólares, por utilizador</strong>, o que torna caro dar acesso a toda a equipa.</li>
<li><strong>Em inglês ou em português do Brasil</strong>, com CPF, reais e fusos que não são os nossos.</li>
<li><strong>Com os dados em servidores no estrangeiro</strong>, fora do controlo da empresa.</li>
</ul>
<p>O SonghaiCRM parte do contrário: o WhatsApp é o canal principal, os agentes de IA trabalham dentro do próprio CRM, e o sistema fala como se fala em Moçambique, conta em meticais e corre no servidor da empresa.</p>`,
      },
      {
        heading: 'O que tem lá dentro',
        body: `<p>O sistema está organizado em cinco áreas. Escolha uma para ver o que inclui:</p>`,
        widget: {
          type: 'tabs',
          title: 'As áreas do SonghaiCRM',
          tabs: [
            {
              label: 'Atendimento',
              body: `<ul>
<li><strong>Caixa de conversas</strong> com todas as conversas do WhatsApp da empresa. A equipa e o agente de IA trabalham lado a lado, e vê-se sempre quem está a responder.</li>
<li><strong>Radar</strong> das conversas que arrefeceram: clientes que ficaram sem resposta e que ainda podem ser recuperados.</li>
<li><strong>Respostas rápidas</strong> partilhadas por toda a equipa, para as mensagens que se repetem.</li>
<li><strong>Distribuição automática</strong> das conversas pela equipa, por rotação ou pelo assunto da mensagem.</li>
</ul>`,
            },
            {
              label: 'Funil de vendas',
              body: `<ul>
<li><strong>Quadro Kanban</strong> com cada negócio na sua etapa: novo contacto, proposta, negociação, ganho, perdido.</li>
<li><strong>Vocabulário do seu negócio.</strong> Numa clínica, o cliente chama-se paciente e "ganho" passa a "agendado". Numa loja, "pago". Cada funil fala a língua da equipa que o usa.</li>
<li><strong>Motivos de perda</strong> registados, para perceber porque é que os negócios não fecham.</li>
<li><strong>Ficha de contacto</strong> com todo o histórico de conversas, notas e negócios.</li>
</ul>`,
            },
            {
              label: 'Agentes de IA',
              body: `<ul>
<li><strong>Agentes que atendem, qualificam e movem o negócio no funil</strong>, com uma base de conhecimento própria de cada empresa.</li>
<li><strong>Follow-ups automáticos</strong> que retomam conversas paradas no momento certo, conforme a etapa do funil.</li>
<li><strong>Passagem para uma pessoa</strong> quando é preciso, com registo de quando e porquê.</li>
<li><strong>Evolução da IA:</strong> uma página que mostra onde o agente acerta, onde erra e o que falta ensinar-lhe. As melhorias sugeridas pela própria IA só entram depois de aprovadas por alguém da equipa.</li>
<li><strong>Limite de gasto</strong> com IA por organização, para a fatura do mês nunca ser uma surpresa.</li>
</ul>`,
            },
            {
              label: 'Automações',
              body: `<ul>
<li><strong>Regras QUANDO / SE / ENTÃO.</strong> Por exemplo: quando chega uma mensagem com a palavra "orçamento", se o cliente for novo, então atribuir ao vendedor de turno e marcar como prioridade.</li>
<li><strong>Entrada de contactos</strong> a partir de formulários do site, páginas de campanha ou outras ferramentas, diretamente para a etapa certa do funil.</li>
<li><strong>Avisos para outros sistemas</strong> quando alguma coisa acontece no CRM.</li>
<li>Todas as automações nascem desligadas, até alguém as rever e ligar.</li>
</ul>`,
            },
            {
              label: 'Gestão',
              body: `<ul>
<li><strong>Desempenho</strong> do funil e de cada pessoa da equipa.</li>
<li><strong>Registo de auditoria</strong> de tudo o que acontece no sistema.</li>
<li><strong>Papéis e permissões</strong>: cada pessoa vê apenas o que deve ver.</li>
<li><strong>Segurança</strong> com verificação em dois passos opcional, códigos de recuperação e controlo de sessões abertas.</li>
</ul>`,
            },
          ],
        },
      },
      {
        heading: 'Feito para Moçambique, nos detalhes',
        body: `<p>É nos pormenores que se nota se um sistema foi feito para o nosso mercado ou apenas traduzido:</p>
<ul>
<li><strong>Metical</strong> como moeda, com os valores escritos como se escrevem cá.</li>
<li><strong>Fuso horário de Maputo</strong> (UTC+2) em marcações, lembretes e relatórios.</li>
<li><strong>Números +258</strong> validados como números moçambicanos.</li>
<li><strong>NUIT</strong> nos dados das empresas clientes.</li>
<li><strong>Feriados de Moçambique</strong> nas contas de dias úteis e prazos.</li>
<li><strong>Português de Moçambique</strong> em todo o sistema: contacto, ecrã, equipa, palavra-passe.</li>
<li><strong>Horário de envio</strong> entre as 6h e as 23h, para as mensagens automáticas não chegarem a meio da noite.</li>
<li><strong>Regras moçambicanas de proteção de dados</strong> aplicadas por defeito.</li>
</ul>`,
      },
      {
        heading: 'Os seus dados ficam consigo',
        body: `<p>O SonghaiCRM assenta em código aberto e corre num servidor da própria empresa, ou num servidor que a SONGHAI gere em seu nome. Isto tem consequências práticas:</p>
<ul>
<li><strong>Os dados não ficam presos a um fornecedor.</strong> Se um dia quiser mudar de sistema, os dados são seus.</li>
<li><strong>Não há preço por utilizador.</strong> Dar acesso a mais uma pessoa da equipa não aumenta a fatura do software.</li>
<li><strong>Cada empresa está isolada</strong> das outras ao nível da base de dados, e esse isolamento é testado automaticamente a cada atualização.</li>
<li><strong>Atualizações com um clique</strong>, a partir do próprio sistema.</li>
</ul>`,
      },
      {
        heading: 'Vantagens e limites',
        body: `<p>Nenhum sistema serve a toda a gente. Marque o que pesa para a sua empresa:</p>`,
        widget: {
          type: 'pros-cons',
          question: 'O SonghaiCRM é a escolha certa para a sua equipa?',
          pros: [
            { title: 'WhatsApp e IA no centro', detail: 'Não é um extra: o sistema foi desenhado à volta das conversas e dos agentes.' },
            { title: 'Sem custo por utilizador', detail: 'Toda a equipa pode ter acesso sem multiplicar a fatura.' },
            { title: 'Dados no seu servidor', detail: 'Controlo total sobre a informação dos seus clientes.' },
            { title: 'Adaptado a Moçambique', detail: 'Metical, fuso de Maputo, +258, NUIT, feriados e português de cá.' },
            { title: 'Nada morre no silêncio', detail: 'Radar e follow-ups recuperam clientes que ficaram sem resposta.' },
          ],
          cons: [
            { title: 'Precisa de um servidor', detail: 'Tem de existir um servidor e alguém que o mantenha, seja a sua equipa ou a SONGHAI.' },
            { title: 'Curva de aprendizagem', detail: 'A equipa precisa de algumas sessões para tirar partido do funil e das automações.' },
            { title: 'IA tem custo de uso', detail: 'Cada conversa do agente consome créditos do modelo de IA, com limite configurável.' },
            { title: 'Ligação por QR code tem riscos', detail: 'É a forma mais rápida de começar, mas a Meta pode bloquear números usados para envios em massa. O canal oficial é mais seguro e tem custo por mensagem.' },
            { title: 'Integrações locais caso a caso', detail: 'Ligar a um programa de faturação ou ERP local exige avaliação própria.' },
          ],
        },
      },
      {
        heading: 'Para quem é',
        body: `<p>O SonghaiCRM faz mais sentido para empresas onde:</p>
<ul>
<li>Mais do que uma pessoa responde ao WhatsApp da empresa.</li>
<li>Os clientes precisam de seguimento ao longo de dias ou semanas (orçamentos, propostas, marcações).</li>
<li>Já se perderam clientes por falta de resposta ou por esquecimento.</li>
<li>Há interesse em pôr um agente de IA a trabalhar, mas com controlo sobre o que ele faz.</li>
</ul>
<p>Comércio e distribuição, clínicas, imobiliárias, escolas e centros de formação, prestadores de serviços e agências são os casos mais comuns. Para quem tem um só número e uma só pessoa a responder, o WhatsApp Business com um agente simples costuma chegar.</p>`,
      },
      {
        heading: 'Como começar',
        body: `<p>Começa com uma conversa. No <a href="/diagnostico">diagnóstico gratuito</a> olhamos para a forma como a sua equipa trabalha hoje e mostramos o sistema com os seus próprios casos. Se fizer sentido, tratamos da instalação, da ligação ao WhatsApp, da passagem dos contactos que já tem e da formação da equipa.</p>
<p>O SonghaiCRM também pode ser o CRM ligado ao agente de IA nos planos Médio e Avançado, que estão descritos em <a href="/precos">songhai.cc/precos</a>.</p>
<p>Vamos publicar demonstrações curtas de cada área do sistema no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> e no <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a> da SONGHAI. Siga-nos para as ver primeiro.</p>`,
      },
    ],
    quote:
      'Um cliente não devia depender do telemóvel de quem o atendeu da primeira vez. A história dele pertence à empresa.',
    callout: {
      title: 'Pergunta para a sua equipa',
      body: 'Se a pessoa que mais atende no WhatsApp faltasse amanhã, alguém saberia em que ponto está cada cliente? Se a resposta for "não", é por aqui que vale a pena começar.',
    },
  },
}
