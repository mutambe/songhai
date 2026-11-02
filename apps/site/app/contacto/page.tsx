import { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { MapPin, Clock, MessageCircle } from 'lucide-react'
import { BUSINESS, OPENING_HOURS } from '@/lib/business'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContactForm } from '@/components/contact-form'
import { Reveal } from '@/components/motion/reveal'
import { PillButton } from '@/components/pill-button'

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
            <div className="space-y-6">
              <h1 className="poster max-w-[20ch] text-[clamp(1.75rem,4.8vw,5rem)]">
                Vamos conversar sobre IA
              </h1>
              <p className="max-w-[52ch] text-pretty text-xl leading-snug text-foreground">
                Preencha o formulário abaixo e entraremos em contacto num prazo de
                24 horas para discutir como podemos ajudar a sua empresa a economizar
                tempo com automação de IA.
              </p>
              <div className="pt-2">
                <PillButton href="#formulario" variant="gold">
                  Ir para o formulário
                </PillButton>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="px-5 pb-12 lg:px-8">
          <Reveal className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            <div className="bg-foreground/[0.05] p-5">
              <MapPin className="h-5 w-5 text-teal" aria-hidden="true" />
              <p className="mt-3 text-base font-semibold text-foreground">Morada</p>
              <address className="mt-1 text-base not-italic leading-relaxed text-ink-soft">
                {BUSINESS.streetAddress}
                <br />
                {BUSINESS.locality}, {BUSINESS.country}
              </address>
            </div>
            <div className="bg-foreground/[0.05] p-5">
              <Clock className="h-5 w-5 text-teal" aria-hidden="true" />
              <p className="mt-3 text-base font-semibold text-foreground">Horário</p>
              <ul className="mt-1 text-base leading-relaxed text-ink-soft">
                {OPENING_HOURS.map((h) => (
                  <li key={h.label}>
                    {h.label}: {h.display}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-foreground/[0.05] p-5">
              <MessageCircle className="h-5 w-5 text-teal" aria-hidden="true" />
              <p className="mt-3 text-base font-semibold text-foreground">Contactos</p>
              <ul className="mt-1 text-base leading-relaxed text-ink-soft">
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

        <section id="formulario" className="scroll-mt-20 px-5 pb-24 lg:px-8">
          <Reveal className="mx-auto max-w-2xl">
            <ContactForm />
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
