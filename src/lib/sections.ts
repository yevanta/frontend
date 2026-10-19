import { useEffect, useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'

/* Active section id, shared with anything that wants to highlight "where you are". */
let activeId = ''
const listeners = new Set<() => void>()
function setActive(id: string) {
  if (id === activeId) return
  activeId = id
  listeners.forEach((l) => l())
}
/**
 * Reflects the section in view in the URL hash. replaceState (not pushState) so scrolling never
 * fills the Back history, and history.state is kept so React Router's entry key survives.
 * The first section maps to the clean URL (no hash).
 */
function syncUrl(pathname: string, id: string | null) {
  if (id === null || window.location.pathname !== pathname) return
  const want = id ? `#${id}` : ''
  if (window.location.hash === want) return
  window.history.replaceState(window.history.state, '', `${pathname}${window.location.search}${want}`)
}

export function useActiveSection() {
  return useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb) }, () => activeId, () => '')
}

/**
 * Watches [data-section] / [data-tone] elements: drives the section counter,
 * sets <html data-tone> so the background colour-shifts between sections, and keeps
 * the address bar in sync with the section in view (e.g. /#pricing).
 */
export function useSectionTracker() {
  const { pathname } = useLocation()
  const [state, setState] = useState({ index: 0, total: 0 })

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight * 0.5
      // only the current page's sections (during a route transition the old page is still in the DOM)
      const secs = document.querySelectorAll<HTMLElement>(`main[data-path="${pathname}"] [data-section]`)
      let idx = 0
      secs.forEach((s, i) => {
        if (s.getBoundingClientRect().top <= mid) idx = i
      })
      let tone: string | undefined
      document.querySelectorAll<HTMLElement>('[data-tone]').forEach((t) => {
        const r = t.getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) tone = t.dataset.tone
      })
      if (tone && document.documentElement.dataset.tone !== tone) document.documentElement.dataset.tone = tone
      setActive(secs[idx]?.id ?? '')
      syncUrl(pathname, secs.length ? (idx === 0 ? '' : secs[idx].id) : null)
      setState((p) => (p.index === idx && p.total === secs.length ? p : { index: idx, total: secs.length }))
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    const timers = [60, 400, 1200].map((ms) => window.setTimeout(on, ms))
    on()
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      timers.forEach((t) => window.clearTimeout(t))
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  return state
}

export const events = {
  openPalette: 'brand:palette-open',
  openCookies: 'brand:cookies-open',
}
