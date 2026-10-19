import { AnimatePresence, motion } from 'framer-motion'
import { features, type Tone } from '../../content'
import { motionCfg } from '../../motion'
import { cn } from '../../lib/utils'
import { FeatureAnim } from '../art/Micro'
import { TiltCard } from '../ui/Interactive'
import { CountUp } from '../ui/Numbers'
import { Chip, Container, Eyebrow, Note, Reveal, Section, SectionHeading } from '../ui/primitives'
import { SplitText } from '../ui/SplitText'
import { matches } from './TrustSearch'

const cardTones: Tone[] = ['c1', 'c2', 'c3', 'c1', 'c2', 'c3', 'c2', 'c1']

/* ---------------------------------- Bento --------------------------------- */

function Bento({ query }: { query: string }) {
  const visible = (it: Parameters<typeof matches>[1]) => matches(query, it)
  const count = [...features.highlights, ...features.items].filter(visible).length
  return (
    <>
      <AnimatePresence>
        {query.trim() && (
          <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="label mt-10 subtle" aria-live="polite">
            {features.filterBanner(count, query.trim())}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {features.highlights.map((h, i) => {
          const on = visible(h)
          return (
            <Reveal key={h.key} delay={i * 0.08} className={cn('sm:col-span-2 lg:col-span-6', i === 1 && 'lg:translate-y-10')}>
              <TiltCard id={`feature-${h.key}`} cursor="View" className={cn('h-full min-h-[340px] rounded-[36px] p-7 clay transition-[opacity,filter] duration-500 md:p-9', i === 0 ? 'tone-c1' : 'tone-c3', !on && 'opacity-25 grayscale')}>
                <div aria-hidden className="absolute inset-0 dot-grid opacity-40" />
                <div aria-hidden className={cn('absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-60', i === 0 ? 'bg-[radial-gradient(circle,var(--c3),transparent_70%)]' : 'bg-[radial-gradient(circle,var(--c4),transparent_70%)] opacity-25')} />
                <div className="relative flex h-full flex-col">
                  <Chip className="self-start">{h.tag}</Chip>
                  <div className="my-6 h-40 md:h-48"><FeatureAnim kind={h.anim} /></div>
                  <h3 className="display-md mt-auto max-w-sm">{h.title}</h3>
                  <p className="text-muted mt-3 max-w-md leading-relaxed">{h.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
        {features.items.map((f, i) => {
          const on = visible(f)
          return (
            <Reveal key={f.key} delay={(i % 4) * motionCfg.stagger.cards} className={cn('lg:col-span-3', i % 4 === 1 && 'lg:translate-y-6', i % 4 === 3 && 'lg:-translate-y-4')}>
              <TiltCard id={`feature-${f.key}`} cursor="View" className={cn(`tone-${cardTones[i]}`, 'flex h-full min-h-[260px] flex-col rounded-[30px] p-6 clay transition-[opacity,filter] duration-500', !on && 'opacity-25 grayscale')}>
                <div className="flex items-center justify-between">
                  <Chip>{f.tag}</Chip>
                  <span className="label text-[10px] subtle">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="my-5 h-24"><FeatureAnim kind={f.anim} /></div>
                <h3 className="mt-auto font-display text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="text-muted mt-1.5 text-sm leading-relaxed">{f.body}</p>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}

/* ------------------------------ Benefits block ---------------------------- */

function Benefits() {
  const b = features.benefits
  return (
    <div className="mt-28 grid items-center gap-12 md:mt-36 md:grid-cols-12">
      <Reveal className="md:col-span-5">
        <div className="dashed-frame relative rounded-[40px] p-4">
          <div className="tone-c3 relative aspect-[4/4.4] overflow-hidden rounded-[30px]">
            <img src={b.image} alt={b.imageAlt} width={818} height={900} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
          <span className="glass label absolute -right-3 top-10 rotate-6 rounded-full px-4 py-2">{b.items[0].title}</span>
          <span className="glass label absolute -left-4 bottom-16 -rotate-6 rounded-full px-4 py-2">{b.items[2].title}</span>
        </div>
      </Reveal>
      <div className="md:col-span-6 md:col-start-7">
        <Reveal><Eyebrow>{b.eyebrow}</Eyebrow></Reveal>
        <SplitText text={b.title} className="display-lg mt-5" />
        <ul className="mt-10 space-y-6">
          {b.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.1} className="group flex gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-fg text-bg transition-transform duration-500 ease-soft group-hover:-rotate-6 group-hover:scale-110">
                <img src={it.icon} alt="" width={30} height={30} loading="lazy" className="h-[30px] w-[30px]" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold">{it.title}</h3>
                <p className="text-muted mt-1 max-w-md leading-relaxed">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ---------------------------------- Stats --------------------------------- */

function Stats() {
  return (
    <div className="mt-24">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {features.stats.items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className={cn('relative overflow-hidden rounded-[30px] p-6 md:p-8', i % 2 ? 'tone-c2' : 'tone-c1')}>
            <div aria-hidden className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full border-[14px] border-[color-mix(in_srgb,var(--c4)_10%,transparent)]" />
            <dt className="label subtle">{s.label}</dt>
            <dd className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
      <Note className="mt-3 block">{features.stats.note}</Note>
    </div>
  )
}

export function Features({ query }: { query: string }) {
  return (
    <Section id={features.id} tone={features.tone} label={features.label} className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={features.eyebrow} title={features.title} lead={features.lead} />
        <Bento query={query} />
        <Benefits />
        <Stats />
      </Container>
    </Section>
  )
}
