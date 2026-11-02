import { Reveal } from '@/components/motion/reveal'

// A ordem lê-se pela cor: do tom mais escuro ao mais claro do mesmo azul.
const STEPS = [
  {
    letter: 'M',
    title: 'Mapear',
    desc: 'Auditamos os seus processos e identificamos onde a IA gera mais impacto.',
    tone: 'bg-[#1e2158] text-white',
  },
  {
    letter: 'A',
    title: 'Automatizar',
    desc: 'Desenhamos e construímos os agentes e automações à medida do seu negócio.',
    tone: 'bg-[#3b3f9a] text-white',
  },
  {
    letter: 'I',
    title: 'Integrar',
    desc: 'Ligamos tudo — WhatsApp, e-mail, CRM e bases de dados — num só fluxo.',
    tone: 'bg-[#9c9fdc] text-[#1e2158]',
  },
  {
    letter: 'E',
    title: 'Escalar',
    desc: 'Monitorizamos, ajustamos e expandimos as soluções à medida que a empresa cresce.',
    tone: 'bg-[#d8d9f3] text-[#1e2158]',
  },
]

export function Method() {
  return (
    <section id="metodo" className="scroll-mt-16">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 pb-12 pt-16 lg:grid-cols-12 lg:px-8 lg:pb-14 lg:pt-24">
        <Reveal className="lg:col-span-6">
          <h2 className="poster text-[clamp(2.2rem,4.6vw,5rem)]">
            Do problema ao resultado
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-xl leading-snug">
            Não entregamos e desaparecemos: trabalhamos com a sua equipa, nos
            seus processos reais, e medimos o resultado em horas recuperadas.
            Usamos os melhores modelos de IA (OpenAI, Claude, Gemini) e
            ligamos ao WhatsApp, ao M-Pesa e às ferramentas que já usa.
          </p>
        </Reveal>
      </div>

      <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step.letter} className={`${step.tone} flex flex-col gap-10 px-5 py-8 lg:min-h-[22rem] lg:px-8 lg:py-10`}>
            <div className="flex items-start justify-between">
              <span className="poster text-[clamp(4rem,7vw,7.5rem)] leading-none">{step.letter}</span>
              <span className="text-base font-bold opacity-80">0{i + 1}</span>
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-black leading-tight sm:text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-[34ch] text-lg leading-snug">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
