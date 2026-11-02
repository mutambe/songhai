import Image from 'next/image'
import Link from 'next/link'
import { NavLink } from '@/components/nav-link'
import { Logo } from '@/components/logo'
import { SocialIcon } from '@/components/social-icon'
import { SOCIAL_PROFILES } from '@/lib/social'
import { BUSINESS, OPENING_HOURS } from '@/lib/business'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3002'

const MENU = [
  { label: 'Soluções', href: '/#solucoes' },
  { label: 'Sectores', href: '/#sectores' },
  { label: 'Preços', href: '/precos' },
  { label: 'Método', href: '/#metodo' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contactar', href: '/contacto' },
]

export function SiteFooter() {
  return (
    <footer className="grid bg-[var(--field-night)] text-white lg:min-h-[100svh] lg:grid-cols-2">
      <div className="relative min-h-[50svh] lg:min-h-full">
        <Image
          src="/blog-covers/agencias-globais-1600.webp"
          alt="Aperto de mão entre dois profissionais, um de camisa azul e outro de camisa branca, a fechar um negócio"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_50%]"
        />
      </div>

      <div className="flex flex-col justify-between gap-14 px-5 py-10 lg:px-12 lg:py-12">
        <div>
          <Logo className="text-white" />
          <p className="mt-4 max-w-[34ch] text-lg leading-snug">
            Poupe tempo. Automatize processos. Cresça mais rápido.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="space-y-4 lg:space-y-5">
            {MENU.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="block text-[clamp(2rem,3.2vw,3.4rem)] font-black leading-none tracking-normal text-white transition-transform duration-300 hover:translate-x-3"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <div className="grid gap-8 text-base leading-relaxed sm:grid-cols-2">
            <div>
              <p className="text-lg font-bold">Contacto</p>
              <address className="mt-2 not-italic">
                {BUSINESS.streetAddress}
                <br />
                {BUSINESS.locality}, {BUSINESS.country}
              </address>
              <p className="mt-2">
                {OPENING_HOURS.map((h) => (
                  <span key={h.label} className="block">
                    {h.label}: {h.display}
                  </span>
                ))}
              </p>
              <p className="mt-2">
                <a
                  href="https://wa.me/258848986002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  WhatsApp +258 84 898 6002
                </a>
                <br />
                <a href="mailto:info@songhai.cc" className="underline underline-offset-4">
                  info@songhai.cc
                </a>
              </p>
            </div>

            <div>
              <p className="text-lg font-bold">Redes sociais</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SOCIAL_PROFILES.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`SONGHAI no ${s.name}`}
                      className="flex h-11 w-11 items-center justify-center bg-white/10 text-white transition-colors hover:bg-[var(--field-gold)] hover:text-[#1e2158]"
                    >
                      <SocialIcon network={s.name} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                <Link href="/privacidade" className="underline underline-offset-4">
                  Política de Privacidade
                </Link>
                <br />
                <a href={PORTAL_URL} className="underline underline-offset-4">
                  Entrar no Portal
                </a>
              </p>
            </div>
          </div>

          <p className="mt-10 text-sm leading-relaxed text-white/80">
            © {new Date().getFullYear()} {BUSINESS.legalName}. Todos os direitos reservados.
            Desenvolvido pela Songhai.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            Fotografias via Unsplash: Cytonn Photography, Iwaria Inc., Adeolu Eletu e
            National Cancer Institute.
          </p>
        </div>
      </div>
    </footer>
  )
}
