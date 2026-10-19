import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { howItWorks } from '../../content'
import { ease } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { blobPath, cn } from '../../lib/utils'
import { UnderlineLink } from '../ui/MagneticButton'
import { Container, Reveal, Section, SectionHeading } from '../ui/primitives'

const pad = (n: number) => String(n).padStart(2, '0')
const blob = blobPath(11, { r: 140, cx: 150, cy: 150, variance: 0.14 })

/** The step illustration: the client's drawing on a light card, cross-fading between steps. */
function StepVisual({ step }: { step: number }) {
  const s = howItWorks.steps[step]
  return (
    <div className="relative aspect-square w-full max-w-[460px]">
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <motion.path d={blob} animate={{ rotate: step * 24 }} transition={{ duration: 1, ease: ease.out }} style={{ fill: 'var(--c3)', opacity: 0.55, transformOrigin: '150px 150px', transformBox: 'view-box' }} />
      </svg>
      <div className="tone-c4 absolute inset-[8%] overflow-hidden rounded-[36px] clay">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={step}
            src={s.image}
            alt={howItWorks.stepAlts[step]}
            width={720}
            height={720}
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain p-[6%]"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.55, ease: ease.out }}
          />
        </AnimatePresence>
      </div>
      <span className="label absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-fg px-3 py-1.5 text-bg">{howItWorks.stepLabel} {pad(step + 1)}</span>
    </div>
  )
}

export function HowItWorks() {
  const { small, reduced } = usePrefs()
  const pinned = !small && !reduced
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [step, setStep] = useState(0)
  const n = howItWorks.steps.length

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const s = Math.min(n - 1, Math.floor(v * n * 0.999))
    if (s !== step) setStep(s)
  })

  return (
    <Section id={howItWorks.id} tone={howItWorks.tone} label={howItWorks.label}>
      <Container className="pt-20 md:pt-28">
        <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} lead={howItWorks.lead} aside={<div className="mt-5"><UnderlineLink to={howItWorks.link.to}>{howItWorks.link.label}</UnderlineLink></div>} />
      </Container>

      {pinned ? (
        <div ref={track} className="relative" style={{ height: `${n * 80 + 40}vh` }}>
          <div className="sticky top-0 flex h-svh items-center">
            <Container className="grid items-center gap-12 md:grid-cols-12">
              <ol className="relative md:col-span-6">
                {/* drawn path */}
                <svg aria-hidden className="absolute left-[23px] top-4 h-[calc(100%-2rem)] w-2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
                  <line x1="1" y1="0" x2="1" y2="100" strokeWidth="2" style={{ stroke: 'var(--fg)', opacity: 0.15 }} vectorEffect="non-scaling-stroke" />
                  <motion.line x1="1" y1="0" x2="1" y2="100" strokeWidth="2" style={{ stroke: 'var(--fg)', pathLength: line }} vectorEffect="non-scaling-stroke" />
                </svg>
                {howItWorks.steps.map((s, i) => (
                  <li key={s.title} className="relative flex gap-6 py-3.5" aria-current={i === step ? 'step' : undefined}>
                    <motion.span
                      className={cn('relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full font-mono text-sm transition-colors duration-500', i <= step ? 'bg-fg text-bg' : 'bg-bg hairline-strong')}
                      animate={{ scale: i === step ? 1.12 : 1 }}
                    >
                      {pad(i + 1)}
                    </motion.span>
                    <div className={cn('pt-1.5 transition-opacity duration-500', i === step ? 'opacity-100' : 'opacity-60')}>
                      <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{s.title}</h3>
                      <motion.p
                        className="text-muted max-w-sm overflow-hidden leading-relaxed"
                        animate={{ height: i === step ? 'auto' : 0, opacity: i === step ? 1 : 0, marginTop: i === step ? 8 : 0 }}
                        transition={{ duration: 0.5, ease: ease.out }}
                      >
                        {s.body}
                      </motion.p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="flex justify-center md:col-span-6">
                <StepVisual step={step} />
              </div>
            </Container>
          </div>
        </div>
      ) : (
        <Container className="pb-24 pt-12">
          <ol className="relative space-y-4 border-l border-[color-mix(in_srgb,var(--fg)_20%,transparent)] pl-8">
            {howItWorks.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05} className="glass relative rounded-[28px] p-6">
                <span className="absolute -left-[49px] top-6 grid h-8 w-8 place-items-center rounded-full bg-fg font-mono text-xs text-bg">{pad(i + 1)}</span>
                <div className="tone-c4 mb-4 overflow-hidden rounded-[20px]">
                  <img src={s.image} alt={howItWorks.stepAlts[i]} width={720} height={720} loading="lazy" decoding="async" className="mx-auto aspect-square h-48 w-auto object-contain p-2" />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="text-muted mt-2 leading-relaxed">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      )}
    </Section>
  )
}
