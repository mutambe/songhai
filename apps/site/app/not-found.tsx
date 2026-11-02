import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PillButton } from '@/components/pill-button'

export const metadata: Metadata = {
  title: 'Página não encontrada | SONGHAI',
  robots: { index: false },
}

// Link antigo ou mal escrito: diz o que aconteceu e devolve a pessoa ao caminho.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[var(--field-indigo)] text-white">
        <section className="mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-center px-5 py-20 lg:px-8">
          <h1 className="poster text-[clamp(2.6rem,8vw,8rem)]">
            <span className="block">Esta página</span>
            <span className="block text-[var(--field-gold)]">não existe.</span>
          </h1>
          <p className="mt-8 max-w-[44ch] text-xl leading-snug sm:text-2xl">
            O link pode estar antigo ou mal escrito. Volte ao início, ou fale
            connosco directamente.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PillButton href="/" variant="gold">
              Voltar ao início
              <ArrowRight className="h-4 w-4" />
            </PillButton>
            <PillButton href="/diagnostico" variant="paper">
              Diagnóstico grátis
            </PillButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
