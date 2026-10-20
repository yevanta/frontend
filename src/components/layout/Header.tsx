import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { nav, routes, ui } from '../../content'
import { events, useSectionTracker } from '../../lib/sections'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/Icon'
import { RollingNumber } from '../ui/Numbers'
import { SmartLink } from '../ui/SmartLink'
import { Logo } from './Logo'
import { useCurrentItem } from './Nav'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

/** Slim header: logo, a short centred nav, and quick controls. Becomes a translucent blurred bar on scroll. */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  const tracker = useSectionTracker()
  const { pathname } = useLocation()
  const navItem = useCurrentItem()
  // landing page: count only the key (nav) sections; other pages: count their sections
  const onHome = pathname === routes.home
  const index = onHome ? Math.max(0, navItem) : tracker.index
  const total = onHome ? nav.items.length : tracker.total

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={cn('relative transition-[background-color,backdrop-filter,box-shadow] duration-500', scrolled ? 'bg-[color-mix(in_srgb,var(--bg)_62%,transparent)] shadow-[0_1px_0_color-mix(in_srgb,var(--fg)_10%,transparent)] backdrop-blur-xl' : 'bg-transparent')}>
        <div className={cn('mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 transition-[height] duration-500 sm:px-6 lg:px-10', scrolled ? 'h-[72px]' : 'h-20')}>
          <div className="flex items-center">
            {/* light badge keeps every part of the logo (incl. the dark arrow) visible on dark and light sections */}
            <SmartLink to={routes.home} aria-label={ui.logoLabel} className="shrink-0 flex items-center rounded-2xl bg-c4 px-3 py-1.5 shadow-[0_8px_24px_-12px_var(--c1)] ring-1 ring-[color-mix(in_srgb,var(--c1)_12%,transparent)] transition-transform duration-300 hover:scale-[1.03]">
              <Logo height={48} />
            </SmartLink>
          </div>


          <div className="flex items-center justify-end gap-3">
            {total > 0 && (
              <span className="label hidden items-center gap-1.5 tabular-nums min-[360px]:flex lg:hidden xl:flex" aria-hidden title={ui.sectionCounter(index + 1, total)}>
                <RollingNumber value={pad(index + 1)} className="text-fg" />
                <span className="opacity-40">/</span>
                <span className="subtle">{pad(total)}</span>
              </span>
            )}
            {/* phones/tablets: a Menu button opening the same section list as the quick jump */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(events.openPalette))}
              aria-haspopup="dialog"
              className="label inline-flex min-h-11 items-center gap-2 rounded-full hairline px-4 transition hover:bg-fg/10 md:hidden"
            >
              <Icon name="menu" size={16} />
              <span>{nav.menu}</span>
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(events.openPalette))}
              className="label hidden items-center gap-2 rounded-full hairline px-3 py-1.5 transition hover:bg-fg/10 md:inline-flex"
              aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
            >
              <span className="lg:sr-only 2xl:not-sr-only">{ui.paletteButton}</span>
              <kbd className="rounded-md bg-fg/10 px-1.5 py-0.5 font-mono text-[10px]">{isMac ? ui.paletteShortcutMac : ui.paletteShortcutPc}</kbd>
            </button>
          </div>
        </div>
        {/* scroll progress line */}
        <motion.div aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-fg" style={{ scaleX: progress }} />
      </div>
    </header>
  )
}
