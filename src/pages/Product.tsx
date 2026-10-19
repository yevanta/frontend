import { Flow, Modules, ProductHero } from '../components/product/HeroFlowModules'
import { Architecture, BeforeAfter, Technology, Tour } from '../components/product/TourCompare'
import { FinalCta, Governance, Plans, ProductFaq, UseCases } from '../components/product/Closing'
import { Deferred } from '../components/ui/Deferred'

/** /product: leads the visitor to the dashboard. Sections below the hero render after first paint. */
export default function Product() {
  return (
    <>
      <ProductHero />
      <Deferred>
        <Flow />
        <Modules />
        <Tour />
        <BeforeAfter />
        <Technology />
        <Architecture />
        <Governance />
        <UseCases />
        <Plans />
        <ProductFaq />
        <FinalCta />
      </Deferred>
    </>
  )
}
