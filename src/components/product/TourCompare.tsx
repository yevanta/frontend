import { useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { LayoutGroup, motion, useAnimationFrame, useInView, useMotionValue } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import { architecture, beforeAfter, technology, tour, ui } from '../../content'
import { ease, motionCfg, spring } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { clamp, cn, linePath } from '../../lib/utils'
import { AfterArt, BeforeArt } from '../art/Scenes'
import { Icon } from '../ui/Icon'
import { TiltCard } from '../ui/Interactive'
import { Container, Reveal, Section, SectionHeading } from '../ui/primitives'

/* ------------------------------ Product tour ------------------------------ */

const bar = (w: string, o = 0.5) => <div className="h-2 rounded-full bg-c4" style={{ width: w, opacity: o }} />
const enter = (d = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.15 + d, ease: ease.out } })

/** The shared element that morphs between screens; its inner content fades in per tab. */
function Focus({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <motion.div layoutId="tour-focus" transition={spring.soft} className={cn('tone-c3 relative h-full overflow-hidden rounded-[18px] p-3', className)}>
      <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.4 }}>{children}</motion.div>
    </motion.div>
  )
}

function Pill({ children, tone = 'bg-c4 text-c1' }: { children: React.ReactNode; tone?: string }) {
  return <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold leading-tight', tone)}>{children}</span>
}

const statusTone: Record<string, string> = {
  Active: 'bg-c4 text-c1', 'Under review': 'bg-[var(--c3d)] text-c4', Discontinued: 'bg-c2 text-c4',
  High: 'bg-c4 text-c1', Medium: 'bg-[var(--c3d)] text-c4', Low: 'bg-c2 text-c4',
  Draft: 'bg-c2 text-c4', Staging: 'bg-[var(--c3d)] text-c4', Retired: 'bg-c1 text-c4',
}

