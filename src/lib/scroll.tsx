import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { motionCfg } from '../motion'
import { usePrefs } from './prefs'

type Target = string | number | HTMLElement

/** Asks progressively-mounted sections (see Deferred) to mount everything at once. */
export const DEFERRED_FLUSH = 'brand:deferred-flush'
type ScrollApi = {
  scrollTo: (target: Target, opts?: { immediate?: boolean; offset?: number }) => void
  lock: () => void
  unlock: () => void
}

const ScrollCtx = createContext<ScrollApi>({ scrollTo: () => {}, lock: () => {}, unlock: () => {} })

export function SmoothScroll({ children }: { children: ReactNode }) {
  const { reduced } = usePrefs()
  const lenisRef = useRef<Lenis | null>(null)
  const locks = useRef(0)

  useEffect(() => {
    if (reduced) return
    // Lenis drives its own rAF loop (no GSAP ticker needed, which keeps GSAP out of the main bundle)
    const lenis = new Lenis({ duration: motionCfg.lenis.duration, wheelMultiplier: motionCfg.lenis.wheelMultiplier, smoothWheel: true, autoRaf: true })
    lenisRef.current = lenis
    if (locks.current > 0) lenis.stop()
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  const scrollTo = useCallback(
    (target: Target, opts: { immediate?: boolean; offset?: number } = {}) => {
      let el: HTMLElement | number | null
      if (typeof target === 'string') {
        const id = target.replace(/^.*#/, '')
        el = document.getElementById(id)
        if (el == null) {
          // the section may not be mounted yet (progressive loading): mount everything, then retry
          window.dispatchEvent(new Event(DEFERRED_FLUSH))
          let tries = 0
          const retry = () => {
            const found = document.getElementById(id)
            if (found) scrollTo(found, opts)
            else if (++tries < 60) requestAnimationFrame(retry)
          }
          requestAnimationFrame(retry)
          return
        }
      } else el = target
      if (el == null) return
      const offset = typeof el === 'number' ? 0 : (opts.offset ?? -72)
      const lenis = lenisRef.current
      if (lenis) {
        // content may have grown since Lenis last measured (lazy sections): refresh its scroll limit first
        lenis.resize()
        lenis.scrollTo(el, { offset, immediate: opts.immediate, duration: motionCfg.scrollTo.duration, force: true })
      } else {
        const y = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({ top: y, behavior: opts.immediate || reduced ? 'auto' : 'smooth' })
      }
    },
    [reduced],
  )

  const lock = useCallback(() => {
    locks.current++
    lenisRef.current?.stop()
    document.documentElement.style.overflow = 'hidden'
  }, [])
  const unlock = useCallback(() => {
    locks.current = Math.max(0, locks.current - 1)
    if (locks.current === 0) {
      lenisRef.current?.start()
      document.documentElement.style.overflow = ''
    }
  }, [])

  const api = useMemo(() => ({ scrollTo, lock, unlock }), [scrollTo, lock, unlock])
  return <ScrollCtx.Provider value={api}>{children}</ScrollCtx.Provider>
}

export const useSmoothScroll = () => useContext(ScrollCtx)
