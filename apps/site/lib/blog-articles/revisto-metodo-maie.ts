import type { BlogPost } from '@/lib/blog'
import { AUTHOR, REVISED_AT } from './shared'

export const metodoMaie: BlogPost = {
  slug: 'metodo-maie-implementar-ia-negocio',
  title: 'Método MAIE: como implementamos IA sem quebrar o seu negócio',
  excerpt:
    'Mapear, Automatizar, Integrar, Escalar. As quatro fases com que pomos um agente de IA a funcionar, o que acontece em cada semana, o que pedimos à sua equipa e como se controla o risco.',
  category: 'Casos de uso',
  tags: ['método', 'implementação', 'agentes de ia'],
  status: 'published',
  publishedAt: '2026-07-16T00:00:00.000Z',
  updatedAt: REVISED_AT,
  readingTime: '10 min',
  author: AUTHOR,
  gradient: 'from-[#2f6e62] via-[#122733] to-[#1b3a4b]',
  coverImage: '/blog-covers/metodo-maie-1280.webp',
  icon: 'route',
  content: {
    lead:
      '"E se isto estragar o que já está a funcionar?" É o receio mais comum de quem pensa em pôr IA no atendimento, e é um receio razoável. O WhatsApp da empresa é muitas vezes o principal canal de vendas, e ninguém quer arriscá-lo. O Método MAIE existe para isso: quatro fases, cada uma validada antes de passar à seguinte, com a operação real protegida até ao fim.',
    sections: [
      {
        heading: 'A ideia por trás do método',
        body: `<p>Projetos de tecnologia costumam correr mal pelos mesmos motivos: mudar tudo de uma vez, descobrir os problemas só quando os clientes já estão a usar o sistema, e deixar a equipa de fora até ao último dia.</p>
<p>O MAIE inverte isto em três princípios:</p>
<ul>
<li><strong>Nada muda para os clientes</strong> enquanto o agente não estiver testado com conversas reais.</li>
<li><strong>A passagem é gradual</strong>, com uma parte pequena das conversas primeiro.</li>
<li><strong>A equipa participa desde a primeira semana</strong>, porque é ela que conhece as respostas certas e quem vai acompanhar o agente depois.</li>
</ul>`,
      },
      {
        heading: 'As quatro fases, semana a semana',
        body: `<p>Os prazos abaixo são os de um projeto com integrações (CRM, agenda, faturação). Um agente simples, só com WhatsApp, fica pronto em 5 a 7 dias úteis, juntando as primeiras fases.</p>`,
        widget: {
          type: 'tabs',
          title: 'Método MAIE',
          tabs: [
            {
              label: 'M · Mapear',
              body: `<p><strong>Semana 1.</strong> Conversamos com a gerência e com quem atende os clientes para perceber onde vai o tempo e que ferramentas já existem.</p>
<p><strong>O que fazemos:</strong> lemos uma amostra de conversas reais do WhatsApp, identificamos as perguntas que mais se repetem e onde se perdem clientes.</p>
<p><strong>O que pedimos à sua equipa:</strong> uma ou duas conversas de 30 minutos e acesso a exemplos de mensagens.</p>
<p><strong>O que recebe:</strong> um relatório com os processos identificados, as oportunidades por ordem de impacto e uma estimativa de horas e dinheiro recuperáveis.</p>
<p><strong>Risco para a operação:</strong> nenhum. Nada muda nesta fase. Está incluída no diagnóstico gratuito.</p>`,
            },
            {
              label: 'A · Automatizar',
              body: `<p><strong>Semanas 2 e 3.</strong> Construímos o agente à medida do negócio.</p>
<p><strong>O que fazemos:</strong> escrevemos a base de conhecimento, definimos o tom, as regras de passagem para pessoas e as automações à volta do agente. Tudo num ambiente de testes, separado do número real.</p>
<p><strong>O que pedimos à sua equipa:</strong> tabela de preços, regras de entrega e pagamento, e alguém para testar o agente com perguntas difíceis.</p>
<p><strong>O que recebe:</strong> um agente a funcionar num número de testes, que pode experimentar à vontade.</p>
<p><strong>Risco para a operação:</strong> nenhum. Os clientes continuam a falar com a equipa como sempre.</p>`,
            },
            {
              label: 'I · Integrar',
              body: `<p><strong>Semanas 3 e 4.</strong> Ligamos o agente ao número real e aos sistemas da empresa.</p>
<p><strong>O que fazemos:</strong> ligação ao WhatsApp, à agenda, ao CRM e, se for o caso, aos pagamentos e à faturação. O agente começa por uma parte das conversas (por exemplo, só fora de horas) antes de passar para todas.</p>
<p><strong>O que pedimos à sua equipa:</strong> rever diariamente as conversas do agente durante estas semanas e apontar o que corrigir.</p>
<p><strong>O que recebe:</strong> o agente em produção, com uma rede de segurança: tudo o que ele não sabe passa para a equipa.</p>
<p><strong>Risco para a operação:</strong> baixo e controlado, porque a passagem é gradual e reversível.</p>`,
            },
            {
              label: 'E · Escalar',
              body: `<p><strong>Da semana 5 em diante.</strong> Acompanhamos os números e alargamos o que funciona.</p>
<p><strong>O que fazemos:</strong> medimos o tempo de primeira resposta, a parte das conversas resolvidas sem a equipa e as vendas fora de horas. Fazemos os ajustes mensais do plano e, quando faz sentido, levamos o agente a novos processos (pós-venda, cobranças, marcações).</p>
<p><strong>O que pedimos à sua equipa:</strong> meia hora por semana para rever conversas e manter os preços atualizados.</p>
<p><strong>O que recebe:</strong> relatórios regulares e, no plano Avançado, uma reunião mensal de otimização.</p>`,
            },
          ],
        },
      },
      {
        heading: 'Como o risco é controlado',
        body: `<ul>
<li><strong>Ambiente de testes separado.</strong> Até à fase de integração, o agente não toca no número real.</li>
<li><strong>Passagem gradual.</strong> Primeiro uma fatia das conversas, depois todas.</li>
<li><strong>Rede de segurança.</strong> O agente passa à equipa qualquer conversa que não saiba tratar, e qualquer cliente que peça uma pessoa.</li>
<li><strong>Reversível.</strong> Se algo correr mal, desligar o agente devolve o WhatsApp ao funcionamento normal em minutos.</li>
<li><strong>Piloto de um mês</strong>, com cancelamento sem penalidade se os resultados não convencerem.</li>
</ul>`,
      },
      {
        heading: 'O que a sua empresa precisa de ter',
        body: `<p>O método funciona melhor quando algumas coisas já estão no sítio. Veja em que ponto está:</p>`,
        widget: {
          type: 'checklist',
          title: 'A sua empresa está pronta para começar o MAIE?',
          items: [
            'Há uma pessoa que pode ser o responsável interno pelo projeto.',
            'Os preços dos produtos ou serviços estão escritos num só sítio.',
            'Sabe quais são as 10 perguntas que os clientes mais fazem.',
            'O WhatsApp da empresa é um número da empresa, e não o telemóvel pessoal de alguém.',
            'A equipa pode dedicar meia hora por dia ao projeto durante duas semanas.',
          ],
          results: [
            { min: 0, title: 'Comece pela organização', body: 'Antes de qualquer agente, vale a pena separar o número da empresa e juntar preços e perguntas frequentes num documento. A fase Mapear ajuda a fazer isso.' },
            { min: 3, title: 'Pronta, com ajustes', body: 'Os pontos em falta resolvem-se durante a primeira semana do método.' },
            { min: 5, title: 'Pronta para arrancar', body: 'Tem tudo o que é preciso. Num projeto simples, o agente pode estar a responder em pouco mais de uma semana.' },
          ],
        },
      },
      {
        heading: 'Começar pela fase Mapear',
        body: `<p>A primeira fase está incluída no <a href="/diagnostico">diagnóstico gratuito de 30 minutos</a>: sai de lá com uma ideia clara do que automatizar primeiro e do que pode esperar. Os planos e prazos estão em <a href="/precos">songhai.cc/precos</a>.</p>
<p>No <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a> e no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> da SONGHAI mostramos bastidores destas fases, com exemplos do que encontramos no terreno.</p>`,
      },
    ],
    quote: 'Nenhum cliente da empresa deve dar pela mudança antes de ela estar testada.',
    callout: {
      title: 'Porque o método reduz o risco',
      body: 'Cada fase só avança quando a anterior está validada, e até à integração a operação real não é tocada. Os primeiros resultados aparecem no primeiro mês, sem apostar o canal de vendas principal numa só mudança.',
    },
  },
}