/** Illustrative tour screens: sample values only. */
function Screen({ k }: { k: string }) {
  const focus = (
    <Focus>
      {k === 'overview' && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between"><span className="text-[10px] font-bold">Price position</span><Pill>vs competitors</Pill></div>
          <svg viewBox="0 0 300 120" className="mt-2 w-full flex-1" preserveAspectRatio="none" aria-hidden>
            <rect x="6" y="38" width="288" height="44" rx="22" style={{ fill: 'var(--c4)', opacity: 0.12 }} />
            <motion.path d={linePath([62, 56, 64, 48, 52, 44, 58, 50], 300, 120)} fill="none" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ stroke: 'var(--c4)' }} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
          </svg>
        </div>
      )}
      {k === 'registry' && (
        <div className="flex h-full items-center gap-3 rounded-xl bg-c1/30 px-3">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5" /></svg>
          <span className="text-[10px] font-semibold subtle">SKU, category, market…</span><span className="ml-auto"><Pill>Filter</Pill></span>
        </div>
      )}
      {k === 'pricing' && <div className="flex justify-between"><span className="text-[10px] font-bold">Price-change history</span><Pill>Effective dates</Pill></div>}
      {k === 'recommendations' && (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between"><span className="text-[11px] font-bold">SKU-1042 · +3.0%</span><Pill>High</Pill></div>
          <div className="space-y-1"><span className="block text-[9px] subtle">Expected uplift · margin floor ✓ · rules ✓</span></div>
          <div className="flex gap-1.5">
            <Pill>Approve</Pill><Pill tone="bg-c1/50 text-c4">Adjust</Pill><Pill tone="bg-c1/50 text-c4">Reject</Pill>
          </div>
        </div>
      )}
      {k === 'models' && (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-c4/85 text-[10px] font-black text-c1">v3</span>
          <span className="text-[10px] font-bold">Demand forecast</span>
          <Pill>Active</Pill>
        </div>
      )}
    </Focus>
  )
  if (k === 'overview')
    return (
      <div className="grid h-full grid-cols-3 grid-rows-[auto_1fr_1fr] gap-2.5">
        {[['Pending approvals', '8'], ['Beyond threshold', '14'], ['Expiring lists', '3']].map(([l, n], i) => (
          <motion.div key={l} {...enter(i * 0.05)} className="rounded-[16px] bg-c4/8 p-3">
            <span className="block truncate text-[9px] subtle">{l}</span>
            <div className="mt-1 font-display text-lg font-semibold">{n}</div>
          </motion.div>
        ))}
        <div className="col-span-2 row-span-2">{focus}</div>
        <motion.div {...enter(0.15)} className="row-span-2 space-y-2 rounded-[16px] bg-c4/8 p-3">
          <span className="block text-[9px] font-bold subtle">Open opportunities</span>
          {[70, 55, 80, 45].map((w, i) => <div key={i}>{bar(`${w}%`, 0.35)}</div>)}
        </motion.div>
      </div>
    )
  if (k === 'registry')
    return (
      <div className="grid h-full grid-rows-[auto_1fr] gap-2.5">
        <div className="h-12">{focus}</div>
        <div className="space-y-1.5">
          {['Active', 'Active', 'Under review', 'Active', 'Discontinued', 'Active', 'Under review'].map((st, r) => (
            <motion.div key={r} {...enter(r * 0.05)} className="flex items-center gap-3 rounded-xl bg-c4/8 px-3 py-2">
              <span className="text-[10px] font-bold opacity-90">SKU-{1040 + r * 37}</span>{bar(`${22 + (r % 3) * 10}%`, 0.35)}
              <span className="ml-auto"><Pill tone={statusTone[st]}>{st}</Pill></span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  if (k === 'pricing')
    return (
      <div className="grid h-full grid-cols-3 gap-2.5">
        <div className="relative col-span-2">
          {focus}
          <svg viewBox="0 0 300 160" className="pointer-events-none absolute inset-x-3 bottom-3 h-[calc(100%-44px)] w-[calc(100%-24px)]" preserveAspectRatio="none" aria-hidden>
            <motion.path d="M0 110 H70 V90 H150 V100 H220 V70 H300" fill="none" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ stroke: 'var(--c4)' }} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.3 }} />
            {[[40, 80], [120, 120], [190, 60], [260, 85]].map(([cx, cy], i) => (
              <motion.circle key={i} cx={cx} cy={cy} r="6" style={{ fill: 'var(--c2)', stroke: 'var(--c4)', strokeWidth: 2 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.1 }} />
            ))}
          </svg>
        </div>
        <motion.div {...enter()} className="space-y-1.5 rounded-[16px] bg-c4/8 p-3">
          <span className="block text-[9px] font-bold subtle">Competitor observations</span>
          {['CSV', 'Manual', 'CSV', 'CSV'].map((s, i) => (
            <div key={i} className="flex items-center justify-between gap-1 rounded-lg bg-c1/30 px-2 py-1.5">{bar('45%', 0.4)}<Pill tone="bg-c2 text-c4">{s}</Pill></div>
          ))}
        </motion.div>
      </div>
    )
  if (k === 'recommendations')
    return (
      <div className="grid h-full grid-rows-[auto_1fr] gap-2.5">
        <div className="h-[86px]">{focus}</div>
        <div className="space-y-1.5">
          {[['SKU-2210', '−1.5%', 'Medium'], ['SKU-0871', '+4.5%', 'Low'], ['SKU-3305', '+2.0%', 'High']].map(([s, c, conf], i) => (
            <motion.div key={s} {...enter(i * 0.06)} className="flex items-center gap-3 rounded-xl bg-c4/8 px-3 py-2">
              <span className="text-[10px] font-bold">{s}</span><span className="text-[10px] subtle">{c}</span>
              <span className="ml-auto"><Pill tone={statusTone[conf]}>{conf}</Pill></span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  return (
    <div className="grid h-full grid-cols-[1fr_2fr] gap-2.5">
      <div className="space-y-2">{focus}</div>
      <div className="space-y-2">
        {[['v4', 'Draft'], ['v3', 'Active'], ['v2', 'Staging'], ['v1', 'Retired']].map(([v, st], i) => (
          <motion.div key={v} {...enter(i * 0.06)} className="flex items-center gap-3 rounded-xl bg-c4/8 px-3 py-2.5">
            <span className="text-[10px] font-black">{v}</span>{bar(`${30 + i * 8}%`, 0.35)}
            <span className="ml-auto"><Pill tone={statusTone[st]}>{st}</Pill></span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function Tour() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const elapsed = useRef(0)
  const progress = useMotionValue(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const panel = useRef<HTMLDivElement>(null)
  const visible = useInView(panel)
  const { reduced } = usePrefs()
  const n = tour.tabs.length

  useAnimationFrame((_, delta) => {
    if (paused || reduced || !visible) return
    elapsed.current += delta
    progress.set(Math.min(1, elapsed.current / motionCfg.tour.interval))
    if (elapsed.current >= motionCfg.tour.interval) {
      elapsed.current = 0
      setIdx((i) => (i + 1) % n)
    }
  })
  const select = (i: number) => {
    elapsed.current = 0
    progress.set(0)
    setIdx(i)
  }
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : (idx + d + n) % n
    select(next)
    tabs.current[next]?.focus()
  }

  const t = tour.tabs[idx]
  return (
    <Section id={tour.id} tone={tour.tone} label={tour.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={tour.eyebrow} title={tour.title} lead={tour.lead} />
        <Reveal className="mt-12">
          <div ref={panel} className="glass rounded-[40px] p-3 md:p-5" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
            <div role="tablist" aria-label={tour.label} onKeyDown={onKey} className="no-scrollbar flex gap-1.5 overflow-x-auto rounded-full p-1">
              {tour.tabs.map((tb, i) => (
                <button
                  key={tb.key}
                  ref={(el) => { tabs.current[i] = el }}
                  role="tab"
                  id={`tour-tab-${tb.key}`}
                  aria-selected={i === idx}
                  aria-controls="tour-panel"
                  tabIndex={i === idx ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn('relative shrink-0 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors', i === idx ? 'text-bg' : 'hover:bg-fg/10')}
                >
                  {i === idx && (
                    <motion.span layoutId="tour-tab" className="absolute inset-0 rounded-full bg-fg" transition={spring.pill}>
                      <motion.span className="absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-bg/50" style={{ scaleX: progress }} />
                    </motion.span>
                  )}
                  <span className="relative">{tb.label}</span>
                </button>
              ))}
            </div>
            <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${t.key}`} className="mt-4 grid gap-5 md:grid-cols-12">
              <div className="tone-c1 relative aspect-[4/3.8] overflow-hidden rounded-[24px] sm:aspect-[16/11] sm:rounded-[30px] p-3 md:col-span-8 md:p-4" role="img" aria-label={`${tour.badge}: ${t.label}`}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-c3" /><span className="h-2.5 w-2.5 rounded-full bg-c4/40" /><span className="h-2.5 w-2.5 rounded-full bg-c4/20" />
                  <span className="label ml-auto text-[9px] subtle">{tour.badge}</span>
                </div>
                <div className="h-[calc(100%-26px)]">
                  <LayoutGroup id="tour"><Screen key={t.key} k={t.key} /></LayoutGroup>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-6 p-2 md:col-span-4">
                <div>
                  <p className="label subtle">{String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
                  <motion.p key={t.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="display-md mt-3">{t.label}</motion.p>
                  <motion.p key={`${t.key}-c`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }} className="text-muted mt-3 leading-relaxed">{t.caption}</motion.p>
                </div>
                <div className="flex items-center gap-3" aria-hidden>
                  {tour.tabs.map((_, i) => (
                    <span key={i} className="relative h-1 flex-1 overflow-hidden rounded-full bg-fg/20">
                      {i < idx && <span className="absolute inset-0 bg-fg" />}
                      {i === idx && <motion.span className="absolute inset-0 origin-left bg-fg" style={{ scaleX: progress }} />}
                    </span>
                  ))}
                  <span className={cn('label text-[10px] transition-opacity', paused ? 'subtle' : 'opacity-0')}>{tour.pause}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ---------------------------- Before / After ------------------------------ */

export function BeforeAfter() {
  const [p, setP] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const b = beforeAfter

  const fromEvent = (e: PointerEvent) => {
    const r = box.current!.getBoundingClientRect()
    setP(clamp(((e.clientX - r.left) / r.width) * 100, 0, 100))
  }
  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setP((v) => clamp(v - step, 0, 100)) }
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setP((v) => clamp(v + step, 0, 100)) }
    if (e.key === 'Home') { e.preventDefault(); setP(0) }
    if (e.key === 'End') { e.preventDefault(); setP(100) }
  }

  return (
    <Section id={b.id} tone={b.tone} label={b.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
        <Reveal className="mt-12">
          <div
            ref={box}
            className="relative aspect-[3/4] touch-pan-y select-none overflow-hidden rounded-[40px] clay sm:aspect-[3/2]"
            onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); fromEvent(e) }}
            onPointerMove={(e) => dragging.current && fromEvent(e)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            data-cursor={ui.cursor.drag}
          >
            <div className="absolute inset-0"><BeforeArt label={b.beforeAlt} /></div>
            {/* after layer revealed to the right of the handle: transforms only */}
            <div className="absolute inset-0 overflow-hidden" style={{ transform: `translateX(${p}%)` }}>
              <div className="absolute inset-0" style={{ transform: `translateX(${-p}%)` }}><AfterArt label={b.afterAlt} /></div>
            </div>
            <span className="label tone-c1 absolute left-4 top-4 max-w-[45%] rounded-full px-3 py-2 text-[10px] md:left-6 md:top-6">{b.before}</span>
            <span className="label tone-c4 absolute right-4 top-4 max-w-[45%] rounded-full px-3 py-2 text-right text-[10px] md:right-6 md:top-6">{b.after}</span>
            <div className="pointer-events-none absolute inset-0" style={{ transform: `translateX(${p}%)` }}>
              <div className="absolute inset-y-0 -left-px w-0.5 bg-c4 shadow-[0_0_20px_var(--c1)]" />
              <button
                type="button"
                role="slider"
                aria-label={b.handleLabel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(p)}
                aria-valuetext={`${Math.round(p)}%`}
                onKeyDown={onKey}
                className="pointer-events-auto absolute left-0 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-c4 text-c1 clay"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ------------------------------- Technology ------------------------------- */

/** Proposed technology options: product page only, clearly marked as proposals. */
export function Technology() {
  const t = technology
  return (
    <Section id={t.id} tone={t.tone} label={t.label} className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading layout="stack" eyebrow={t.eyebrow} title={t.title} lead={t.body} />
            <Reveal delay={0.2}>
              <p className="glass mt-8 flex gap-3 rounded-[24px] p-5 text-sm leading-relaxed">
                <Icon name="badge" size={20} className="mt-0.5 shrink-0 subtle" />
                <span>{t.disclaimer}</span>
              </p>
            </Reveal>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {t.items.map((it, i) => (
            <Reveal as="li" key={it.name} delay={i * 0.08} className={cn(i % 2 === 1 && 'sm:translate-y-8')}>
              <TiltCard className={cn('group flex h-full flex-col rounded-[30px] p-6 clay', ['tone-c2', 'tone-c3', 'tone-c3', 'tone-c2'][i])}>
                <div aria-hidden className="absolute inset-0 dot-grid opacity-30" />
                <div className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-[18px] bg-fg/10 transition-transform duration-700 ease-soft group-hover:-rotate-6 group-hover:scale-110">
                    <Icon name={it.icon} size={22} />
                  </span>
                  <span className="label rounded-full hairline px-2.5 py-1 text-[9px]">{t.proposedTag}</span>
                </div>
                <h3 className="relative mt-8 font-display text-xl font-semibold tracking-tight">{it.name}</h3>
                <p className="text-muted relative mt-2 text-sm leading-relaxed">{it.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/* ------------------------------ Architecture ------------------------------ */

const layerTones = ['bg-c4 text-c1', 'bg-[var(--c3d)] text-c4', 'bg-c2 text-c4', 'bg-c1 text-c4', 'bg-[var(--c3d)] text-c4']

export function Architecture() {
  const root = useRef<HTMLDivElement>(null)
  const { reduced, small } = usePrefs()
  const a = architecture
  const n = a.layers.length
  const animated = !reduced && !small

  useLayoutEffect(() => {
    if (!animated || !root.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.8 } })
      gsap.utils.toArray<HTMLElement>('[data-layer]').forEach((el, i) => {
        tl.fromTo(el, { y: (i - (n - 1) / 2) * 26 }, { y: (i - (n - 1) / 2) * 92, ease: 'power2.inOut' }, 0)
      })
      tl.fromTo('[data-caption]', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.08, ease: 'power2.out' }, 0.25)
    }, root)
    // positions can change once fonts and the sections above settle
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => {
      window.clearTimeout(t)
      ctx.revert()
    }
  }, [animated, n])

  return (
    <Section id={a.id} tone={a.tone} label={a.label}>
      <Container className="pt-20 md:pt-28">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} lead={a.lead} />
      </Container>
      <div ref={root} className={animated ? 'relative h-[220vh]' : 'relative py-16'}>
        <div className={animated ? 'sticky top-0 flex h-svh items-center' : ''}>
          <Container>
            <div className={cn('relative mx-auto max-w-4xl', animated ? 'h-[620px]' : 'space-y-4')}>
              {a.layers.map((l, i) => (
                <div key={l.title} data-layer className={animated ? 'absolute inset-x-0 top-1/2 flex items-center justify-center' : 'flex items-center gap-4'} style={animated ? { zIndex: n - i } : undefined}>
                  <div className={cn('relative shrink-0', animated ? 'h-[120px] w-[min(70vw,360px)]' : 'h-20 w-28')} style={animated ? { transform: 'translateY(-50%) rotateX(58deg) rotateZ(-38deg)', transformStyle: 'preserve-3d' } : undefined}>
                    <div className={cn('absolute inset-0 rounded-[28px] shadow-[0_30px_40px_-20px_var(--c1)]', layerTones[i])}>
                      <div aria-hidden className="absolute inset-3 rounded-[20px] border border-dashed border-current opacity-30" />
                      <div aria-hidden className="absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--c4)_30%,transparent),transparent_60%)]" />
                    </div>
                  </div>
                  <div data-caption className={cn(animated && 'absolute left-[calc(50%+min(26vw,200px))] -translate-y-1/2', 'min-w-[160px]')}>
                    <p className="label subtle">{String(i + 1).padStart(2, '0')}</p>
                    <p className="font-display text-lg font-semibold md:text-xl">{l.title}</p>
                    <p className="text-muted text-sm">{l.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </Section>
  )
}

