import type { BlogPost } from '@/lib/blog'
import { AUTHOR, REVISED_AT } from './shared'

export const clinicas: BlogPost = {
  slug: '5-tarefas-clinicas-perdem-tempo-ia',
  title: '5 tarefas em que as clínicas de Maputo perdem tempo, e que um agente de IA resolve',
  excerpt:
    'Confirmações, perguntas repetidas, marcações, faltas e relatórios: onde vai o tempo da receção de uma clínica, como um agente ajuda em cada tarefa e os cuidados com dados de saúde.',
  category: 'Casos de uso',
  tags: ['clínicas', 'saúde', 'marcações'],
  status: 'published',
  publishedAt: '2026-07-15T00:00:00.000Z',
  updatedAt: REVISED_AT,
  readingTime: '10 min',
  author: AUTHOR,
  gradient: 'from-[#c89b3c] via-[#2f6e62] to-[#122733]',
  coverImage: '/blog-covers/clinicas-1280.webp',
  icon: 'stethoscope',
  content: {
    lead:
      'Numa clínica, a receção é o ponto por onde tudo passa: marcações, confirmações, dúvidas sobre preços e seguros, remarcações, pacientes à espera ao balcão. Boa parte deste trabalho é repetitivo e acontece pelo WhatsApp e pelo telefone. As cinco tarefas abaixo são as que mais tempo consomem nas clínicas com que falamos, e são também as que um agente de IA trata melhor.',
    sections: [
      {
        heading: 'Antes de começar: de onde vêm os números',
        body: `<p>As horas indicadas em cada tarefa são <strong>estimativas ilustrativas</strong> para uma clínica com duas ou três salas e movimento médio. Não são resultados de um caso específico. Cada clínica é diferente, e a melhor forma de saber os seus números é contar durante uma semana: quantas mensagens, quantas chamadas, quanto tempo cada uma leva.</p>`,
      },
      {
        heading: '1. Confirmação de consultas',
        body: `<p><strong>Estimativa: 15 a 20 horas por mês.</strong></p>
<p>A clínica confirma as consultas na véspera, normalmente por telefone. Muitas chamadas não são atendidas, outras exigem segunda tentativa, e o email quase ninguém lê. Resultado: horários vazios que podiam ter sido dados a outro paciente.</p>
<p><strong>Com um agente:</strong> a confirmação é enviada pelo WhatsApp, onde os pacientes já estão. O paciente responde "sim", "não" ou "posso mudar para sexta?", e o agente atualiza a agenda ou propõe novos horários. A receção só vê as exceções.</p>`,
      },
      {
        heading: '2. Perguntas repetidas',
        body: `<p><strong>Estimativa: 20 a 30 horas por mês.</strong></p>
<p>"Qual é o horário?", "Aceitam o seguro X?", "Quanto custa a consulta de pediatria?", "Preciso de ir em jejum para as análises?". As mesmas perguntas, dezenas de vezes por semana, muitas vezes enquanto há pacientes ao balcão.</p>
<p><strong>Com um agente:</strong> responde em segundos, a qualquer hora, com a informação que a clínica definiu: horários, especialidades, preços, seguros aceites, preparação para exames. Perguntas clínicas ("este sintoma é grave?") são sempre passadas a um profissional, nunca respondidas pelo agente.</p>`,
      },
      {
        heading: '3. Marcações e remarcações',
        body: `<p><strong>Estimativa: 25 a 35 horas por mês.</strong></p>
<p>Marcar uma consulta envolve várias mensagens: o paciente diz quando pode, alguém verifica a agenda, propõe horários, confirma, envia a confirmação. Uma remarcação repete o processo. Quando a confirmação não chega, o paciente nem sabe que ficou marcado.</p>
<p><strong>Com um agente:</strong> ligado à agenda da clínica, o agente vê as vagas reais e marca na conversa, mesmo quando o paciente escreve em texto livre ("de preferência quinta de manhã"). A agenda fica atualizada no momento, sem marcações duplicadas.</p>`,
      },
      {
        heading: '4. Seguimento de faltas',
        body: `<p><strong>Estimativa: 10 a 15 horas por mês.</strong></p>
<p>Quando um paciente falta, raramente alguém tem tempo de ligar a saber porquê. Muitas vezes o paciente acaba por ir a outra clínica.</p>
<p><strong>Com um agente:</strong> no próprio dia, o paciente recebe uma mensagem cordial a perguntar se está tudo bem e a propor uma nova data. Muitos remarcam logo ali.</p>`,
      },
      {
        heading: '5. Relatórios do dia e do mês',
        body: `<p><strong>Estimativa: 8 a 12 horas por mês.</strong></p>
<p>Quantos pacientes vieram, quantas faltas houve, que especialidades tiveram mais procura. Juntar estes números à mão, de vários sistemas, consome horas no fim de cada mês.</p>
<p><strong>Com automação:</strong> esta tarefa é mais de automação do que de IA. Os dados das marcações e confirmações já estão registados, e o relatório é gerado sozinho, pronto ao início da manhã.</p>`,
      },
      {
        heading: 'Quanto disto acontece na sua clínica?',
        body: `<p>Responda pensando numa semana normal:</p>`,
        widget: {
          type: 'checklist',
          title: 'Onde vai o tempo da sua receção?',
          items: [
            'As consultas são confirmadas por chamada ou mensagem escrita à mão.',
            'Responde às mesmas perguntas sobre preços, horários e seguros várias vezes por dia.',
            'As marcações pelo WhatsApp são copiadas à mão para a agenda.',
            'Há faltas sem aviso todas as semanas.',
            'Ninguém contacta os pacientes que faltaram.',
            'Os números do mês são juntados à mão.',
          ],
          results: [
            { min: 0, title: 'Receção bem organizada', body: 'A sua clínica já tem os processos principais resolvidos. Um agente traria um ganho pequeno.' },
            { min: 2, title: 'Há tempo a recuperar', body: 'Duas ou três destas tarefas já justificam olhar para um agente simples, sobretudo para confirmações e perguntas repetidas.' },
            { min: 4, title: 'A receção está sobrecarregada', body: 'É o perfil típico em que um agente se paga depressa. Comece pelas confirmações e marcações, que são as que mais horas libertam.' },
          ],
        },
      },
      {
        heading: 'Os cuidados com dados de saúde',
        body: `<p>Uma clínica não é uma loja. Antes de pôr um agente a falar com pacientes, há regras que não podem falhar:</p>
<ul>
<li><strong>O agente não dá conselhos clínicos.</strong> Marca, confirma, informa sobre horários e preços. Tudo o que é clínico vai para um profissional.</li>
<li><strong>Acesso mínimo.</strong> O agente acede à agenda, não ao processo clínico do paciente.</li>
<li><strong>Dados protegidos.</strong> As conversas são guardadas com acesso restrito, segundo as regras moçambicanas de proteção de dados, e não são usadas para treinar modelos de IA.</li>
<li><strong>Transparência.</strong> O paciente deve saber que está a falar com um assistente automático e poder pedir uma pessoa a qualquer momento.</li>
</ul>`,
        widget: {
          type: 'pros-cons',
          question: 'Um agente no WhatsApp da sua clínica: mais ganhos ou mais riscos?',
          pros: [
            { title: 'Menos faltas', detail: 'Confirmações e lembretes automáticos libertam horários a tempo de os dar a outros pacientes.' },
            { title: 'Receção mais disponível', detail: 'Quem está ao balcão atende quem está à frente, em vez do telemóvel.' },
            { title: 'Marcações a qualquer hora', detail: 'Os pacientes marcam à noite e ao fim de semana, quando têm tempo.' },
            { title: 'Pacientes recuperados', detail: 'Quem falta é contactado no próprio dia, com proposta de nova data.' },
          ],
          cons: [
            { title: 'Dados sensíveis', detail: 'Exigem regras de acesso apertadas e um fornecedor de confiança.' },
            { title: 'Pacientes mais velhos', detail: 'Alguns preferem o telefone. O agente deve conviver com o atendimento por chamada.' },
            { title: 'Agenda tem de estar certa', detail: 'Se os horários dos médicos não estiverem atualizados, o agente marca mal.' },
            { title: 'Limites claros', detail: 'É preciso definir bem o que o agente nunca responde, para não haver conselhos clínicos indevidos.' },
          ],
        },
      },
      {
        heading: 'Por onde começar',
        body: `<p>Para a maioria das clínicas, o plano Simples chega para começar: confirmações, perguntas frequentes e marcações ligadas ao Google Calendar. Quando faz sentido ligar a um sistema de gestão ou a um CRM, sobe-se para o Médio. Os valores estão em <a href="/precos">songhai.cc/precos</a>, e a página <a href="/setores/servicos">empresas de serviços</a> tem mais detalhe sobre clínicas, escritórios e centros de formação.</p>
<p>O <a href="/diagnostico">diagnóstico gratuito de 30 minutos</a> é o melhor primeiro passo. Publicamos dicas para clínicas e outros serviços no <a href="https://www.instagram.com/songhai_lda/" target="_blank">Instagram</a> e no <a href="https://www.linkedin.com/in/songhai-lda/" target="_blank">LinkedIn</a> da SONGHAI.</p>`,
      },
    ],
    quote: 'Se a sua receção recuperasse estas horas todos os meses, o que faria com elas?',
    callout: {
      title: 'Somando as cinco tarefas',
      body: 'Nas estimativas acima, as cinco tarefas somam entre 78 e 112 horas por mês, perto de uma pessoa a tempo inteiro. São valores ilustrativos: conte os da sua clínica durante uma semana antes de decidir.',
    },
  },
}
