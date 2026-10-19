import { useLocation } from 'react-router-dom'
import { landingSections, nav, routes } from '../../content'
import { useActiveSection } from '../../lib/sections'

const order = landingSections.map((s) => s.id)

/**
 * Which nav item is "current": on the landing page, the last nav section the reader has
 * scrolled past (so in-between sections keep their parent item lit). Elsewhere: none.
 */
export function useCurrentItem() {
  const { pathname } = useLocation()
  const active = useActiveSection()
  if (pathname !== routes.home) return -1
  const at = order.indexOf(active)
  if (at < 0) return 0
  // the nav item whose section is furthest down the page among those already reached
  // (nav order and page order can differ, e.g. Features is listed before How It Works)
  let current = 0
  let best = -1
  nav.items.forEach((it, i) => {
    const pos = order.indexOf(it.id)
    if (pos <= at && pos > best) {
      best = pos
      current = i
    }
  })
  return current
}
