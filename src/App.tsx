import { useEffect } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { legal, seo, ui, type SeoEntry } from './content'
import { PrefsProvider } from './lib/prefs'
import { SmoothScroll } from './lib/scroll'
import { Backdrop } from './components/layout/Backdrop'
import { CommandPalette } from './components/layout/CommandPalette'
import { CookieBanner } from './components/layout/CookieBanner'
import { Cursor } from './components/layout/Cursor'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { IntroProvider } from './components/layout/Intro'
import { PageTransition } from './components/layout/PageTransition'
import Landing from './pages/Landing'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import { ProductPage } from './pages/routes'
import { Suspense } from 'react'

function Page({ seo: page, children }: { seo: SeoEntry; children: React.ReactNode }) {
  // this page's own path (inside <Routes>, so it stays correct while the page animates out)
  const { pathname } = useLocation()
  return (
    <PageTransition page={page}>
      <main id="main" tabIndex={-1} data-path={pathname} className="outline-none">{children}</main>
      <Footer />
    </PageTransition>
  )
}

function Shell() {
  const location = useLocation()

  // the app restores scroll itself (after route transitions and lazy sections); stop the browser jumping first
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  return (
    <>
      <a href="#main" className="label fixed left-4 top-3 z-[130] -translate-y-20 rounded-full bg-fg px-4 py-2 text-bg transition focus:translate-y-0">
        {ui.skipToContent}
      </a>
      <Backdrop />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page seo={seo.pages.home}><Landing /></Page>} />
          <Route
            path="/product"
            element={
              <Page seo={seo.pages.product}>
                <Suspense fallback={<div className="grid min-h-svh place-items-center label" role="status">{ui.loading}</div>}>
                  <ProductPage />
                </Suspense>
              </Page>
            }
          />
          {(['privacy', 'terms', 'cookies'] as const).map((k) => (
            <Route key={k} path={legal.pages[k].path} element={<Page seo={seo.pages[k]}><Legal which={k} /></Page>} />
          ))}
          <Route path="*" element={<Page seo={seo.pages.notFound}><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <CookieBanner />
      <CommandPalette />
      <Cursor />
    </>
  )
}

export default function App() {
  return (
    <PrefsProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <SmoothScroll>
            <IntroProvider>
              <Shell />
            </IntroProvider>
          </SmoothScroll>
        </BrowserRouter>
      </MotionConfig>
    </PrefsProvider>
  )
}
