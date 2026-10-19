import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { about } from '../../content'
import { ease } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { cn } from '../../lib/utils'
import { Container, Eyebrow, Reveal, Section } from '../ui/primitives'
import { SplitText } from '../ui/SplitText'

function MissionWord({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [i / n, (i + 1) / n], [0.18, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

function Mission() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = about.mission.split(' ')
  return (
    <div className="mt-24 md:mt-32">
      <p className="label subtle">{about.missionLabel}</p>
      <p ref={ref} className="mt-5 font-display text-[clamp(1.35rem,1rem+1.6vw,2.4rem)] font-medium leading-[1.15] tracking-tight">
        <span className="sr-only">{about.mission}</span>
        <span aria-hidden>{words.map((w, i) => <MissionWord key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />)}</span>
      </p>
    </div>
  )
}

function FoundedBadge() {
  return (
    <div className="tone-c4 absolute -top-8 right-0 h-28 w-28 rounded-full shadow-[0_20px_40px_-20px_var(--c1)] md:-right-8 md:h-36 md:w-36" aria-label={`${about.founded.label} ${about.founded.year}`} role="img">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs><path id="ring-path" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
        <text style={{ fill: 'var(--fg)', font: '500 6.4px JetBrains Mono, monospace', letterSpacing: '0.12em' }}>
          <textPath href="#ring-path" textLength="236" lengthAdjust="spacing">{about.founded.ring}</textPath>
        </text>
      </svg>
      <div aria-hidden className="absolute inset-[24%] grid place-items-center rounded-full bg-fg text-bg clay">
        <div className="text-center leading-tight">
          <span className="block font-mono text-[8px] uppercase tracking-widest">{about.founded.label}</span>
          <span className="font-display text-sm font-bold">{about.founded.year}</span>
        </div>
      </div>
    </div>
  )
}

/** About: mission story, company facts and values. */
export function About() {
  const artRef = useRef<HTMLDivElement>(null)
  const { reduced } = usePrefs()
  const { scrollYProgress } = useScroll({ target: artRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60])
  const rot = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-4, 4])

  return (
    <Section id={about.id} tone={about.tone} label={about.label} className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-14 md:grid-cols-12">
          <div ref={artRef} className="relative md:col-span-5">
            <motion.div style={{ y, rotate: rot }} className="dashed-frame relative rounded-[40px] p-4">
              <div className="tone-c1 aspect-[818/900] overflow-hidden rounded-[30px]">
                <img src={about.image} alt={about.imageAlt} width={818} height={900} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <FoundedBadge />
            </motion.div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal><Eyebrow>{about.eyebrow}</Eyebrow></Reveal>
            <SplitText text={about.title} className="display-lg mt-5" />
            {about.story.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}><p className="text-muted mt-5 max-w-lg text-lg leading-relaxed">{p}</p></Reveal>
            ))}
            <Reveal delay={0.3}>
              <dl className="mt-8 grid max-w-lg grid-cols-2 gap-3">
                {about.facts.map((f) => (
                  <div key={f.label} className="rounded-[22px] bg-fg/6 px-4 py-3 hairline">
                    <dt className="label text-[10px] subtle">{f.label}</dt>
                    <dd className="mt-1 font-semibold leading-snug">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <Mission />

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: ease.out, delay: i * 0.1 }}
              className={cn('group relative overflow-hidden rounded-[30px] p-6 clay', ['tone-c1', 'tone-c3', 'tone-c2', 'tone-c1'][i])}
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-fg/10 transition-transform duration-700 ease-soft group-hover:rotate-[360deg]">
                <img src={v.icon} alt="" width={34} height={34} loading="lazy" className="h-[34px] w-[34px]" />
              </span>
              <h3 className="mt-8 font-display text-xl font-semibold">{v.title}</h3>
              <p className="text-muted mt-2 text-sm leading-relaxed">{v.body}</p>
              <span aria-hidden data-n={`0${i + 1}`} className="absolute right-5 top-5 font-display text-5xl font-bold opacity-10 after:content-[attr(data-n)]" />
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
