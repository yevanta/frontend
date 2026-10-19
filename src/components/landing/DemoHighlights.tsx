import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { demo, highlights, ui } from '../../content'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/Icon'
import { Carousel, TiltCard } from '../ui/Interactive'
import { RollingNumber } from '../ui/Numbers'
import { Chip, Container, Reveal, Section, SectionHeading } from '../ui/primitives'

/* ------------------------ Price-position simulator ------------------------ */

const fmt = (v: number) => `${demo.currency}${v.toFixed(2)}`

export function DemoStrip() {
  const pr = demo.price
  const L = demo.labels
  const [price, setPrice] = useState(pr.initial)

  const model = useMemo(() => {
    const prices = demo.competitors.map((c) => c.price)
    const lo = Math.min(...prices)
    const hi = Math.max(...prices)
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length
    const position = price < lo ? L.below : price > hi ? L.above : L.within
    const diff = ((price - avg) / avg) * 100
    const breach = price < demo.marginFloor.value
    return { lo, hi, position, diff, breach }
  }, [price, L])

  const W = 560, H = 210, pad = 30
  const x = (v: number) => pad + ((v - pr.min) / (pr.max - pr.min)) * (W - pad * 2)
  const pct = ((price - pr.min) / (pr.max - pr.min)) * 100
  const diffText = `${model.diff >= 0 ? '+' : '−'}${Math.abs(model.diff).toFixed(1)}%`
  const mono = '500 10px JetBrains Mono, monospace'

  return (
    <Section id={demo.id} tone={demo.tone} label={demo.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={demo.eyebrow} title={demo.title} lead={demo.lead} />
        <Reveal delay={0.1} className="mt-12">
          <div className="glass relative grid gap-6 overflow-hidden rounded-[40px] p-5 md:grid-cols-12 md:p-8">
            <span className="label absolute right-5 top-5 z-10 rounded-full bg-fg px-3 py-1.5 text-bg md:right-8 md:top-8">{demo.badge}</span>

            <div className="space-y-6 pt-10 md:col-span-5 md:pt-2 lg:col-span-4">
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="demo-price" className="text-sm font-semibold">{pr.label}</label>
                  <span className="font-display text-2xl font-semibold tabular-nums">{fmt(price)}</span>
                </div>
                <input
                  id="demo-price" type="range" className="range mt-2"
                  min={pr.min} max={pr.max} step={pr.step} value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  style={{ ['--p' as string]: `${pct}%` }} data-cursor={ui.cursor.drag}
                  aria-valuetext={`${fmt(price)}: ${model.position}. ${model.breach ? L.floorBreach : L.floorOk}`}
                />
              </div>

              <div className="space-y-2.5" aria-live="polite">
                <div className="flex items-center gap-3 rounded-2xl hairline px-4 py-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fg text-bg"><Icon name="chart" size={15} /></span>
                  <div>
                    <p className="label text-[10px] subtle">{L.position}</p>
                    <motion.p key={model.position} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-semibold">{model.position}</motion.p>
                  </div>
                </div>
                <div className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors duration-300', model.breach ? 'bg-c1 text-c4' : 'hairline')}>
                  <motion.span key={String(model.breach)} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full', model.breach ? 'bg-[var(--c3d)] text-c4' : 'bg-fg text-bg')}>
                    <Icon name={model.breach ? 'x' : 'check'} size={15} strokeWidth={2.4} />
                  </motion.span>
                  <div>
                    <p className="label text-[10px] subtle">{L.floor} · {fmt(demo.marginFloor.value)}</p>
                    <p className="font-semibold">{model.breach ? L.floorBreach : L.floorOk}</p>
                  </div>
                </div>
              </div>

              <div className="tone-c1 rounded-[24px] p-4">
                <p className="label text-[10px] subtle">{L.vsAverage}</p>
                <p className="mt-2 font-display text-3xl font-semibold"><RollingNumber value={diffText} /></p>
              </div>
            </div>

            <figure className="tone-c1 relative flex flex-col justify-center overflow-hidden rounded-[30px] p-4 md:col-span-7 md:p-6 lg:col-span-8">
              <div aria-hidden className="absolute inset-0 line-grid opacity-60" />
              <svg viewBox={`0 0 ${W} ${H}`} className="relative h-auto w-full overflow-visible" role="img" aria-label={`${L.chart}. ${demo.badge}.`}>
                <defs>
                  <pattern id="floor-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="8" height="8" style={{ fill: 'var(--c3)', opacity: 0.35 }} />
                    <rect width="3" height="8" style={{ fill: 'var(--c3)', opacity: 0.8 }} />
                  </pattern>
                </defs>
                {/* margin-floor zone */}
                <rect x={pad} y={40} width={x(demo.marginFloor.value) - pad} height={110} rx={12} fill="url(#floor-hatch)" />
                <line x1={x(demo.marginFloor.value)} x2={x(demo.marginFloor.value)} y1={30} y2={160} strokeWidth="2" strokeDasharray="4 5" style={{ stroke: 'var(--c4)', opacity: 0.8 }} />
                <text x={x(demo.marginFloor.value) - 6} y={26} textAnchor="end" style={{ fill: 'var(--c4)', font: mono, letterSpacing: '0.08em' }}>{L.floor.toUpperCase()}</text>
                {/* competitor range */}
                <rect x={x(model.lo)} y={70} width={x(model.hi) - x(model.lo)} height={50} rx={25} style={{ fill: 'var(--c4)', opacity: 0.1 }} />
                {/* axis */}
                <line x1={pad} x2={W - pad} y1={95} y2={95} strokeWidth="3" strokeLinecap="round" style={{ stroke: 'var(--c4)', opacity: 0.25 }} />
                {[pr.min, (pr.min + pr.max) / 2, pr.max].map((t) => (
                  <text key={t} x={x(t)} y={190} textAnchor="middle" style={{ fill: 'var(--c4)', opacity: 0.6, font: mono }}>{fmt(t)}</text>
                ))}
                {/* competitors */}
                {demo.competitors.map((c, i) => (
                  <g key={c.name} transform={`translate(${x(c.price)} 95)`}>
                    <line y1={-22} y2={22} strokeWidth="2" style={{ stroke: 'var(--c4)', opacity: 0.6 }} />
                    <circle r={7} style={{ fill: 'var(--c2)', stroke: 'var(--c4)', strokeWidth: 2 }} />
                    <text y={i % 2 ? 44 : -30} textAnchor="middle" style={{ fill: 'var(--c4)', font: '600 11px Manrope, sans-serif' }}>{c.name} · {fmt(c.price)}</text>
                  </g>
                ))}
                {/* your price */}
                <motion.g initial={false} animate={{ x: x(price) }} transition={{ type: 'spring', stiffness: 260, damping: 26 }}>
                  <line y1={58} y2={132} strokeWidth="3" style={{ stroke: model.breach ? 'var(--c3)' : 'var(--c4)' }} />
                  <circle cy={95} r={13} style={{ fill: model.breach ? 'var(--c3)' : 'var(--c4)', stroke: 'var(--c1)', strokeWidth: 3 }} />
                  <rect x={-26} y={140} width={52} height={22} rx={11} style={{ fill: 'var(--c4)' }} />
                  <text y={155} textAnchor="middle" style={{ fill: 'var(--c1)', font: '700 11px Manrope, sans-serif' }}>{L.you}</text>
                </motion.g>
              </svg>
              <p className="label relative mt-3 text-[10px] leading-relaxed subtle">{demo.disclaimer}</p>
            </figure>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* -------------------------------- Highlights ------------------------------ */

export function Highlights() {
  const tones = ['tone-c3', 'tone-c2', 'tone-c4', 'tone-c2']
  return (
    <Section id={highlights.id} tone={highlights.tone} label={highlights.label} className="overflow-hidden py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={highlights.eyebrow} title={highlights.title} lead={highlights.lead} aside={<p className="label mt-4 subtle">↔ {highlights.dragHint}</p>} />
        <div className="mt-10">
          <Carousel label={highlights.label} itemClassName="w-[82vw] max-w-[380px] shrink-0">
            {highlights.cards.map((c, i) => (
              <TiltCard key={c.title} className={cn(tones[i], 'group flex h-full flex-col rounded-[34px] p-3 clay')} tilt={false}>
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-[26px] bg-[color-mix(in_srgb,var(--fg)_8%,transparent)]">
                  <img src={c.image} alt={c.alt} width={818} height={900} loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between"><Chip>{c.tag}</Chip><span className="label subtle">0{i + 1}</span></div>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="text-muted mt-3 text-sm leading-relaxed">{c.body}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-[color-mix(in_srgb,var(--fg)_14%,transparent)] pt-4">
                    {c.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm font-semibold">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-fg/15"><Icon name="check" size={11} strokeWidth={3} /></span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </Carousel>
        </div>
      </Container>
    </Section>
  )
}
