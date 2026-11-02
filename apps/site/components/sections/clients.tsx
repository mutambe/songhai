import Image from 'next/image'
import { Reveal } from '@/components/motion/reveal'

export function Clients() {
  return (
    <section className="grid lg:grid-cols-2">
      <figure className="relative min-h-[22rem] lg:min-h-[34rem]">
        <Image
          src="/clients/sites-escritorio.webp"
          alt="Mulher de blazer bege a assinar documentos numa mesa de madeira, ao lado de uma mala de couro"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </figure>

      <div className="bg-[var(--field-sand)] px-5 py-16 text-[#1e2158] lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="poster text-[clamp(2.2rem,5.4vw,6rem)]">
            Sites que já desenhámos
          </h2>
          <p className="mt-6 max-w-[40ch] text-xl leading-snug">
            Antes dos agentes de IA, a Songhai desenhou e construiu os sites
            de empresas de Moçambique. Estes são dois deles.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          <li>
            <a
              href="https://www.izebgroup.co.mz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-32 items-center justify-center gap-3 bg-[#f7f4ee] p-6 transition-transform duration-300 hover:-translate-y-1"
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
                <span className="mt-1.5 block text-sm font-medium tracking-[0.12em] text-[#8a6410]">
                  Investment Group
                </span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://www.zeliobanze.co.mz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-32 items-center justify-center bg-[#f7f4ee] p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src="/clients/zelio-banze-logo.svg"
                alt="Zélio Banze — Advogados"
                width={320}
                height={150}
                className="h-full w-auto object-contain"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
