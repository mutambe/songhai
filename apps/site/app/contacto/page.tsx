import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Contactar — Agência de IA em Maputo',
  description:
    'Entre em contacto com a SONGHAI, agência de IA e automação em Maputo, Moçambique, para um diagnóstico gratuito. Resposta garantida em 24 horas.',
  alternates: { canonical: '/contacto' },
}

export default function ContactPage() {
  return (
    <main>
      <section className="px-5 py-20 lg:px-8">
        <Reveal className="mx-auto max-w-4xl">
          <div className="space-y-3 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-teal">
              Contactar
            </p>
            <h1 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
              Vamos conversar sobre a sua estratégia de IA
            </h1>
            <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-ink-soft">
              Preencha o formulário abaixo e entraremos em contacto num prazo de
              24 horas para discutir como podemos ajudar a sua empresa a economizar
              tempo com automação de IA.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="px-5 pb-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl">
          <ContactForm />
        </Reveal>
      </section>
    </main>
  )
}
