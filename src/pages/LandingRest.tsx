import { HowItWorks } from '../components/landing/HowItWorks'
import { Features } from '../components/landing/Features'
import { DemoStrip, Highlights } from '../components/landing/DemoHighlights'
import { About } from '../components/landing/About'
import { Contact, Faq, Pricing } from '../components/landing/PricingFaqContact'
import { Deferred } from '../components/ui/Deferred'

/** Below-the-fold landing sections: their own chunk, mounted one by one after the first paint. */
export default function LandingRest({ query }: { query: string }) {
  return (
    <Deferred>
      <HowItWorks />
      <Features query={query} />
      <DemoStrip />
      <Highlights />
      <About />
      <Pricing />
      <Faq />
      <Contact />
    </Deferred>
  )
}
