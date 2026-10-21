import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cookie } from '../../content'
import { events } from '../../lib/sections'
import { safeGet, safeSet } from '../../lib/storage'
import { useIntro } from './Intro'
import { MagneticButton } from '../ui/MagneticButton'

/** Floating glass cookie card; the choice is remembered in localStorage (try/catch wrapped). */
export function CookieBanner() {
  const { done } = useIntro()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!done) return
    const t = window.setTimeout(() => {
      if (!safeGet(cookie.storageKey)) setOpen(true)
    }, 1400)
    const reopen = () => setOpen(true)
    window.addEventListener(events.openCookies, reopen)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener(events.openCookies, reopen)
    }
  }, [done])

  const choose = (v: 'accepted' | 'declined') => {
    safeSet(cookie.storageKey, v)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label={cookie.label}
          className="tone-c2 fixed bottom-24 left-4 right-4 z-[70] max-w-sm overflow-hidden rounded-[28px] p-5 hairline-strong shadow-[0_30px_80px_-30px_var(--c1)] sm:bottom-6 sm:left-6 sm:right-auto"
          initial={{ y: 140, opacity: 0, rotate: 3 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 140, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,var(--c3),transparent_70%)] opacity-70" />
          <div className="relative flex gap-4">
            <svg viewBox="0 0 48 48" className="h-11 w-11 shrink-0" aria-hidden>
              <circle cx="24" cy="24" r="20" style={{ fill: 'var(--c3)' }} />
              <circle cx="24" cy="24" r="20" style={{ fill: 'var(--c4)', opacity: 0.14 }} />
              {[[17, 18, 3], [29, 15, 2.4], [30, 29, 3.2], [18, 31, 2.2], [24, 24, 1.8]].map(([x, y, r], i) => (
                <circle key={i} cx={x} cy={y} r={r} style={{ fill: 'var(--c1)' }} />
              ))}
            </svg>
            <div>
              <p className="font-display text-base font-semibold">{cookie.title}</p>
              <p className="text-muted mt-1.5 text-sm leading-relaxed">{cookie.body}</p>
            </div>
          </div>
          <div className="relative mt-4 flex flex-wrap gap-2">
            <MagneticButton onClick={() => choose('accepted')} arrow={false}>{cookie.accept}</MagneticButton>
            <MagneticButton onClick={() => choose('declined')} variant="ghost" arrow={false}>{cookie.decline}</MagneticButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
