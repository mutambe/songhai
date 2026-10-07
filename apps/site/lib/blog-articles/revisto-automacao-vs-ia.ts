import type { BlogPost } from '@/lib/blog'
import { AUTHOR, REVISED_AT } from './shared'

export const automacaoVsIa: BlogPost = {
  slug: 'automacao-vs-ia-qual-usar-quando',
  title: 'Automação vs. IA: qual usar quando? Guia prático para Moçambique',
  excerpt:
    'Automação e IA resolvem problemas diferentes e custam valores diferentes. Um guia com exemplos de empresas moçambicanas e um teste para classificar as suas tarefas.',
  category: 'Guias',
  tags: ['automação', 'agentes de ia', 'guia'],
  status: 'published',
  publishedAt: '2026-07-19T00:00:00.000Z',
  updatedAt: REVISED_AT,
  readingTime: '9 min',
  author: AUTHOR,
  gradient: 'from-[#c89b3c] via-[#1b3a4b] to-[#122733]',
  coverImage: '/blog-covers/automacao-vs-ia-1280.webp',
  icon: 'git-compare',
  content: {
    lead:
      'Muitas empresas chegam até nós a pedir "IA" quando o que precisam é de uma automação simples, e algumas pedem uma automação quando o problema só se resolve com IA. A diferença importa porque mexe no preço, no tempo de implementação e no tipo de erros que vão aparecer. Este guia ajuda a separar as duas coisas antes de gastar dinheiro.',
    sections: [
      {
        heading: 'O que é automação',
        body: `<p>Automação é um conjunto de regras fixas que executa tarefas repetitivas. Funciona sempre no formato <strong>"quando acontece isto, faz aquilo"</strong>:</p>
<ul>
<li>Quando chega um formulário do site, copia os dados para a folha de clientes.</li>
<li>Quando uma fatura passa 30 dias sem pagamento, envia um lembrete.</li>
<li>Quando um pedido é marcado como pago, avisa o armazém.</li>
</ul>
<p>Não há interpretação. Se a regra diz "assunto contém <em>orçamento</em>" e o cliente escreve "cotação", a regra não dispara. É exatamente por isso que a automação é previsível, barata e rápida de montar: faz sempre a mesma coisa, da mesma forma.</p>`,
      },
      {
        heading: 'O que é IA',
        body: `<p>Um agente de IA lê linguagem escrita por pessoas, percebe a intenção e decide o que fazer com base no contexto. O cliente escreve "boa tarde, vcs tem tinta branca de 20 litros? é pra amanhã", e o agente percebe que se trata de uma pergunta de stock, de um produto concreto e com urgência.</p>
<p>A IA trata bem o que a automação não consegue:</p>
<ul>
<li>Frases escritas de muitas maneiras diferentes, com erros e abreviaturas.</li>
<li>Perguntas que misturam vários assuntos na mesma mensagem.</li>
<li>Casos que não estavam previstos, onde é preciso decidir se responde ou passa a uma pessoa.</li>
</ul>
<p>Em troca, custa mais, exige uma base de conhecimento bem escrita e pode errar de formas menos previsíveis. Por isso precisa de revisão regular, sobretudo nas primeiras semanas.</p>`,
      },
      {
        heading: 'Comparação lado a lado',
        body: `<div class="overflow-x-auto"><table>
<thead><tr><th>Critério</th><th>Automação</th><th>Agente de IA</th></tr></thead>
<tbody>
<tr><td>Como se configura</td><td>Regras do tipo "se isto, então aquilo"</td><td>Base de conhecimento, instruções e regras de passagem para pessoas</td></tr>
<tr><td>Tempo típico de implementação</td><td>Poucos dias</td><td>5 a 7 dias úteis para um agente simples; 2 a 4 semanas com integrações</td></tr>
<tr><td>Entende linguagem natural</td><td>Não</td><td>Sim</td></tr>
<tr><td>Lida com exceções</td><td>Não, só faz o que está na regra</td><td>Sim, ou reconhece que deve passar a uma pessoa</td></tr>
<tr><td>Tipo de erro</td><td>Previsível: a regra não dispara</td><td>Menos previsível: interpreta mal uma mensagem</td></tr>
<tr><td>Manutenção</td><td>Só quando o processo muda</td><td>Revisão regular das conversas e atualização da informação</td></tr>
<tr><td>Melhor para</td><td>Mover dados entre sistemas, lembretes, avisos internos</td><td>Conversar com clientes, qualificar pedidos, decidir o passo seguinte</td></tr>
</tbody></table></div>`,
      },
      {
        heading: 'Exemplos de empresas moçambicanas',
        body: `<p>Os casos abaixo são ilustrativos, mas são situações que encontramos com frequência:</p>`,
        widget: {
          type: 'tabs',
          title: 'Que ferramenta para cada tarefa?',
          tabs: [
            {
              label: 'Só automação',
              body: `<ul>
<li><strong>Escola privada:</strong> enviar o lembrete da propina a todos os encarregados no dia 25 de cada mês. A mensagem é sempre a mesma; só muda o nome e o valor.</li>
<li><strong>Distribuidora:</strong> copiar cada encomenda confirmada da folha de vendas para a folha do armazém.</li>
<li><strong>Consultora:</strong> criar uma pasta para cada cliente novo, com o nome e a data.</li>
</ul>
<p>Nenhuma destas tarefas exige interpretar o que alguém escreveu. Uma automação faz o trabalho por uma fração do custo.</p>`,
            },
            {
              label: 'Precisa de IA',
              body: `<ul>
<li><strong>Loja de eletrodomésticos:</strong> responder no WhatsApp a perguntas sobre modelos, preços, garantia e entrega, escritas de mil maneiras diferentes.</li>
<li><strong>Imobiliária:</strong> perceber, a partir de uma conversa, se o interessado quer comprar ou arrendar, em que bairro e com que orçamento, antes de passar ao agente imobiliário.</li>
<li><strong>Clínica:</strong> marcar e remarcar consultas por conversa, com o paciente a sugerir horários em texto livre ("pode ser quinta de manhã?").</li>
</ul>`,
            },
            {
              label: 'As duas juntas',
              body: `<p>Na maioria dos negócios, a melhor solução combina as duas:</p>
<ol>
<li>O agente de IA conversa com o cliente e percebe o pedido.</li>
<li>Quando o pedido fica confirmado, uma automação regista-o no sistema, avisa o armazém e agenda a entrega.</li>
<li>Outra automação envia a confirmação e, mais tarde, o aviso de entrega.</li>
</ol>
<p>A IA trata da parte em que é preciso entender pessoas. A automação trata da parte em que é preciso fazer sempre a mesma coisa sem falhar.</p>`,
            },
          ],
        },
      },
      {
        heading: 'Como decidir: classifique a sua tarefa',
        body: `<p>Pense numa tarefa concreta que gostaria de tirar das mãos da equipa e responda às perguntas abaixo. Quanto mais respostas "sim", mais a tarefa precisa de IA.</p>`,
        widget: {
          type: 'checklist',
          title: 'Automação ou IA para esta tarefa?',
          items: [
            'A tarefa começa com uma mensagem escrita por um cliente ou fornecedor.',
            'A mesma pergunta chega escrita de muitas formas diferentes.',
            'É preciso perceber a intenção da pessoa, e não só copiar dados.',
            'Às vezes a resposta certa depende do contexto (bairro, quantidade, urgência).',
            'Há casos imprevistos que hoje alguém resolve "a olho".',
          ],
          results: [
            { min: 0, title: 'Automação chega', body: 'A tarefa é previsível. Uma automação simples resolve-a com menos custo e menos manutenção do que um agente de IA.' },
            { min: 2, title: 'Combinação das duas', body: 'Há uma parte de interpretação e uma parte repetitiva. O mais eficiente costuma ser um agente na entrada e automações a seguir.' },
            { min: 4, title: 'Precisa de IA', body: 'A tarefa vive de linguagem e de contexto. Uma automação de regras fixas vai falhar muitas vezes; um agente de IA é a ferramenta certa.' },
          ],
        },
      },
      {
        heading: 'Erros comuns a evitar',
        body: `<ul>
<li><strong>Usar IA para mover dados.</strong> Pagar um agente para copiar linhas de uma folha para outra é gastar mais pelo mesmo resultado, e com mais risco de erro.</li>
<li><strong>Usar menus rígidos para conversar com clientes.</strong> O "digite 1, 2 ou 3" irrita quem só queria saber um preço, e muitos desistem a meio.</li>
<li><strong>Automatizar um processo desorganizado.</strong> Se hoje ninguém sabe ao certo qual é o preço de entrega para cada bairro, nenhuma ferramenta vai acertar. Primeiro organiza-se, depois automatiza-se.</li>
<li><strong>Esquecer quem mantém.</strong> Tanto as regras como a base de conhecimento precisam de um responsável na empresa.</li>
</ul>
<p>Se tiver dúvidas sobre uma tarefa concreta, o <a href="/diagnostico">diagnóstico gratuito de 30 minutos</a> serve exatamente para isto: olhamos para o processo e dizemos se é caso de automação, de IA ou das duas. Partilhamos mais exemplos destes no <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a> e no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> da SONGHAI.</p>`,
      },
    ],
    quote:
      'A automação faz sempre a mesma coisa sem falhar. A IA percebe o que as pessoas querem dizer. A maior parte dos negócios precisa das duas, cada uma no seu lugar.',
    callout: {
      title: 'Regra prática',
      body: 'Se a tarefa segue sempre os mesmos passos, comece por automação. Só avance para IA quando for preciso interpretar o que alguém escreveu ou lidar com exceções.',
    },
  },
}
