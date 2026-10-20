import { useEffect, useState, type ComponentType, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight, CheckCircle2, ChevronRight, Code, Command, Database, Gauge, LineChart, Lock, Server, ShieldCheck, Sliders, Sparkles, TrendingUp, Zap,
} from 'lucide-react'
import { productPage as p } from '../content'
import { ease, motionCfg } from '../motion'
import { events } from '../lib/sections'
import { usePrefs } from '../lib/prefs'
import { cn } from '../lib/utils'
import { Reveal, Section } from '../components/ui/primitives'
import { SmartLink } from '../components/ui/SmartLink'
import { Deferred } from '../components/ui/Deferred'

type IconType = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
const icons: Record<string, IconType> = { database: Database, code: Code, zap: Zap, server: Server, chart: LineChart, lock: Lock }

/** "+12.4%" / "-3.1%": the sign always matches the value. */
const signed = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(1)}%`

/** Shared tab-panel swap (fade + rise), parameters from motion.ts. */
function Swap({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  const { reduced } = usePrefs()
  const { duration, y } = motionCfg.tabSwap
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        className={className}
        initial={reduced ? false : { opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -y }}
        transition={{ duration, ease: ease.out }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */

function QuickJumpHint() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(events.openPalette))}
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full border border-c4/15 bg-c2/90 px-4 py-2.5 font-mono text-xs shadow-2xl backdrop-blur-md transition-colors hover:border-c4/30 md:flex"
    >
      <span className="flex items-center gap-1 text-c4/80">
        <Command aria-hidden className="h-3.5 w-3.5 text-c3l" /> {p.quickJump.keys}
      </span>
      <span aria-hidden className="text-c4/30">|</span>
      <span className="text-c4/80">{p.quickJump.label}</span>
      <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-c4" />
    </button>
  )
}

function RotatingWord() {
  const { reduced } = usePrefs()
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % p.hero.rotating.length), motionCfg.productRolling.interval)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-block min-w-[280px] align-bottom">
      {/* screen readers get one stable word instead of a live-changing one */}
      <span className="sr-only">{p.hero.rotating[0]}.</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          aria-hidden
          className="inline-block bg-gradient-to-r from-c4 via-c3l to-c4 bg-clip-text pr-2 italic text-transparent"
          initial={reduced ? false : { opacity: 0, y: '0.35em', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduced ? undefined : { opacity: 0, y: '-0.35em', filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: ease.out }}
        >
          {p.hero.rotating[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ---------- 01 Hero ------------------------------------------------ */

function Hero() {
  const h = p.hero
  return (
    <Section id={h.id} tone="c1" label={h.label} className="flex min-h-[92vh] flex-col justify-between border-b border-c2/60 px-6 pb-16 pt-28 md:pt-32 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        {/* Top kicker header line */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-c2/40 pb-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-c3/40 bg-c2/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-c3l">{h.kicker.issue}</span>
            <span className="hidden font-mono text-xs text-c4/75 sm:inline">{h.kicker.partner}</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs text-c4/80">
            <span>{h.kicker.index}</span>
            <span aria-hidden className="text-c4/30">/</span>
            <span>{h.kicker.stream}</span>
          </div>
        </div>

        {/* Headline + lead article */}
        <div className="my-auto grid items-end gap-12 py-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-c4/15 bg-c2/60 px-3.5 py-1.5 font-mono text-xs text-c4">
                <Sparkles aria-hidden className="h-3.5 w-3.5 text-c3l" />
                <span>{h.badge}</span>
              </div>
            </Reveal>

            <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-c4 sm:text-6xl md:text-7xl lg:text-8xl">
              {h.titleLead} <br />
              <RotatingWord />
            </h1>

            <Reveal delay={0.1}>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-c4/85 md:text-xl">{h.body}</p>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-wrap items-center gap-4 pt-4">
              <SmartLink
                to={h.primary.to}
                className="group relative inline-flex items-center gap-3 rounded-full bg-c4 px-8 py-4 font-display text-sm font-bold text-c1 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
              >
                <span>{h.primary.label}</span>
                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </SmartLink>
              <SmartLink
                to={h.secondary.to}
                className="group inline-flex items-center gap-3 rounded-full border border-c4/20 bg-c2 px-8 py-4 font-display text-sm font-semibold text-c4 transition-all duration-300 hover:border-c3 hover:bg-c3/30"
              >
                <span>{h.secondary.label}</span>
                <ChevronRight aria-hidden className="h-4 w-4 text-c3l transition-transform group-hover:translate-x-0.5" />
              </SmartLink>
            </Reveal>
          </div>

          {/* Editorial data card */}
          <Reveal delay={0.25} className="space-y-6 rounded-3xl border border-c4/10 bg-c2/30 p-6 backdrop-blur-md md:p-8 lg:col-span-4">
            <div className="flex items-center justify-between border-b border-c2 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-c3l">{h.audit.title}</span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-c4">
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-c4/70" />
                  <span className="relative h-2 w-2 rounded-full bg-c4" />
                </span>
                {h.audit.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-display text-3xl font-bold text-c4">{h.audit.headline.value}</div>
                <div className="mt-1 font-mono text-xs text-c4/75">{h.audit.headline.label}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-c2/60 pt-2">
                {h.audit.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-xl font-semibold text-c4">{s.value}</div>
                    <div className="font-mono text-[11px] text-c4/75">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-c2 bg-c1 p-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-c4/75">{h.audit.bar.label}</span>
                <span className="text-c3l">{h.audit.bar.value}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-c2">
                <motion.div
                  className="h-full rounded-full bg-c3"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${h.audit.bar.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: ease.out, delay: 0.3 }}
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Sub-footer metadata grid */}
        <dl className="grid grid-cols-2 gap-6 border-t border-c2/40 pt-6 font-mono text-xs md:grid-cols-4">
          {h.meta.map((m) => (
            <div key={m.label}>
              <dt className="mb-1 text-c3l">{m.label}</dt>
              <dd className="text-c4">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

/* ---------- 02 Elasticity simulator (light section) --------------- */

function Simulator() {
  const s = p.simulator
  const [v, setV] = useState<Record<string, number>>(() => Object.fromEntries(s.sliders.map((x) => [x.key, x.initial])))
  const { basePrice, competitorPrice, inventoryLevel, demandElasticity } = v

  const priceDelta = ((basePrice - competitorPrice) / competitorPrice) * 100
  const optimal = Math.round(competitorPrice * (1 + (inventoryLevel > 50 ? 0.08 : -0.04) + (priceDelta < 0 ? 0.05 : -0.03)))
  const margin = ((optimal - basePrice) / basePrice) * 100 + 12.4
  const revenue = Math.abs(demandElasticity) * 4.8 + (optimal > basePrice ? 8.2 : 4.1)

  return (
    <Section id={s.id} tone="c4" label={s.label} className="bg-c4 px-6 py-24 text-c1 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-16">
        <Reveal className="flex flex-col justify-between gap-6 border-b border-c1/20 pb-8 md:flex-row md:items-end">
          <div className="space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-c3d">{s.eyebrow}</span>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{s.title}</h2>
          </div>
          <p className="max-w-md text-sm text-c1/85 md:text-base">{s.lead}</p>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Control panel */}
          <Reveal className="space-y-8 rounded-3xl bg-c4 p-8 shadow-[0_30px_70px_-30px_var(--c1)] ring-1 ring-c1/15 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-c1/10 pb-4">
              <span className="flex items-center gap-2 font-display text-sm font-bold text-c1">
                <Sliders aria-hidden className="h-4 w-4 text-c3d" /> {s.panel.title}
              </span>
              <span className="font-mono text-xs text-c1/75">{s.panel.tag}</span>
            </div>

            {s.sliders.map((x) => (
              <div key={x.key} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <label htmlFor={`sim-${x.key}`} className="text-c1">{x.label}</label>
                  <span className="font-mono font-medium tabular-nums text-c3d">{x.prefix}{v[x.key]}{x.suffix}</span>
                </div>
                <input
                  id={`sim-${x.key}`}
                  type="range"
                  min={x.min}
                  max={x.max}
                  step={x.step}
                  value={v[x.key]}
                  onChange={(e) => setV((o) => ({ ...o, [x.key]: Number(e.target.value) }))}
                  className="w-full cursor-pointer accent-c3"
                />
                <div className="flex justify-between font-mono text-[10px] text-c1/75" aria-hidden>
                  <span>{x.minLabel}</span>
                  <span>{x.maxLabel}</span>
                </div>
              </div>
            ))}
          </Reveal>

          {/* Output matrix */}
          <Reveal delay={0.1} className="space-y-8 rounded-3xl border border-c2 bg-c1 p-8 text-c4 shadow-2xl lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-c2 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-c3l">{s.output.title}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-c3/60 bg-c3/30 px-3 py-1 font-mono text-xs text-c4">
                <Gauge aria-hidden className="h-3.5 w-3.5 text-c4" /> {s.output.badge}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2" aria-live="polite">
              <div className="rounded-2xl border border-c4/10 bg-c2/40 p-6">
                <div className="mb-1 font-mono text-xs text-c4/75">{s.output.recommended.label}</div>
                <div className="font-display text-4xl font-bold tabular-nums text-c4">${optimal}</div>
                <div className="mt-2 flex items-center gap-1 font-mono text-xs text-c4">
                  <TrendingUp aria-hidden className="h-3.5 w-3.5" /> {s.output.recommended.note}
                </div>
              </div>
              <div className="rounded-2xl border border-c4/10 bg-c2/40 p-6">
                <div className="mb-1 font-mono text-xs text-c4/75">{s.output.variance.label}</div>
                <div className="font-display text-4xl font-bold tabular-nums text-c4">{signed(priceDelta)}</div>
                <div className="mt-2 font-mono text-xs text-c4/75">{s.output.variance.note}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-c2 pt-4">
              <div className="space-y-1">
                <div className="font-mono text-xs text-c4/75">{s.output.margin}</div>
                <div className="font-display text-2xl font-semibold tabular-nums text-c4">{signed(margin)}</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs text-c4/75">{s.output.revenue}</div>
                <div className="font-display text-2xl font-semibold tabular-nums text-c4">{signed(revenue)}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-c3/50 bg-c3/25 p-4 font-mono text-xs leading-relaxed text-c4/90">
              <Sparkles aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-c4" />
              <div>
                <strong className="font-medium text-c4">{s.output.insightTitle}</strong>
                {s.output.insight(inventoryLevel, demandElasticity)}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/* ---------- 03 NVIDIA SDK matrix ---------------------------------- */

/** One SDK paragraph: optional bold lead-in, text, optional inline code and trailing text. */
type Para = { strong?: string; text: string; code?: string; after?: string }

function Sdk() {
  const s = p.sdk
  const [active, setActive] = useState(s.tabs[0].id)
  const tab = s.tabs.find((t) => t.id === active) ?? s.tabs[0]
  return (
    <Section id={s.id} tone="c1" label={s.label} className="border-b border-c2/60 px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-16">
        <Reveal className="max-w-3xl space-y-4">
          <span className="inline-block rounded-full border border-c3/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-c3l">{s.eyebrow}</span>
          <h2 className="font-display text-3xl font-bold leading-tight text-c4 sm:text-5xl">{s.title}</h2>
          <p className="text-lg font-light text-c4/80">{s.lead}</p>
        </Reveal>

        {/* SDK tabs */}
        <div role="tablist" aria-label={s.label} className="flex flex-wrap gap-3 border-b border-c2/80 pb-4 font-mono text-xs">
          {s.tabs.map((t) => {
            const Icon = icons[t.icon]
            const on = t.id === active
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`sdk-tab-${t.id}`}
                aria-selected={on}
                aria-controls="sdk-panel"
                onClick={() => setActive(t.id)}
                className={cn(
                  'flex items-center gap-2.5 rounded-2xl px-5 py-3 transition-all duration-300',
                  on ? 'border border-c3 bg-c3d font-medium text-c4 shadow-lg' : 'bg-c2/40 text-c4/80 hover:bg-c2 hover:text-c4',
                )}
              >
                <Icon aria-hidden className="h-4 w-4" />
                <span>{t.name}</span>
              </button>
            )
          })}
        </div>

        {/* Active tab detail */}
        <div className="grid items-center gap-8 rounded-3xl border border-c2/80 bg-c2/20 p-6 backdrop-blur-md md:p-8 lg:grid-cols-12">
          <div id="sdk-panel" role="tabpanel" aria-labelledby={`sdk-tab-${tab.id}`} className="lg:col-span-7">
            <Swap id={tab.id} className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-c3/40 bg-c3/10 px-3 py-1 font-mono text-xs text-c3l">{tab.tag}</div>
              <h3 className="font-display text-2xl font-bold text-c4">{tab.title}</h3>
              <div className="space-y-4 text-sm font-light leading-relaxed text-c4/85">
                {(tab.paragraphs as Para[]).map((para, i) => (
                  <p key={i}>
                    {para.strong && <strong className="font-semibold text-c4">{para.strong}</strong>}
                    {para.text}
                    {para.code && <code className="font-mono text-c3l">{para.code}</code>}
                    {para.after}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs">
                {tab.stats.map((st) => (
                  <div key={st.label} className="rounded-xl border border-c2 bg-c1 p-3">
                    <div className="text-c3l">{st.label}</div>
                    <div className="mt-1 text-xl font-medium text-c4">{st.value}</div>
                  </div>
                ))}
              </div>
            </Swap>
          </div>

          {/* Architecture diagram */}
          <div className="space-y-4 rounded-2xl border border-c2 bg-c1 p-6 font-mono text-xs lg:col-span-5">
            <div className="flex items-center justify-between border-b border-c2 pb-2 text-c4/75">
              <span>{s.diagram.title}</span>
              <span aria-hidden className="h-2 w-2 rounded-full bg-c4" />
            </div>
            <ol className="space-y-3">
              {s.diagram.steps.map((st, i) =>
                'arrow' in st ? (
                  <li key={i} className="text-center text-c3l">{st.arrow}</li>
                ) : (
                  <li key={i} className={cn('rounded-xl border p-3 text-center', 'accent' in st && st.accent ? 'border-c3/60 bg-c3/20' : 'border-c4/10 bg-c2/40')}>
                    <div className={cn('mb-1 text-[10px]', 'accent' in st && st.accent ? 'text-c4' : 'text-c3l')}>{st.label}</div>
                    <div className="font-medium text-c4">{st.value}</div>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------- 04 Benchmarks ----------------------------------------- */

type Tier = 'cpu' | 'a100' | 'h100'

function Benchmarks() {
  const b = p.benchmarks
  const [tier, setTier] = useState<Tier>(b.initialTier as Tier)
  const activeStyle: Record<Tier, string> = { cpu: 'bg-c2 font-medium text-c4', a100: 'bg-c3d font-medium text-c4', h100: 'bg-c4 font-medium text-c1 shadow-md' }
  return (
    <Section id={b.id} tone="c1" label={b.label} className="border-b border-c2/60 bg-c2/10 px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-12">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-c3l">{b.eyebrow}</span>
            <h2 className="font-display text-3xl font-bold text-c4 md:text-5xl">{b.title}</h2>
          </div>

          {/* Hardware tier selector */}
          <div role="group" aria-label={b.title} className="flex shrink-0 flex-wrap rounded-3xl border border-c2 bg-c1 p-1.5 font-mono text-xs sm:flex-nowrap sm:rounded-full">
            {b.tiers.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={tier === t.id}
                onClick={() => setTier(t.id as Tier)}
                className={cn('whitespace-nowrap rounded-full px-4 py-2 transition-all', tier === t.id ? activeStyle[t.id as Tier] : 'text-c4/75 hover:text-c4')}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-6 font-mono md:grid-cols-3" aria-live="polite">
          {b.cards.map((c, i) => (
            <Reveal key={c.label} delay={i * motionCfg.stagger.cards} className="space-y-4 rounded-3xl border border-c2 bg-c1 p-6">
              <div className="text-xs text-c3l">{c.label}</div>
              <Swap id={tier}>
                <div className="font-display text-4xl font-bold text-c4">{c.values[tier]}</div>
                <p className="mt-4 font-sans text-xs leading-relaxed text-c4/75">{c.notes[tier]}</p>
              </Swap>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-c2 bg-c2/30 p-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck aria-hidden className="h-5 w-5 text-c3l" />
            <span className="text-c4/85">{b.footnote}</span>
          </div>
          <SmartLink to={b.docLink.to} className="text-c4 underline underline-offset-4 transition-colors hover:text-c3l">
            {b.docLink.label}
          </SmartLink>
        </div>
      </div>
    </Section>
  )
}

/* ---------- 05 Capabilities --------------------------------------- */

function Capabilities() {
  const c = p.capabilities
  const [active, setActive] = useState(c.tabs[0].id)
  const tab = c.tabs.find((t) => t.id === active) ?? c.tabs[0]
  const Icon = icons[tab.icon]
  return (
    <Section id={c.id} tone="c1" label={c.label} className="border-b border-c2/60 px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-16">
        <Reveal className="flex flex-col justify-between gap-6 border-b border-c2/40 pb-8 md:flex-row md:items-end">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-c3l">{c.eyebrow}</span>
            <h2 className="font-display text-3xl font-bold text-c4 md:text-5xl">{c.title}</h2>
          </div>
          <p className="max-w-md text-sm font-light text-c4/80">{c.lead}</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-12">
          <div role="tablist" aria-label={c.label} aria-orientation="vertical" className="space-y-3 lg:col-span-4">
            {c.tabs.map((t) => {
              const on = t.id === active
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`cap-tab-${t.id}`}
                  aria-selected={on}
                  aria-controls="cap-panel"
                  onClick={() => setActive(t.id)}
                  className={cn(
                    'w-full rounded-2xl border p-6 text-left transition-all',
                    on ? 'border-c3 bg-c2 text-c4 shadow-xl' : 'border-c2/60 bg-c1 text-c4/80 hover:bg-c2/30',
                  )}
                >
                  <div className="font-display text-base font-bold text-c4">{t.title}</div>
                  <div className="mt-1 text-xs text-c4/75">{t.desc}</div>
                </button>
              )
            })}
          </div>

          <div id="cap-panel" role="tabpanel" aria-labelledby={`cap-tab-${tab.id}`} className="rounded-3xl border border-c2 bg-c2/20 p-8 md:p-10 lg:col-span-8">
            <Swap id={tab.id} className="space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-c3 bg-c3/30 text-c4">
                <Icon aria-hidden className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-c4">{tab.heading}</h3>
              <p className="font-light leading-relaxed text-c4/85">{tab.body}</p>
              <ul className="space-y-3 font-mono text-xs text-c4/90">
                {tab.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <CheckCircle2 aria-hidden className="h-4 w-4 shrink-0 text-c3l" /> {pt}
                  </li>
                ))}
              </ul>
            </Swap>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------- 06 Onboarding ----------------------------------------- */

function Onboarding() {
  const o = p.onboarding
  return (
    <Section id={o.id} tone="c1" label={o.label} className="px-6 py-24 lg:px-16">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-c4/20 bg-gradient-to-br from-c2 to-c1 p-8 shadow-2xl sm:p-12 md:p-20">
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-c3/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl space-y-8">
          <span className="inline-block rounded-full border border-c3/40 bg-c1 px-3 py-1 font-mono text-xs uppercase tracking-widest text-c3l">{o.eyebrow}</span>
          <h2 className="font-display text-3xl font-bold leading-tight text-c4 sm:text-5xl md:text-6xl">{o.title}</h2>
          <p className="text-lg font-light leading-relaxed text-c4/85">{o.body}</p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <SmartLink
              to={o.primary.to}
              className="group inline-flex items-center gap-3 rounded-full bg-c4 px-8 py-4 font-display text-sm font-bold text-c1 shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <span>{o.primary.label}</span>
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </SmartLink>
            <SmartLink
              to={o.secondary.to}
              className="group inline-flex items-center gap-3 rounded-full bg-c3d px-8 py-4 font-display text-sm font-semibold text-c4 shadow-lg transition-all duration-300 hover:bg-c3"
            >
              <span>{o.secondary.label}</span>
              <ChevronRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </SmartLink>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-c2 pt-8 font-mono text-xs text-c4/75">
            {o.meta.map((m, i) => (
              <span key={m} className="flex items-center gap-6">
                {i > 0 && <span aria-hidden>•</span>}
                {m}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* ------------------------------------------------------------------ */

/** /product: client-supplied product page. Sections below the hero render after first paint. */
export default function Product() {
  return (
    <div className="relative bg-c1 font-sans text-c4 selection:bg-c3 selection:text-c4">
      {/* subtle dot texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(var(--c4)_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03]" />
      <QuickJumpHint />
      <Hero />
      <Deferred>
        <Simulator />
        <Sdk />
        <Benchmarks />
        <Capabilities />
        <Onboarding />
      </Deferred>
    </div>
  )
}
