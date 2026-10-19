import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ui } from '../../content'
import { ease, motionCfg, spring } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { clamp, cn } from '../../lib/utils'
import { Icon } from './Icon'

/* ------------------------------------------------------------------ */
/*  Accordion                                                          */
/* ------------------------------------------------------------------ */

export function Accordion({ items, open, onChange, idPrefix }: { items: { q: string; a: string }[]; open: number; onChange: (i: number) => void; idPrefix: string }) {
  return (
    <div className="divide-y divide-[color-mix(in_srgb,var(--fg)_14%,transparent)] border-y border-[color-mix(in_srgb,var(--fg)_14%,transparent)]">
      {items.map((it, i) => {
        const isOpen = open === i
        const bid = `${idPrefix}-btn-${i}`
        const pid = `${idPrefix}-panel-${i}`
        return (
          <div key={i}>
            <h3>
              <button
                id={bid}
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => onChange(isOpen ? -1 : i)}
                className="group flex w-full items-center gap-5 py-6 text-left"
              >
                <span className="label w-8 shrink-0 subtle">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-display text-lg font-medium tracking-tight md:text-xl">{it.q}</span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={spring.snappy}
                  className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300', isOpen ? 'bg-fg text-bg' : 'hairline group-hover:bg-fg/10')}
                >
                  <Icon name="plus" size={18} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={pid}
                  role="region"
                  aria-labelledby={bid}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: ease.out }}
                  className="overflow-hidden"
                >
                  <p className="text-muted max-w-2xl pb-7 pl-13 pr-14 leading-relaxed">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Draggable carousel with inertia + progress                         */
/* ------------------------------------------------------------------ */

export function Carousel({ children, label, itemClassName, controlsClassName }: { children: ReactNode; label: string; itemClassName?: string; controlsClassName?: string }) {
  const items = Children.toArray(children)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [max, setMax] = useState(0)
  const dragged = useRef(false)
  const progress = useTransform(x, (v) => (max ? clamp(-v / max, 0, 1) : 0))
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current || !viewport.current) return
      const m = Math.max(0, track.current.scrollWidth - viewport.current.clientWidth)
      setMax(m)
      if (x.get() < -m) x.set(-m)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (viewport.current) ro.observe(viewport.current)
    return () => ro.disconnect()
  }, [x])

  useEffect(() => x.on('change', (v) => {
    setAtStart(v > -4)
    setAtEnd(v < -max + 4)
  }), [x, max])

  const step = useCallback(() => {
    const first = track.current?.children[0] as HTMLElement | undefined
    return first ? first.offsetWidth + 20 : 320
  }, [])

  const go = (dir: 1 | -1) => {
    const s = step()
    const target = clamp(Math.round((x.get() - dir * s) / s) * s, -max, 0)
    animate(x, target, spring.soft)
  }

  const ensureVisible = (i: number) => {
    const s = step()
    const left = i * s
    const vw = viewport.current?.clientWidth ?? 0
    const cur = -x.get()
    if (left < cur || left + s > cur + vw) animate(x, clamp(-left, -max, 0), spring.soft)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKey}>
      <div ref={viewport} className="-mx-4 overflow-hidden px-4 py-6 sm:-mx-6 sm:px-6" data-cursor={ui.cursor.drag}>
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -max, right: 0 }}
          dragElastic={motionCfg.carousel.elastic}
          dragTransition={{ power: motionCfg.carousel.power, timeConstant: motionCfg.carousel.timeConstant }}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={() => window.setTimeout(() => (dragged.current = false), 60)}
          onClickCapture={(e) => {
            if (dragged.current) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
          style={{ x }}
          className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
        >
          {items.map((c, i) => (
            <div key={i} role="group" aria-roledescription="slide" aria-label={ui.slideOf(i + 1, items.length)} className={itemClassName} onFocusCapture={() => ensureVisible(i)}>
              {c}
            </div>
          ))}
        </motion.div>
      </div>
      <div className={cn('mt-4 flex items-center gap-5', controlsClassName)}>
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-fg/15" aria-hidden>
          <motion.div className="absolute inset-0 origin-left rounded-full bg-fg" style={{ scaleX: progress }} />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={atStart} aria-label={ui.prev} className="grid h-11 w-11 place-items-center rounded-full hairline transition hover:bg-fg/10 disabled:opacity-35">
            <Icon name="arrow-left" size={18} />
          </button>
          <button type="button" onClick={() => go(1)} disabled={atEnd} aria-label={ui.next} className="grid h-11 w-11 place-items-center rounded-full hairline transition hover:bg-fg/10 disabled:opacity-35">
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Marquee that eases down on hover                                   */
/* ------------------------------------------------------------------ */

/**
 * Runs on the compositor via the Web Animations API (no per-frame JavaScript).
 * Hover eases the playback rate down in a few small steps; it pauses off screen.
 */
export function Marquee({ children, reverse = false, speed = motionCfg.marquee.speed, className }: { children: ReactNode; reverse?: boolean; speed?: number; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const half = useRef<HTMLDivElement>(null)
  const anim = useRef<Animation | null>(null)
  const rateTimer = useRef(0)
  const inView = useInView(root)
  const { reduced } = usePrefs()

  useEffect(() => {
    if (reduced || !track.current || !half.current) return
    const w = half.current.offsetWidth
    if (!w) return
    const from = reverse ? -w : 0
    const a = track.current.animate(
      [{ transform: `translate3d(${from}px,0,0)` }, { transform: `translate3d(${from + (reverse ? w : -w)}px,0,0)` }],
      { duration: (w / speed) * 1000, iterations: Infinity, easing: 'linear' },
    )
    anim.current = a
    return () => {
      a.cancel()
      anim.current = null
    }
  }, [reduced, reverse, speed])

  useEffect(() => {
    const a = anim.current
    if (!a) return
    if (inView) a.play()
    else a.pause()
  }, [inView])

  const easeRate = (to: number) => {
    window.clearInterval(rateTimer.current)
    rateTimer.current = window.setInterval(() => {
      const a = anim.current
      if (!a) return window.clearInterval(rateTimer.current)
      const next = a.playbackRate + (to - a.playbackRate) * 0.35
      a.updatePlaybackRate(Math.abs(next - to) < 0.02 ? to : next)
      if (Math.abs(next - to) < 0.02) window.clearInterval(rateTimer.current)
    }, 60)
  }

  return (
    <div ref={root} className={cn('overflow-hidden', className)} onPointerEnter={() => easeRate(motionCfg.marquee.hoverFactor)} onPointerLeave={() => easeRate(1)}>
      <div ref={track} className="flex w-max will-change-transform">
        <div ref={half} className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Spotlight + tilt card                                              */
/* ------------------------------------------------------------------ */

export function TiltCard({ children, className, tilt = true, cursor, id, onFocus }: { children: ReactNode; className?: string; tilt?: boolean; cursor?: string; id?: string; onFocus?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const { rich } = usePrefs()
  const rx = useSpring(0, motionCfg.tilt.spring)
  const ry = useSpring(0, motionCfg.tilt.spring)
  const gx = useMotionValue(0)
  const gy = useMotionValue(0)
  const glow = useSpring(0, { stiffness: 200, damping: 30 })

  const move = (e: PointerEvent) => {
    if (!rich || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    if (tilt) {
      ry.set((px - 0.5) * motionCfg.tilt.max * 2)
      rx.set(-(py - 0.5) * motionCfg.tilt.max * 2)
    }
    gx.set(e.clientX - r.left - 220)
    gy.set(e.clientY - r.top - 220)
    glow.set(1)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
    glow.set(0)
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      onFocus={onFocus}
      onPointerMove={move}
      onPointerLeave={leave}
      data-cursor={cursor}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: motionCfg.tilt.perspective }}
      className={cn('relative overflow-hidden', className)}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[440px] w-[440px] rounded-full mix-blend-soft-light"
        style={{ x: gx, y: gy, opacity: glow, background: 'radial-gradient(circle, color-mix(in srgb, var(--c4) 75%, transparent), transparent 62%)' }}
      />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mouse-follow depth (for illustrations)                             */
/* ------------------------------------------------------------------ */

export function useMouseDepth() {
  const { rich } = usePrefs()
  const mx = useSpring(0, { stiffness: 60, damping: 18 })
  const my = useSpring(0, { stiffness: 60, damping: 18 })
  useEffect(() => {
    if (!rich) return
    const on = (e: globalThis.PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => window.removeEventListener('pointermove', on)
  }, [rich, mx, my])
  return { mx, my }
}

export function DepthLayer({ depth, children, className, mx, my }: { depth: number; children: ReactNode; className?: string; mx: ReturnType<typeof useSpring>; my: ReturnType<typeof useSpring> }) {
  const x = useTransform(mx, (v) => v * depth * motionCfg.parallax.mouse)
  const y = useTransform(my, (v) => v * depth * motionCfg.parallax.mouse)
  return <motion.div style={{ x, y }} className={className}>{children}</motion.div>
}

/* ------------------------------------------------------------------ */
/*  Switch                                                             */
/* ------------------------------------------------------------------ */

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="flex w-full items-center justify-between gap-4 rounded-2xl hairline px-4 py-3 text-left transition hover:bg-fg/5">
      <span className="text-sm font-semibold">{label}</span>
      <span className={cn('relative h-7 w-12 rounded-full transition-colors duration-300', checked ? 'bg-fg' : 'bg-fg/20')}>
        <motion.span layout transition={spring.snappy} className={cn('absolute top-1 h-5 w-5 rounded-full', checked ? 'right-1 bg-bg' : 'left-1 bg-fg')} />
      </span>
    </button>
  )
}
