import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { features, search, trust } from '../../content'
import { ease } from '../../motion'
import { useSmoothScroll } from '../../lib/scroll'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/Icon'
import { Marquee } from '../ui/Interactive'
import { Container, Reveal, Section, SectionHeading } from '../ui/primitives'

/* ------------------------------ Trust strip ------------------------------ */

const industryIcons = ['grid', 'page', 'layers', 'users', 'chart', 'database']

function IndustryChip({ name, i }: { name: string; i: number }) {
  return (
    <span className="mx-2 flex shrink-0 items-center gap-3 rounded-full bg-fg/8 px-5 py-2.5 font-display text-lg font-semibold tracking-tight hairline md:mx-2.5 md:px-6 md:py-3 md:text-xl">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-fg text-bg"><Icon name={industryIcons[i % industryIcons.length]} size={15} /></span>
      {name}
    </span>
  )
}

export function TrustStrip() {
  // repeated so each marquee half is wider than very large screens
  const rowA = [...trust.industries, ...trust.industries]
  const rowB = [...rowA.slice(3), ...rowA.slice(0, 3)]
  return (
    <Section id={trust.id} tone={trust.tone} label={trust.label}>
      <div className="tone-c3 relative -my-px overflow-hidden py-10 md:py-14">
        <div aria-hidden className="absolute inset-0 line-grid opacity-50" />
        <Container className="relative mb-6">
          <h2 className="label">{trust.title}</h2>
        </Container>
        <ul className="sr-only">{trust.industries.map((l) => <li key={l}>{l}</li>)}</ul>
        <div aria-hidden className="relative space-y-3 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <Marquee>{rowA.map((n, i) => <IndustryChip key={i} name={n} i={i} />)}</Marquee>
          <Marquee reverse>{rowB.map((n, i) => <IndustryChip key={i} name={n} i={trust.industries.indexOf(n) + 2} />)}</Marquee>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------ Quick search ----------------------------- */

const allFeatures = [...features.highlights, ...features.items]

export function matches(q: string, it: { title: string; tag: string; body: string; keywords: string }) {
  const t = q.trim().toLowerCase()
  if (!t) return true
  return `${it.title} ${it.tag} ${it.body} ${it.keywords}`.toLowerCase().includes(t)
}

export function QuickSearch({ query, setQuery }: { query: string; setQuery: (q: string) => void }) {
  const input = useRef<HTMLInputElement>(null)
  const [active, setActive] = useState(0)
  const { scrollTo } = useSmoothScroll()
  const results = useMemo(() => (query.trim() ? allFeatures.filter((f) => matches(query, f)) : []), [query])

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault()
        input.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => setActive(0), [query])

  const jump = (key: string) => {
    scrollTo(`feature-${key}`, { offset: -120 })
    const el = document.getElementById(`feature-${key}`)
    el?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 700, delay: 900, easing: 'ease-out' })
  }

  const onKey = (e: KeyboardEvent) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % results.length) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length) }
    if (e.key === 'Enter') { e.preventDefault(); jump(results[active].key) }
    if (e.key === 'Escape') setQuery('')
  }

  return (
    <Section id={search.id} tone={search.tone} label={search.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={search.eyebrow} title={search.title} lead={search.lead} />
        <Reveal delay={0.1} className="relative mt-12">
          <div className="glass relative rounded-[36px] p-2.5 md:p-3">
            <div className="flex items-center gap-3 rounded-[28px] bg-fg/5 px-5 inner-glow md:px-7">
              <Icon name="search" size={22} className="shrink-0 subtle" />
              <label htmlFor="quick-search" className="sr-only">{search.inputLabel}</label>
              <input
                ref={input}
                id="quick-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                placeholder={search.placeholder}
                autoComplete="off"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `sr-${results[active].key}` : undefined}
                aria-describedby="search-hint"
                className="h-16 min-w-0 flex-1 bg-transparent font-display text-lg outline-none placeholder:text-fg/70 md:h-[72px] md:text-xl"
              />
              {query ? (
                <button type="button" onClick={() => { setQuery(''); input.current?.focus() }} className="label rounded-full hairline px-3 py-1.5 hover:bg-fg/10">{search.clear}</button>
              ) : (
                <span id="search-hint" className="label hidden items-center gap-2 subtle sm:flex">
                  {search.hint.split('/')[0]}<kbd className="rounded-md bg-fg/10 px-2 py-0.5">/</kbd>{search.hint.split('/')[1]}
                </span>
              )}
            </div>

            <AnimatePresence initial={false}>
              {query.trim() && (
                <motion.div key="results" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: ease.out }} className="overflow-hidden">
                  <p className="label px-5 pb-1 pt-4 subtle" aria-live="polite">{search.resultCount(results.length, allFeatures.length)}</p>
                  {results.length > 0 ? (
                    <ul id="search-results" role="listbox" aria-label={search.inputLabel} className="grid gap-1.5 p-2 sm:grid-cols-2">
                      <AnimatePresence>
                        {results.map((r, i) => (
                          <motion.li
                            layout
                            key={r.key}
                            id={`sr-${r.key}`}
                            role="option"
                            aria-selected={i === active}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.35, ease: ease.out, delay: i * 0.03 }}
                            onMouseEnter={() => setActive(i)}
                            onClick={() => jump(r.key)}
                            className={cn('flex cursor-pointer items-center gap-4 rounded-[22px] px-4 py-3 transition-colors', i === active ? 'bg-fg text-bg' : 'hover:bg-fg/8')}
                          >
                            <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-2xl', i === active ? 'bg-bg/15' : 'bg-fg/10')}>
                              <Icon name="spark" size={18} />
                            </span>
                            <span className="flex-1">
                              <span className="block font-semibold">{r.title}</span>
                              <span className="label text-[10px] subtle">{r.tag}</span>
                            </span>
                            <Icon name="arrow-down" size={16} className="subtle" />
                            <span className="sr-only">{search.jump}</span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5 px-5 py-6">
                      <svg viewBox="0 0 60 60" className="h-14 w-14 shrink-0" aria-hidden>
                        <circle cx="26" cy="26" r="16" fill="none" strokeWidth="5" style={{ stroke: 'var(--fg)', opacity: 0.4 }} />
                        <path d="M38 38l12 12" strokeWidth="6" strokeLinecap="round" style={{ stroke: 'var(--fg)', opacity: 0.4 }} />
                        <path d="M20 30q6-6 12 0" fill="none" strokeWidth="3" strokeLinecap="round" style={{ stroke: 'var(--fg)' }} />
                      </svg>
                      <div>
                        <p className="font-display text-lg font-semibold">{search.empty.title}</p>
                        <p className="text-muted text-sm">{search.empty.body}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="label mr-1 subtle">{search.suggestionsLabel}</span>
            {search.suggestions.map((s) => (
              <button key={s} type="button" onClick={() => setQuery(s)} className={cn('rounded-full px-4 py-2 text-sm font-semibold transition', query === s ? 'bg-fg text-bg' : 'hairline hover:bg-fg/10')}>
                {s}
              </button>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
