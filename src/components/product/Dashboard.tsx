import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useTransform } from 'framer-motion'
import { productHero } from '../../content'
import { ease, motionCfg } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { cn, linePath } from '../../lib/utils'
import { LogoMark } from '../layout/Logo'
import { Icon } from '../ui/Icon'
import { useMouseDepth } from '../ui/Interactive'
import { CountUp } from '../ui/Numbers'

const m = productHero.mock
const navIcons = ['grid', 'table', 'chart', 'check', 'layers']
const statusTone: Record<string, string> = { Approved: 'bg-c4 text-c1', Pending: 'bg-[var(--c3d)] text-c4', Adjusted: 'bg-c2 text-c4' }
const confTone: Record<string, string> = { High: 'bg-c4 text-c1', Medium: 'bg-[var(--c3d)] text-c4', Low: 'bg-c2 text-c4' }

function Toasts({ play }: { play: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!play) return
    const t = window.setInterval(() => setI((n) => n + 1), motionCfg.toasts.interval)
    return () => window.clearInterval(t)
  }, [play])
  const msg = m.toasts[i % m.toasts.length]
  return (
    <div className="pointer-events-none absolute bottom-4 right-3 z-20 w-52 md:bottom-auto md:-right-10 md:top-16 md:w-56" aria-live="off">
      <AnimatePresence mode="popLayout">
        <motion.div key={i} className="tone-c4 flex items-center gap-3 rounded-2xl p-3 shadow-[0_20px_40px_-20px_var(--c1)]"
          initial={{ opacity: 0, x: 40, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--c3d)] text-c4"><Icon name="check" size={14} strokeWidth={2.6} /></span>
          <span className="text-[13px] font-semibold leading-tight">{msg}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** Fully animated HTML/SVG dashboard mockup that tilts with the cursor. */
export function DashboardMockup({ play }: { play: boolean }) {
  const { rich } = usePrefs()
  const { mx, my } = useMouseDepth()
  const rotateY = useTransform(mx, (v) => (rich ? v * 7 : 0))
  const rotateX = useTransform(my, (v) => (rich ? -v * 5 + 4 : 0))
  const on = play ? 'on' : 'off'
  const box = useRef<HTMLDivElement>(null)
  const visible = useInView(box)

  return (
    <div ref={box} className="relative [perspective:1400px]">
      <motion.div style={{ rotateX, rotateY }} className="relative">
        <div aria-hidden className="absolute -inset-10 -z-10 rounded-[60px] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--c3)_60%,transparent),transparent_70%)]" />
        <motion.div
          initial="off" animate={on}
          variants={{ off: { opacity: 0, y: 40, scale: 0.96 }, on: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: ease.out, staggerChildren: 0.08, delayChildren: 0.3 } } }}
          className="tone-c2 relative flex gap-3 overflow-hidden rounded-[32px] p-3 text-[12px] clay hairline-strong md:gap-4 md:p-4"
          role="img"
          aria-label={`${productHero.mockLabel}: dashboard with stats, charts and a records table`}
        >
          {/* sidebar */}
          <motion.aside variants={{ off: { opacity: 0, x: -30 }, on: { opacity: 1, x: 0 } }} className="tone-c1 hidden w-44 shrink-0 flex-col gap-1 rounded-[24px] p-3 sm:flex">
            <div className="mb-4 flex items-center gap-2 px-2 pt-1"><LogoMark size={22} /><span className="font-display text-[13px] font-semibold">{m.brand}</span></div>
            {m.nav.map((n, i) => (
              <div key={n} className={cn('flex items-center gap-2.5 rounded-xl px-2.5 py-2', i === 0 ? 'bg-c4 text-c1' : 'subtle')}>
                <Icon name={navIcons[i]} size={14} className="shrink-0" /><span className="truncate">{n}</span>
              </div>
            ))}
            <div className="mt-auto rounded-2xl bg-c3/60 p-3">
              <div className="h-1.5 w-2/3 rounded-full bg-c4/60" />
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-c4/20"><motion.div className="h-full origin-left rounded-full bg-c4" variants={{ off: { scaleX: 0 }, on: { scaleX: 0.72, transition: { duration: 1.4, delay: 0.8 } } }} /></div>
            </div>
          </motion.aside>

          <div className="flex min-w-0 flex-1 flex-col gap-3 md:gap-4">
            <motion.div variants={{ off: { opacity: 0, y: -10 }, on: { opacity: 1, y: 0 } }} className="flex items-center justify-between px-1 pt-1">
              <div>
                <p className="label text-[9px] subtle">{productHero.mockLabel}</p>
                <p className="font-display text-base font-semibold md:text-lg">{m.greeting}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-c4/10"><Icon name="search" size={14} /></span>
                <span className="relative grid h-8 w-8 place-items-center rounded-full bg-c4/10"><Icon name="bell" size={14} /><span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-c3" /></span>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {m.stats.map((s, i) => (
                <motion.div key={s.label} variants={{ off: { opacity: 0, y: 20 }, on: { opacity: 1, y: 0 } }} className={cn('rounded-[20px] p-3 md:p-4', i === 1 ? 'tone-c3' : 'tone-c1')}>
                  <p className="label text-[8px] subtle md:text-[9px]">{s.label}</p>
                  <p className="mt-1.5 font-display text-lg font-semibold md:text-2xl"><CountUp value={s.value} suffix={s.suffix} start={play} /></p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-2 md:grid-cols-5 md:gap-3">
              {/* price position vs competitor range */}
              <motion.div variants={{ off: { opacity: 0, y: 20 }, on: { opacity: 1, y: 0 } }} className="tone-c1 rounded-[20px] p-3 md:col-span-3 md:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{m.chartTitle}</p>
                  <div className="flex gap-3 text-[10px] subtle">
                    <span className="flex items-center gap-1.5"><span className="h-1 w-3 rounded-full bg-c4" />{m.chartLegend[0]}</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-c4/20" />{m.chartLegend[1]}</span>
                  </div>
                </div>
                <svg viewBox="0 0 300 110" className="mt-2 h-24 w-full md:h-28" preserveAspectRatio="none" aria-hidden>
                  <rect x="0" y="34" width="300" height="42" rx="10" style={{ fill: 'var(--c4)', opacity: 0.1 }} />
                  {[25, 55, 85].map((y) => <path key={y} d={`M0 ${y}H300`} style={{ stroke: 'var(--c4)', opacity: 0.08 }} />)}
                  <motion.path d={linePath([52, 58, 40, 62, 55, 78, 60, 50, 56], 300, 110, 18)} fill="none" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ stroke: 'var(--c4)' }}
                    variants={{ off: { pathLength: 0 }, on: { pathLength: 1, transition: { duration: 1.8, delay: 0.5, ease: 'easeInOut' } } }} />
                </svg>
              </motion.div>
              {/* expiring price lists */}
              <motion.div variants={{ off: { opacity: 0, y: 20 }, on: { opacity: 1, y: 0 } }} className="tone-c1 rounded-[20px] p-3 md:col-span-2 md:p-4">
                <p className="font-semibold">{m.listTitle}</p>
                <div className="mt-3 space-y-2">
                  {m.lists.map((l, i) => (
                    <motion.div key={l.name} className="flex items-center justify-between gap-2 rounded-xl bg-c4/5 px-3 py-2"
                      variants={{ off: { opacity: 0, x: 20 }, on: { opacity: 1, x: 0, transition: { delay: 0.9 + i * 0.12 } } }}>
                      <span className="truncate font-semibold">{l.name}</span>
                      <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold', i === 0 ? 'bg-[var(--c3d)] text-c4' : 'bg-c4/15')}>{l.days}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* recommendations with confidence badges */}
            <motion.div variants={{ off: { opacity: 0, y: 20 }, on: { opacity: 1, y: 0 } }} className="tone-c1 rounded-[20px] p-3 md:p-4">
              <p className="mb-2 font-semibold">{m.tableTitle}</p>
              <div className="label mb-1.5 hidden grid-cols-[1.2fr_0.8fr_1fr_auto] gap-2 px-3 text-[8px] subtle sm:grid">
                {m.tableCols.map((c) => <span key={c}>{c}</span>)}
              </div>
              <div className="space-y-1.5">
                {m.table.map((r, i) => (
                  <motion.div key={r.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-xl bg-c4/5 px-3 py-2 sm:grid-cols-[1.2fr_0.8fr_1fr_auto]"
                    variants={{ off: { opacity: 0, x: -24 }, on: { opacity: 1, x: 0, transition: { delay: 1.1 + i * 0.12 } } }}>
                    <span className="flex items-center gap-2 font-semibold"><span className="h-2 w-2 rounded-full bg-c4/70" />{r.name}</span>
                    <span className="tabular-nums subtle">{r.change}</span>
                    <span className={cn('hidden w-fit rounded-full px-2 py-0.5 text-[10px] font-bold sm:inline', confTone[r.confidence])}>{r.confidence}</span>
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold', statusTone[r.status])}>{r.status}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        <Toasts play={play && visible} />
      </motion.div>
    </div>
  )

}
