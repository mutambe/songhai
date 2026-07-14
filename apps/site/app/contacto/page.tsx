import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Contactar SONGHAI | Agência de IA em Moçambique',
  description:
    'Entre em contacto connosco para um diagnóstico gratuito de automação de IA. Resposta garantida em 24 horas.',
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
