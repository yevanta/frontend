import { useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { finalCta, governance, plans, pricing, productFaq, ui, useCases } from '../../content'
import { ease } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { cn } from '../../lib/utils'
import { UseCaseArt } from '../art/Scenes'
import { Icon } from '../ui/Icon'
import { Accordion } from '../ui/Interactive'
import { MagneticButton, UnderlineLink } from '../ui/MagneticButton'
import { Container, Note, Reveal, Section, SectionHeading } from '../ui/primitives'
import { SplitText } from '../ui/SplitText'

/* ------------------------------- Governance ------------------------------- */

const hoverFx = [
  'group-hover:-translate-y-1 group-hover:rotate-[-8deg]',
  'group-hover:scale-110 group-hover:-rotate-6',
  'group-hover:scale-125',
  'group-hover:-translate-y-1.5',
  'group-hover:rotate-[-45deg]',
  'group-hover:translate-x-1',
  'group-hover:scale-x-125',
  'group-hover:rotate-[20deg] group-hover:scale-110',
]

export function Governance() {
  const s = governance
  return (
    <Section id={s.id} tone={s.tone} label={s.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {s.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.07} className={cn(i < 2 ? 'lg:col-span-3' : 'lg:col-span-2', i === 4 && 'sm:col-span-2 lg:col-span-2')}>
              <div className={cn('group relative h-full overflow-hidden rounded-[30px] p-6 transition-transform duration-500 ease-soft hover:-translate-y-1', i % 3 === 0 ? 'tone-c1' : 'glass')}>
                <div aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--c3)_60%,transparent),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative grid h-14 w-14 place-items-center rounded-[20px] bg-fg/10">
                  <Icon name={it.icon} size={24} className={cn('transition-transform duration-700 ease-soft', hoverFx[i])} />
                </span>
                <h3 className="relative mt-8 font-display text-lg font-semibold">{it.title}</h3>
                <p className="text-muted relative mt-2 text-sm leading-relaxed">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/* -------------------------------- Use cases ------------------------------- */

function UseCaseCard({ item, i }: { item: (typeof useCases.items)[number]; i: number }) {
  const { rich } = usePrefs()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })
  const layer = (d: number) => ({ x: useTransform(sx, (v) => v * d), y: useTransform(sy, (v) => v * d) })
  const back = layer(-8), mid = layer(10), front = layer(22)
  const move = (e: PointerEvent<HTMLElement>) => {
    if (!rich) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <article onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0) }} data-cursor={ui.cursor.view}
      className={cn('group flex h-full flex-col overflow-hidden rounded-[36px] p-3 clay', ['tone-c3', 'tone-c2', 'tone-c4'][i])}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-fg/6">
        <div aria-hidden className="absolute inset-0 dot-grid opacity-40" />
        <motion.div style={back} className="absolute inset-[-6%]"><UseCaseArt variant={item.art} layer="back" label={item.alt} /></motion.div>
        <motion.div style={mid} className="absolute inset-0"><UseCaseArt variant={item.art} layer="mid" label={item.alt} /></motion.div>
        <motion.div style={front} className="absolute inset-0 transition-transform duration-700 ease-soft group-hover:scale-105"><UseCaseArt variant={item.art} layer="front" label={item.alt} /></motion.div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="label subtle">0{i + 1}</p>
        <h3 className="display-md mt-2">{item.title}</h3>
        <p className="text-muted mt-3 flex-1 leading-relaxed">{item.scenario}</p>
        <div className="mt-6"><UnderlineLink to={useCases.link.to}>{useCases.link.label}</UnderlineLink></div>
      </div>
    </article>
  )
}

export function UseCases() {
  return (
    <Section id={useCases.id} tone={useCases.tone} label={useCases.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={useCases.eyebrow} title={useCases.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {useCases.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.1} className={cn(i === 1 && 'md:translate-y-12')}>
              <UseCaseCard item={it} i={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* --------------------------------- Plans ---------------------------------- */

export function Plans() {
  return (
    <Section id={plans.id} tone={plans.tone} label={plans.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={plans.eyebrow} title={plans.title} aside={<div className="mt-4"><UnderlineLink to={plans.link.to}>{plans.link.label}</UnderlineLink></div>} />
        <ul className="mt-12 divide-y divide-[color-mix(in_srgb,var(--fg)_16%,transparent)] overflow-hidden rounded-[36px] glass">
          {pricing.tiers.map((t, i) => (
            <Reveal as="li" key={t.key} delay={i * 0.08} className="group relative">
              <div className="relative grid items-center gap-4 p-6 transition-colors duration-500 group-hover:bg-fg/6 md:grid-cols-12 md:p-8">
                <div className="flex items-center gap-4 md:col-span-4">
                  <span className="font-display text-3xl font-semibold">{t.name}</span>
                  {t.popular && <span className="label rounded-full bg-fg px-2.5 py-1 text-[10px] text-bg">{t.popular}</span>}
                </div>
                <div className="md:col-span-5">
                  <p className="text-muted">{t.desc}</p>
                  <p className="mt-2 text-sm font-semibold"><span className="label mr-2 text-[9px] subtle">{pricing.basisLabel}</span>{t.basis}</p>
                </div>
                <p className="md:col-span-3 md:text-right">
                  {t.amount ? (
                    <><span className="font-display text-3xl font-semibold">{t.amount}</span> {pricing.pricePeriod && <span className="text-muted text-sm">{pricing.pricePeriod}</span>}</>
                  ) : (
                    <span className="font-display text-2xl font-semibold">{pricing.priceLabel}</span>
                  )}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Note className="mt-4 block">{pricing.note}</Note>
      </Container>
    </Section>
  )
}

/* ------------------------------ Product FAQ ------------------------------- */

export function ProductFaq() {
  const [open, setOpen] = useState(0)
  return (
    <Section id={productFaq.id} tone={productFaq.tone} label={productFaq.label} className="py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading layout="stack" eyebrow={productFaq.eyebrow} title={productFaq.title} />
        </div>
        <Reveal className="lg:col-span-8"><Accordion items={productFaq.items} open={open} onChange={setOpen} idPrefix="pfaq" /></Reveal>
      </Container>
    </Section>
  )
}

/* -------------------------------- Final CTA ------------------------------- */

export function FinalCta() {
  const f = finalCta
  return (
    <Section id={f.id} tone={f.tone} label={f.label} className="py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: ease.out }}
          className="tone-c1 relative isolate overflow-hidden rounded-[44px] px-6 py-20 text-center clay md:px-16 md:py-28"
        >
          {/* moving gradient mesh */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute -left-1/4 -top-1/2 h-[140%] w-[80%] animate-drift rounded-full bg-[radial-gradient(circle,var(--c3),transparent_62%)] opacity-80" />
            <div className="absolute -right-1/4 top-0 h-[120%] w-[70%] animate-drift-2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--c4)_45%,transparent),transparent_60%)]" />
            <div className="absolute bottom-[-60%] left-1/4 h-[120%] w-[60%] animate-drift rounded-full bg-[radial-gradient(circle,var(--c2),transparent_62%)] [animation-delay:-9s]" />
            <div className="absolute inset-0 dot-grid opacity-40" />
          </div>
          <SplitText text={f.title} className="display-xl mx-auto max-w-4xl" />
          <p className="text-muted mx-auto mt-6 max-w-lg text-lg">{f.body}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton to={f.primary.to} size="lg" cursor={ui.cursor.open}>{f.primary.label}</MagneticButton>
            <MagneticButton to={f.secondary.to} variant="ghost" size="lg" arrow={false}>{f.secondary.label}</MagneticButton>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
