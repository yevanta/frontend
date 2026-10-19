import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { nav, palettePages, productSections, routes, ui } from '../../content'

/** On the landing page the quick-jump list mirrors the main nav (only the key sections). */
const landingKey = nav.items.map(({ id, label }) => ({ id, label }))
import { ease } from '../../motion'
import { useSmoothScroll } from '../../lib/scroll'
import { events, useActiveSection } from '../../lib/sections'
import { cn, isExternal } from '../../lib/utils'
import { Icon } from '../ui/Icon'
import { useCurrentItem } from './Nav'

type Item = { key: string; label: string; group: string; hint: string; icon: string; current?: boolean; run: () => void }

/** Ctrl/Cmd+K quick-jump palette (a modal, not a nav). Keyboard-first. */
export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const restore = useRef<HTMLElement | null>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { scrollTo, lock, unlock } = useSmoothScroll()
  const activeSection = useActiveSection()
  const navItem = useCurrentItem()

  useEffect(() => {
    const key = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const ext = () => setOpen(true)
    window.addEventListener('keydown', key)
    window.addEventListener(events.openPalette, ext)
    return () => {
      window.removeEventListener('keydown', key)
      window.removeEventListener(events.openPalette, ext)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    restore.current = document.activeElement as HTMLElement
    setQ('')
    setActive(0)
    lock()
    const t = window.setTimeout(() => input.current?.focus(), 30)
    return () => {
      window.clearTimeout(t)
      unlock()
      restore.current?.focus?.()
    }
  }, [open, lock, unlock])

  const items = useMemo<Item[]>(() => {
    const onProduct = pathname.startsWith(routes.product)
    const here = onProduct ? productSections : landingKey
    const close = () => setOpen(false)
    const list: Item[] = [
      ...here.map((s, i) => ({
        key: `h-${s.id}`, label: s.label, group: ui.paletteThisPage, hint: String(i + 1).padStart(2, '0'), icon: 'hash', current: onProduct ? s.id === activeSection : i === navItem,
        run: () => { close(); window.setTimeout(() => scrollTo(s.id), 80) },
      })),
      ...palettePages.map((p) => ({
        key: `p-${p.to}`, label: p.label, group: ui.palettePages, hint: p.hint, icon: isExternal(p.to) ? 'external' : 'page', current: p.to === pathname,
        run: () => {
          close()
          if (isExternal(p.to)) window.open(p.to, '_blank', 'noopener,noreferrer')
          else if (p.to === pathname) scrollTo(0)
          else navigate(p.to)
        },
      })),
    ]
    const term = q.trim().toLowerCase()
    return term ? list.filter((i) => i.label.toLowerCase().includes(term) || i.group.toLowerCase().includes(term)) : list
  }, [q, pathname, navigate, scrollTo, activeSection, navItem])

  useEffect(() => setActive(0), [q])
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false) }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % Math.max(items.length, 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + items.length) % Math.max(items.length, 1)) }
    else if (e.key === 'Enter') { e.preventDefault(); items[active]?.run() }
    else if (e.key === 'Tab') { e.preventDefault(); input.current?.focus() }
  }

  let lastGroup = ''

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          onKeyDown={onKey}
        >
          <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--c1)_60%,transparent)] backdrop-blur-md" onClick={() => setOpen(false)} aria-hidden />
          <motion.div
            role="dialog" aria-modal="true" aria-label={ui.paletteTitle}
            className="tone-c1 relative w-full max-w-xl overflow-hidden rounded-[28px] hairline-strong shadow-[0_40px_120px_-30px_var(--c1)]"
            initial={{ y: 24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, scale: 0.98 }} transition={{ duration: 0.4, ease: ease.out }}
          >
            <div className="flex items-center gap-3 border-b border-[color-mix(in_srgb,var(--fg)_14%,transparent)] px-5">
              <Icon name="search" size={18} className="subtle" />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={ui.palettePlaceholder}
                className="h-16 flex-1 bg-transparent text-base outline-none placeholder:text-fg/70"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={items[active] ? `pal-${items[active].key}` : undefined}
                aria-autocomplete="list"
              />
              <button type="button" onClick={() => setOpen(false)} className="label rounded-md bg-fg/10 px-2 py-1" aria-label={ui.paletteClose}>esc</button>
            </div>
            <ul id="palette-list" ref={listRef} role="listbox" aria-label={ui.paletteTitle} className="no-scrollbar max-h-[52vh] overflow-y-auto p-2" data-lenis-prevent>
              {items.length === 0 && <li className="px-4 py-10 text-center text-sm subtle">{ui.paletteEmpty}</li>}
              {items.map((it, i) => {
                const head = it.group !== lastGroup
                lastGroup = it.group
                return (
                  <li key={it.key} role="presentation">
                    {head && <div className="label px-3 pb-1.5 pt-3 subtle" role="presentation">{it.group}</div>}
                    <div
                      id={`pal-${it.key}`}
                      role="option"
                      aria-current={it.current ? "true" : undefined}
                      aria-selected={i === active}
                      data-idx={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => it.run()}
                      className={cn('relative flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-[15px]', i === active ? 'text-c1' : '')}
                    >
                      {i === active && <motion.span layoutId="pal-hl" className="absolute inset-0 rounded-2xl bg-c4" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                      <Icon name={it.icon} size={16} className="relative subtle" />
                      <span className="relative flex-1">{it.label}</span>
                      {it.current && <span className="label relative rounded-full bg-current/15 px-2 py-0.5 text-[9px]">{ui.paletteCurrent}</span>}
                      <span className="label relative subtle">{it.hint}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="label flex gap-4 border-t border-[color-mix(in_srgb,var(--fg)_14%,transparent)] px-5 py-3 subtle">
              {ui.paletteFooter.map((f) => <span key={f}>{f}</span>)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
