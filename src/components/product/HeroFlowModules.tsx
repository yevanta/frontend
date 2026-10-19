import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { flow, modules, productHero, ui } from '../../content'
import { ease } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { cn } from '../../lib/utils'
import { ModuleGraphic } from '../art/Micro'
import { useIntro } from '../layout/Intro'
import { Icon } from '../ui/Icon'
import { MagneticButton } from '../ui/MagneticButton'
import { Container, Eyebrow, Note, Reveal, Section, SectionHeading } from '../ui/primitives'
import { SplitText } from '../ui/SplitText'
import { DashboardMockup } from './Dashboard'

/* --------------------------------- Hero ----------------------------------- */

export function ProductHero() {
  const { done } = useIntro()
  const h = productHero
  return (
    <Section id={h.id} tone={h.tone} label={h.label} className="overflow-hidden">
      <Container className="pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={done ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}><Eyebrow>{h.eyebrow}</Eyebrow></motion.div>
            <SplitText as="h1" text={h.title} play={done} delay={0.1} className="display-xl mt-6" />
          </div>
          <motion.div className="md:col-span-4" initial={{ opacity: 0, y: 18 }} animate={done ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: ease.out }}>
            <p className="text-muted text-base leading-relaxed md:text-lg">{h.body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <MagneticButton to={h.primary.to} size="lg" cursor={ui.cursor.open}>{h.primary.label}</MagneticButton>
              <MagneticButton to={h.secondary.to} variant="ghost" arrow={false}>{h.secondary.label}</MagneticButton>
            </div>
          </motion.div>
        </div>
        <div className="mt-16 md:mt-20">
          <DashboardMockup play={done} />
        </div>
      </Container>
    </Section>
  )
}

/* --------------------------------- Flow ----------------------------------- */

const pts = [[100, 170], [300, 110], [500, 190], [700, 110], [900, 170]]
const flowPath = pts.reduce((d, [x, y], i) => {
  if (i === 0) return `M${x} ${y}`
  const [px, py] = pts[i - 1]
  const mx = (px + x) / 2
  return `${d} C${mx} ${py} ${mx} ${y} ${x} ${y}`
}, '')

