import { useEffect, useRef } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { ease, motionCfg, spring } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { cn } from '../../lib/utils'

/** Counts up to `value` when scrolled into view. Screen readers get the final value. */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '', className, start }: { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string; start?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const { reduced } = usePrefs()
  const go = start ?? inView
  const fmt = (v: number) => prefix + v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix

  useEffect(() => {
    const el = ref.current
    if (!go || !el) return
    if (reduced) {
      el.textContent = fmt(value)
      return
    }
    const c = animate(0, value, { duration: motionCfg.countUp.duration, ease: ease.out, onUpdate: (v) => (el.textContent = fmt(v)) })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go, value, reduced])

  return (
    <span className={cn('tabular-nums', className)}>
      <span className="sr-only">{fmt(value)}</span>
      <span ref={ref} aria-hidden>{fmt(0)}</span>
    </span>
  )
}

/** Odometer-style rolling digits. */
export function RollingNumber({ value, className }: { value: string; className?: string }) {
  const chars = value.split('')
  return (
    <span className={cn('inline-flex tabular-nums', className)}>
      <span className="sr-only">{value}</span>
      {chars.map((ch, i) => {
        const key = chars.length - i
        if (!/\d/.test(ch)) return <span key={`s${key}`} aria-hidden>{ch}</span>
        return (
          <span key={key} aria-hidden className="relative inline-block h-[1em] overflow-hidden leading-none">
            <motion.span className="flex flex-col" animate={{ y: `-${Number(ch) * 10}%` }} transition={spring.roll}>
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d} className="block h-[1em] leading-none">{d}</span>
              ))}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
