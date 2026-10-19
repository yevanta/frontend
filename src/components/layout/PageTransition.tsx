import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigationType } from 'react-router-dom'
import type { SeoEntry } from '../../content'
import { ease, motionCfg } from '../../motion'
import { applySeo } from '../../lib/seo'
import { useSmoothScroll } from '../../lib/scroll'
import { useIntro } from './Intro'
import { LogoMark } from './Logo'

/** Remembered scroll positions per history entry (for back/forward restoration). */
export const scrollPositions = new Map<string, number>()
let firstMount = true

const curve = { borderTopLeftRadius: '50% 12vh', borderTopRightRadius: '50% 12vh' }
const curveDown = { borderBottomLeftRadius: '50% 12vh', borderBottomRightRadius: '50% 12vh' }

/**
 * Wraps each route. On exit a rounded shape wipes up to cover the screen;
 * on enter the cover wipes away. Also handles scroll restoration & hashes.
 */
export function PageTransition({ children, page }: { children: ReactNode; page: SeoEntry }) {
  const { done } = useIntro()
  // the curtain only plays for in-app navigation (first load is revealed by the intro, or shown directly)
  const [reveal] = useState(() => done && !firstMount)
  useEffect(() => {
    firstMount = false
  }, [])
  const { hash, key } = useLocation()
  const nav = useNavigationType()
  const { scrollTo } = useSmoothScroll()

  // Remember this page's scroll position under ITS history entry. Living inside the page means an
  // exiting page (during the route transition) can never overwrite the entry we are navigating back to.
  useEffect(() => {
    const save = () => scrollPositions.set(key, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [key])

  useLayoutEffect(() => {
    applySeo(page)
    const saved = scrollPositions.get(key)
    if (hash) {
      // the target may live in a lazily loaded chunk: wait for it to mount
      scrollTo(0, { immediate: true })
      let t = 0
      const attempt = (n: number) => {
        if (document.getElementById(hash.slice(1))) {
          scrollTo(hash, { immediate: true })
          window.setTimeout(() => scrollTo(hash, { immediate: true }), 250)
        } else if (n < 160) t = window.setTimeout(() => attempt(n + 1), 50) // up to 8s: deferred sections render in a transition
      }
      t = window.setTimeout(() => attempt(0), 60)
      return () => window.clearTimeout(t)
    }
    if (nav === 'POP' && saved != null) {
      // Back/forward: wait until lazily loaded sections make the page tall enough, then restore.
      let t = 0
      const restore = (n: number) => {
        const tallEnough = document.documentElement.scrollHeight - window.innerHeight >= saved - 2
        if (tallEnough || n >= 60) {
          scrollTo(saved, { immediate: true })
          t = window.setTimeout(() => scrollTo(saved, { immediate: true }), 350)
        } else t = window.setTimeout(() => restore(n + 1), 50)
      }
      restore(0)
      return () => window.clearTimeout(t)
    }
    scrollTo(0, { immediate: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const r = motionCfg.route
  return (
    <>
      {children}
      {/* reveal (enter) */}
      {reveal && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
          <motion.div className="absolute inset-x-0 -top-[10vh] h-[120vh] bg-c3" style={curveDown}
            initial={{ y: '0%' }} animate={{ y: '-120%' }} transition={{ duration: r.reveal, ease: ease.wipe, delay: r.layerDelay }} />
          <motion.div className="absolute inset-x-0 -top-[10vh] grid h-[120vh] place-items-center bg-c1 text-c4" style={curveDown}
            initial={{ y: '0%' }} animate={{ y: '-120%' }} transition={{ duration: r.reveal, ease: ease.wipe }}>
            <LogoMark size={56} />
          </motion.div>
        </div>
      )}
      {/* cover (exit) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
        <motion.div className="absolute inset-x-0 top-0 h-[120vh] bg-c3" style={curve}
          initial={{ y: '110%' }} animate={{ y: '110%' }} exit={{ y: '0%' }} transition={{ duration: r.cover, ease: ease.wipe }} />
        <motion.div className="absolute inset-x-0 top-0 grid h-[120vh] place-items-center bg-c1 pb-[20vh] text-c4" style={curve}
          initial={{ y: '110%' }} animate={{ y: '110%' }} exit={{ y: '-10vh' }} transition={{ duration: r.cover, ease: ease.wipe, delay: r.layerDelay }}>
          <LogoMark size={56} />
        </motion.div>
      </div>
    </>
  )
}