export function Flow() {
  const [active, setActive] = useState(-1)
  const f = flow
  return (
    <Section id={f.id} tone={f.tone} label={f.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={f.eyebrow} title={f.title} lead={f.lead} />

        {/* desktop diagram */}
        <Reveal className="relative mt-16 hidden md:block">
          <div className="tone-c1 relative overflow-hidden rounded-[40px] p-6 clay">
            <div aria-hidden className="absolute inset-0 line-grid opacity-60" />
            <div className="relative aspect-[1000/300]">
              <svg viewBox="0 0 1000 300" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                <path d={flowPath} fill="none" strokeWidth="2" strokeDasharray="6 10" style={{ stroke: 'var(--c4)', opacity: 0.35 }} />
                <motion.path d={flowPath} fill="none" strokeWidth="3" strokeLinecap="round" style={{ stroke: 'var(--c4)' }} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: 'easeInOut' }} />
                {Array.from({ length: 7 }, (_, i) => (
                  <circle key={i} r={i % 2 ? 4 : 6} style={{ fill: i % 3 ? 'var(--c4)' : 'var(--c3)' }}>
                    <animateMotion dur="6s" begin={`${-i * 0.86}s`} repeatCount="indefinite" path={flowPath} />
                  </circle>
                ))}
              </svg>
              {f.nodes.map((n, i) => {
                const [x, y] = pts[i]
                const on = active === i
                return (
                  <div key={n.title} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x / 10}%`, top: `${(y / 300) * 100}%` }}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(-1)}
                      onFocus={() => setActive(i)}
                      onBlur={() => setActive(-1)}
                      aria-expanded={on}
                      aria-describedby={`flow-d-${i}`}
                      className="group relative grid h-20 w-20 place-items-center rounded-full"
                    >
                      <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-c4/30" style={{ animationDelay: `${i * 0.4}s` }} />
                      <motion.span animate={{ scale: on ? 1.15 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={cn('relative grid h-20 w-20 place-items-center rounded-full clay transition-colors duration-300', on ? 'bg-c4 text-c1' : 'bg-[var(--c3d)] text-c4')}>
                        <Icon name={n.icon} size={26} />
                      </motion.span>
                      <span className="label absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-c4">{String(i + 1).padStart(2, '0')} {n.title}</span>
                    </button>
                    <AnimatePresence>
                      {on && (
                        <motion.div id={`flow-d-${i}`} role="tooltip" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }} transition={{ duration: 0.3, ease: ease.out }}
                          className={cn('tone-c4 absolute z-20 w-60 rounded-[22px] p-4 shadow-[0_24px_50px_-20px_var(--c1)]', y < 150 ? 'top-24' : 'bottom-24', i === 4 ? 'right-0' : i === 0 ? 'left-0' : 'left-1/2 -translate-x-1/2')}>
                          <p className="font-display font-semibold">{n.title}</p>
                          <p className="text-muted mt-1 text-sm leading-relaxed">{n.body}</p>
                          <p className="mt-3 flex items-baseline gap-2"><span className="font-display text-2xl font-semibold">{n.stat}</span><span className="label text-[10px] subtle">{n.statLabel}</span></p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!on && <span id={`flow-d-${i}`} className="sr-only">{n.body} {n.stat} {n.statLabel}</span>}
                  </div>
                )
              })}
            </div>
            {/* stat callouts */}
            <div className="relative mt-10 grid grid-cols-5 gap-3">
              {f.nodes.map((n, i) => (
                <div key={n.title} className={cn('rounded-2xl px-4 py-3 text-c4 transition-colors duration-300', active === i ? 'bg-c4/15' : 'bg-c4/5')}>
                  <p className="font-display text-lg font-semibold">{n.stat}</p>
                  <p className="label text-[9px] subtle">{n.statLabel}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* mobile: vertical */}
        <ol className="relative mt-12 space-y-4 md:hidden">
          <span aria-hidden className="absolute bottom-6 left-[27px] top-6 w-0.5 bg-fg/20" />
          {f.nodes.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 0.06} className="relative flex gap-4">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--c3d)] text-c4 clay">
                <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-c3/50" />
                <Icon name={n.icon} size={22} />
              </span>
              <div className="glass flex-1 rounded-[24px] p-4">
                <p className="font-display font-semibold">{String(i + 1).padStart(2, '0')} · {n.title}</p>
                <p className="text-muted mt-1 text-sm">{n.body}</p>
                <p className="mt-2 font-display text-lg font-semibold">{n.stat} <span className="label text-[10px] subtle">{n.statLabel}</span></p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Note className="mt-4 block">{f.note}</Note>
      </Container>
    </Section>
  )
}

/* ------------------------------- Modules ---------------------------------- */

const rowTones = ['tone-c1', 'tone-c3', 'tone-c4', 'tone-c1', 'tone-c3', 'tone-c4']

function ModuleRow({ i, n, progress, item }: { i: number; n: number; progress: MotionValue<number>; item: (typeof modules.items)[number] }) {
  const { reduced } = usePrefs()
  const target = 1 - (n - i - 1) * 0.035
  const scale = useTransform(progress, [i / n, 1], [1, reduced ? 1 : target])
  const dim = useTransform(progress, [i / n, (i + 1) / n], [0, reduced || i === n - 1 ? 0 : 0.35])
  return (
    <div className="md:sticky" style={{ top: `calc(84px + ${i * 14}px)` }}>
      <motion.article style={{ scale }} className={cn(rowTones[i], 'relative mb-10 origin-top overflow-hidden rounded-[40px] p-6 clay md:p-10')}>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-[20px] bg-fg text-bg"><Icon name={item.icon} size={24} /></span>
              <span className="label subtle">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            </div>
            <h3 className="display-md mt-6">{item.title}</h3>
            <p className="text-muted mt-3 max-w-md leading-relaxed">{item.body}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {item.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[15px]">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-fg/15"><Icon name="check" size={11} strokeWidth={3} /></span>{b}
                </li>
              ))}
            </ul>
          </div>
          <figure className="relative aspect-[320/220] rounded-[28px] bg-fg/6 p-4 inner-glow">
            <ModuleGraphic kind={item.graphic} />
            <figcaption className="label absolute bottom-3 right-4 text-[9px] subtle">{modules.graphicLabel}</figcaption>
          </figure>
        </div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-c1" style={{ opacity: dim }} />
      </motion.article>
    </div>
  )
}

export function Modules() {
  const wrap = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const m = modules
  return (
    <Section id={m.id} tone={m.tone} label={m.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={m.eyebrow} title={m.title} lead={m.lead} />
        <div ref={wrap} className="relative mt-14">
          {m.items.map((it, i) => <ModuleRow key={it.key} i={i} n={m.items.length} progress={scrollYProgress} item={it} />)}
        </div>
      </Container>
    </Section>
  )
}
