import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { MapPin, Clock, MessageCircle } from 'lucide-react'
import { BUSINESS, OPENING_HOURS } from '@/lib/business'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContactForm } from '@/components/contact-form'
import { Reveal } from '@/components/motion/reveal'

const TITLE = 'Contactar — Agência de IA em Maputo'
const DESCRIPTION =
  'Entre em contacto com a SONGHAI, agência de IA e automação em Maputo, Moçambique, para um diagnóstico gratuito. Resposta garantida em 24 horas.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contacto',
})

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-5 py-20 lg:px-8">
          <Reveal hero className="mx-auto max-w-4xl">
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

        <section className="px-5 pb-12 lg:px-8">
          <Reveal className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-5">
              <MapPin className="h-5 w-5 text-teal" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-foreground">Morada</p>
              <address className="mt-1 text-sm not-italic leading-relaxed text-ink-soft">
                {BUSINESS.streetAddress}
                <br />
                {BUSINESS.locality}, {BUSINESS.country}
              </address>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-5">
              <Clock className="h-5 w-5 text-teal" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-foreground">Horário</p>
              <ul className="mt-1 text-sm leading-relaxed text-ink-soft">
                {OPENING_HOURS.map((h) => (
                  <li key={h.label}>
                    {h.label}: {h.display}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-5">
              <MessageCircle className="h-5 w-5 text-teal" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-foreground">Contactos</p>
              <ul className="mt-1 text-sm leading-relaxed text-ink-soft">
                <li>
                  <a
                    href="https://wa.me/258848986002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    WhatsApp: {BUSINESS.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BUSINESS.email}`} className="transition-colors hover:text-foreground">
                    {BUSINESS.email}
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="px-5 pb-24 lg:px-8">
          <Reveal className="mx-auto max-w-2xl">
            <ContactForm />
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
