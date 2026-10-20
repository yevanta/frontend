import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ui } from '../../content'
import { useSmoothScroll } from '../../lib/scroll'
import { useActiveSection } from '../../lib/sections'
import { isExternal } from '../../lib/utils'
import { preloadRoute } from '../../pages/routes'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  children: ReactNode
  cursor?: string
  /** Mark the link as current (aria-current + data-active) when it points at this page/section. */
  highlight?: boolean
}

/**
 * One link for everything: external URLs open in a new tab, same-page
 * anchors smooth-scroll, and cross-page routes go through the router
 * (the target page scrolls to its hash after the route transition).
 */
export function SmartLink({ to, children, onClick, cursor, highlight, ...rest }: Props) {
  const { pathname } = useLocation()
  const { scrollTo } = useSmoothScroll()
  const activeSection = useActiveSection()

  if (isExternal(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" data-cursor={cursor ?? ui.cursor.open} onClick={onClick} {...rest}>
        {children}
        <span className="sr-only"> {ui.newTab}</span>
      </a>
    )
  }

  // static files served next to the app (sitemap.xml, robots.txt, documents): a plain link, not a route
  if (/^\/[^#?]*\.[a-z0-9]+$/i.test(to)) {
    return (
      <a href={to} onClick={onClick} {...rest}>
        {children}
      </a>
    )
  }

  const [path, hash] = to.split('#')
  const targetPath = path || pathname
  const samePage = targetPath === pathname && to !== '#'
  const current = !highlight || !samePage ? undefined : !hash ? 'page' : hash === activeSection ? 'location' : undefined

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    if (to === '#') {
      e.preventDefault()
      return
    }
    if (targetPath === pathname) {
      e.preventDefault()
      if (hash) scrollTo(hash)
      else scrollTo(0)
    }
  }

  return (
    <Link
      to={to}
      onClick={handle}
      onPointerEnter={() => preloadRoute(targetPath)}
      onFocus={() => preloadRoute(targetPath)}
      data-cursor={cursor}
      aria-current={current}
      data-active={current ? 'true' : undefined}
      {...rest}
    >
      {children}
    </Link>
  )
}
