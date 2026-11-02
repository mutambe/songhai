import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { Statements } from '@/components/sections/statements'
import { Conversation } from '@/components/sections/conversation'
import { Solutions } from '@/components/sections/solutions'
import { Sectors } from '@/components/sections/sectors'
import { Method } from '@/components/sections/method'
import { BeforeAfter } from '@/components/sections/before-after'
import { PricingTeaser } from '@/components/sections/pricing-teaser'
import { Clients } from '@/components/sections/clients'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Statements />
        <Conversation />
        <Solutions />
        <Sectors />
        <Method />
        <BeforeAfter />
        <PricingTeaser />
        <Clients />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
