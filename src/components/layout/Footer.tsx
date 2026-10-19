import { useRef, useState, type FormEvent, type PointerEvent } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { footer } from '../../content'
import { ease } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { useSmoothScroll } from '../../lib/scroll'
import { events } from '../../lib/sections'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/Icon'
import { Container } from '../ui/primitives'
import { SmartLink } from '../ui/SmartLink'
import { SplitText } from '../ui/SplitText'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setState('error')
    setState('done')
  }
  return (
    <div className="glass relative overflow-hidden rounded-[32px] p-6 md:p-8">
      <SplitText as="h2" text={footer.newsletter.title} className="display-md" />
      <p className="text-muted mt-3 max-w-sm text-sm leading-relaxed">{footer.newsletter.body}</p>
      <div className="mt-6 min-h-[64px]">
        <AnimatePresence mode="wait" initial={false}>
          {state !== 'done' ? (
            <motion.form key="form" onSubmit={submit} noValidate className="flex gap-2 rounded-full bg-fg/8 p-1.5 hairline" exit={{ scale: 0.6, opacity: 0, borderRadius: 999 }} transition={{ duration: 0.4, ease: ease.out }}>
              <label htmlFor="nl-email" className="sr-only">{footer.newsletter.label}</label>
              <input
                id="nl-email" type="email" value={email} autoComplete="email"
                onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
                placeholder={footer.newsletter.placeholder}
                aria-invalid={state === 'error'}
                aria-describedby={state === 'error' ? 'nl-err' : undefined}
                className="w-0 min-w-0 flex-1 bg-transparent px-3 text-[15px] outline-none sm:px-4 placeholder:text-fg/70"
              />
              <button type="submit" className="group flex shrink-0 items-center gap-2 rounded-full bg-fg px-4 py-3 text-sm font-semibold text-bg sm:px-5">
                {footer.newsletter.button}
                <Icon name="arrow" size={16} className="transition-transform duration-500 ease-soft group-hover:translate-x-1" />
              </button>
            </motion.form>
          ) : (
            <motion.div key="done" role="status" className="flex items-center gap-3" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-fg text-bg">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <motion.path d="M5 12.5 10 17 19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.5 }} />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold">{footer.newsletter.success}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {state === 'error' && <p id="nl-err" role="alert" className="mt-2 pl-4 text-sm font-semibold">{footer.newsletter.error}</p>}
      </div>
    </div>
  )
}

function SocialIcon({ href, label, icon }: { href: string; label: string; icon: string }) {
  const { rich } = usePrefs()
  const x = useSpring(0, { stiffness: 250, damping: 15 })
  const y = useSpring(0, { stiffness: 250, damping: 15 })
  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!rich) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.45)
    y.set((e.clientY - r.top - r.height / 2) * 0.45)
  }
  return (
    <motion.a href={href} aria-label={label} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }} onClick={(e) => href === '#' && e.preventDefault()} style={{ x, y }}
      className="grid h-12 w-12 place-items-center rounded-full hairline transition-colors duration-300 hover:bg-fg hover:text-bg">
      <Icon name={icon} size={18} />
    </motion.a>
  )
}

/** Shared footer: newsletter, link columns, socials, giant wordmark that fills on scroll. */
export function Footer() {
  const root = useRef<HTMLElement>(null)
  const mark = useRef<HTMLDivElement>(null)
  const { scrollTo } = useSmoothScroll()
  const { rich, reduced } = usePrefs()
  const bx = useSpring(0, { stiffness: 50, damping: 14 })
  const by = useSpring(0, { stiffness: 50, damping: 14 })

  // wordmark fills from the bottom as it scrolls into view (transforms only: outer slides up, inner counter-slides)
  const { scrollYProgress } = useScroll({ target: mark, offset: ['start end', 'end end'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const outerY = useTransform(fill, (v) => `${(1 - v) * 100}%`)
  const innerY = useTransform(fill, (v) => `${-(1 - v) * 100}%`)

  const follow = (e: PointerEvent) => {
    if (!rich || !root.current) return
    const r = root.current.getBoundingClientRect()
    bx.set(e.clientX - r.left - 90)
    by.set(e.clientY - r.top - 90)
  }

  return (
    <footer ref={root} data-tone={footer.tone} onPointerMove={follow} className="relative overflow-hidden pb-8 pt-20 md:pt-28">
      {rich && (
        <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 h-[180px] w-[180px] rounded-full opacity-60 mix-blend-soft-light" style={{ x: bx, y: by, background: 'radial-gradient(circle at 35% 30%, var(--c4), var(--c3) 45%, transparent 70%)' }} />
      )}
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5"><Newsletter /></div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-8">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="label subtle">{col.title}</h3>
                <ul className="mt-3 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <SmartLink to={l.to} highlight className="group relative inline-flex min-h-8 items-center gap-2 py-1 text-[15px] opacity-85 transition-opacity hover:opacity-100 data-[active=true]:font-semibold data-[active=true]:opacity-100">
                        <span aria-hidden className="hidden h-1.5 w-1.5 rounded-full bg-current group-data-[active=true]:inline-block" />
                        {l.label}
                        <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-soft group-hover:origin-left group-hover:scale-x-100 group-data-[active=true]:scale-x-100" />
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3">
            {footer.socials.map((s) => <SocialIcon key={s.label} {...s} />)}
            <a href={`mailto:${footer.email}`} className="ml-1 inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold hairline transition hover:bg-fg hover:text-bg">
              <Icon name="mail" size={16} />{footer.email}
            </a>
          </div>
          <button type="button" onClick={() => scrollTo(0)} className="group label flex items-center gap-3 rounded-full hairline py-2 pl-4 pr-2 transition hover:bg-fg/10">
            {footer.backToTop}
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-fg text-bg">
              <Icon name="arrow-up" size={16} className="transition-transform duration-500 ease-soft group-hover:-translate-y-[180%]" />
              <Icon name="arrow-up" size={16} className="absolute translate-y-[180%] transition-transform duration-500 ease-soft group-hover:translate-y-0" />
            </span>
          </button>
        </div>
      </Container>

      {/* giant wordmark: outline, filled from below on scroll */}
      <div aria-hidden className="relative mt-12 select-none overflow-hidden px-2">
        <div ref={mark} className="relative mx-auto w-fit font-display text-[clamp(2.5rem,12.4vw,13rem)] font-bold leading-[0.9] tracking-[-0.05em]">
          <span className="text-outline block" style={{ WebkitTextStrokeWidth: '2.4px' }}>{footer.wordmark}</span>
          <motion.div className={cn('absolute inset-0 overflow-hidden', reduced && 'opacity-30')} style={reduced ? undefined : { y: outerY }}>
            <motion.div className="gradient-text block" style={reduced ? undefined : { y: innerY }}>{footer.wordmark}</motion.div>
          </motion.div>
        </div>
      </div>

      <Container>
        <div className="mt-8 flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--fg)_14%,transparent)] pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="subtle">{footer.copyright}</p>
            <p className="label mt-1 text-[10px] subtle">{footer.entities}</p>
          </div>
          <p className="label subtle">{footer.placeholderNote}</p>
          <button type="button" onClick={() => window.dispatchEvent(new Event(events.openCookies))} className="min-h-8 py-1 text-left underline decoration-fg/30 underline-offset-4 transition hover:decoration-fg">
            {footer.cookiePrefs}
          </button>
        </div>
      </Container>
    </footer>
  )
}
