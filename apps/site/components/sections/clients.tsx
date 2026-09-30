'use client'

import Image from 'next/image'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'

export function Clients() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-teal">
            Quem já trabalhou connosco
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Empresas que já confiaram na Songhai
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
            Antes dos agentes de IA, já desenhámos e construímos sites e
            aplicações para empresas moçambicanas.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RevealItem>
            <a
              href="https://www.izebgroup.co.mz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-32 items-center justify-center gap-3 rounded-2xl border border-line bg-[#f7f4ee] p-8 transition-colors hover:border-gold/60"
            >
              <Image
                src="/clients/izeb-mark.png"
                alt=""
                width={240}
                height={286}
                className="h-16 w-auto object-contain"
              />
              <span className="leading-none">
                <span className="block text-2xl font-medium tracking-[0.24em] text-[#0c2e1c]">
                  IZEB
                </span>
                <span className="mt-1.5 block text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[#c8952e]">
                  Investment Group
                </span>
              </span>
            </a>
          </RevealItem>

          <RevealItem>
            <a
              href="https://www.zeliobanze.co.mz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-32 items-center justify-center rounded-2xl border border-line bg-[#f7f4ee] p-5 transition-colors hover:border-gold/60"
            >
              <Image
                src="/clients/zelio-banze-logo.svg"
                alt="Zélio Banze — Advogados"
                width={320}
                height={150}
                className="h-full w-auto object-contain"
              />
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
