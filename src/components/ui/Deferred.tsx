import { Children, useEffect, useState, type ReactNode } from 'react'
import { useIsPresent } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { DEFERRED_FLUSH } from '../../lib/scroll'
import { whenIdle } from '../../lib/utils'

/**
 * Mounts below-the-fold sections progressively after the first paint: one section per idle
 * moment (at most `maxWait` ms apart). Each step is a small, separate task, so the page stays
 * responsive and the work can never be thrown away and restarted.
 * - A URL hash (e.g. /#pricing) or a flush event mounts everything straight away.
 * - It stops as soon as the page starts its exit transition: mounting new animated content
 *   inside a leaving page would keep the route transition waiting.
 * - A spacer keeps the footer out of view until all sections are in.
 */
export function Deferred({ children, maxWait = 500 }: { children: ReactNode; maxWait?: number }) {
  const items = Children.toArray(children)
  const total = items.length
  const { hash } = useLocation()
  const present = useIsPresent()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!present) return
    if (hash) {
      setCount(total)
      return
    }
    let cancel = () => {}
    const step = (n: number) => {
      cancel = whenIdle(() => {
        setCount((c) => Math.max(c, n))
        if (n < total) step(n + 1)
      }, maxWait)
    }
    step(1)
    const flush = () => {
      cancel()
      setCount(total)
    }
    window.addEventListener(DEFERRED_FLUSH, flush)
    return () => {
      cancel()
      window.removeEventListener(DEFERRED_FLUSH, flush)
    }
  }, [hash, total, maxWait, present])

  return (
    <>
      {items.slice(0, count)}
      {count < total && <div aria-hidden className="min-h-svh" />}
    </>
  )
}
