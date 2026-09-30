import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { Stats } from '@/components/sections/stats'
import { Problem } from '@/components/sections/problem'
import { Solutions } from '@/components/sections/solutions'
import { Tools } from '@/components/sections/tools'
import { Method } from '@/components/sections/method'
import { Calculator } from '@/components/sections/calculator'
import { PricingTeaser } from '@/components/sections/pricing-teaser'
import { Sectors } from '@/components/sections/sectors'
import { Clients } from '@/components/sections/clients'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Solutions />
        <Tools />
        <Sectors />
        <Method />
        <Calculator />
        <PricingTeaser />
        <Clients />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
