import { lazy, Suspense, useState } from 'react'
import { ui } from '../content'
import { Hero } from '../components/landing/Hero'
import { QuickSearch, TrustStrip } from '../components/landing/TrustSearch'

const LandingRest = lazy(() => import('./LandingRest'))

export default function Landing() {
  // shared between Quick Search and the Features bento (live filtering)
  const [query, setQuery] = useState('')

  return (
    <>
      <Hero />
      <TrustStrip />
      <QuickSearch query={query} setQuery={setQuery} />
      <Suspense fallback={<div className="label grid min-h-svh place-items-center subtle" role="status">{ui.loading}</div>}>
        <LandingRest query={query} />
      </Suspense>
    </>
  )
}
