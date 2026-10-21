import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { hero, ui } from '../../content'
import { ease, motionCfg } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { useIntro } from '../layout/Intro'
import { DepthLayer, useMouseDepth } from '../ui/Interactive'
import { MagneticButton } from '../ui/MagneticButton'
import { CountUp } from '../ui/Numbers'
import { Container, Eyebrow, Note, Section } from '../ui/primitives'
import { SplitText } from '../ui/SplitText'


function RollingWord({ words, play, suffix = '' }: { words: string[]; play: boolean; suffix?: string }) {
  const [i, setI] = useState(0)
  const { reduced } = usePrefs()
  useEffect(() => {
    if (!play || reduced) return
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), motionCfg.rolling.interval)
    return () => window.clearInterval(t)
  }, [play, reduced, words.length])
  return (
    <span className="relative block w-fit overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          aria-hidden
          className="gradient-text inline-block italic"
          initial={{ y: '100%', opacity: 0 }}
          animate={play ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.75, ease: ease.out, delay: i === 0 ? 0.35 : 0 }}
        >
          {words[i]}
          <span className="not-italic text-fg">{suffix}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  const { done } = useIntro()
  const { reduced } = usePrefs()
  const ref = useRef<HTMLDivElement>(null)
  const { mx, my } = useMouseDepth()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120])


  const afterDelay = 0.25 + hero.h1Before.split(' ').length * motionCfg.split.wordStagger
  const punct = hero.h1After.match(/^[,.;:!?]/)?.[0] ?? ''
  const rest = hero.h1After.slice(punct.length).trim()

  return (
    <Section id={hero.id} tone={hero.tone} label={hero.label} className="overflow-hidden">
      <div ref={ref} className="relative flex min-h-[100svh] items-center pb-24 pt-28 md:pt-32">
        <Container className="grid items-center gap-10 md:grid-cols-12 md:gap-6 lg:gap-10">
          <div className="relative z-10 md:col-span-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={done ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: ease.out }}>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </motion.div>
            <h1 className="display-xl mt-6">
              <span className="sr-only">{`${hero.h1Before} ${hero.rolling[0]}${hero.h1After}`}</span>
              <span aria-hidden>
                <SplitText as="span" mode="words" text={hero.h1Before} play={done} delay={0.15} />{' '}
                <RollingWord words={hero.rolling} play={done} suffix={punct} />{' '}
                <SplitText as="span" mode="words" text={rest} play={done} delay={afterDelay} />
              </span>
            </h1>
            <motion.p
              className="text-muted mt-6 max-w-lg text-base leading-relaxed md:text-lg lg:max-w-lg"
              initial={{ opacity: 0, y: 18 }} animate={done ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: ease.out, delay: 0.75 }}
            >
              {hero.body}
            </motion.p>
            <motion.div className="mt-8 md:mt-9" initial={{ opacity: 0, y: 18 }} animate={done ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: ease.out, delay: 0.9 }}>
              <MagneticButton to={hero.cta.to} size="lg" cursor="Go">{hero.cta.label}</MagneticButton>
            </motion.div>

            <motion.dl
              className="mt-10 grid max-w-md grid-cols-3 gap-2 sm:gap-3 md:mt-12"
              initial="off" animate={done ? 'on' : 'off'}
              variants={{ on: { transition: { staggerChildren: 0.1, delayChildren: 1.05 } } }}
            >
              {hero.stats.map((s) => (
                <motion.div key={s.label} variants={{ off: { opacity: 0, y: 16 }, on: { opacity: 1, y: 0 } }} className="glass min-w-0 rounded-[20px] px-3 py-3 sm:rounded-[22px] sm:px-4 sm:py-3.5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-xl font-semibold sm:text-2xl lg:text-3xl"><CountUp value={s.value} suffix={s.suffix} start={done} /></dd>
                  <dd className="label mt-1 text-[10px] tracking-[0.08em] subtle sm:text-[10px] sm:tracking-[0.16em]">{s.label}</dd>
                </motion.div>
              ))}
            </motion.dl>
            <Note className="mt-3 block">{hero.statsNote}</Note>
          </div>

          <motion.div
            style={{ y: sceneY }}
            className="relative mx-auto w-full max-w-[540px] md:col-span-6 md:mb-12 md:max-w-none lg:mb-28 lg:max-w-[640px]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={done ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease: ease.out, delay: 0.15 }}
          >
            <div aria-hidden className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_45%_40%,color-mix(in_srgb,var(--c3)_60%,transparent),transparent_70%)]" />
            <DepthLayer depth={0.8} mx={mx} my={my} className="relative">
              <img
                src={hero.image.src}
                alt={hero.sceneAlt}
                width={hero.image.width}
                height={hero.image.height}
                fetchPriority="high"
                decoding="async"
                draggable={false}
                style={{ aspectRatio: `${hero.image.width} / ${hero.image.height}` }}
                className="relative w-full select-none object-contain"
              />
            </DepthLayer>
            <ul className="relative mt-3 flex flex-wrap justify-center gap-2" aria-label={hero.chipsLabel}>
              {hero.chips.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  animate={done ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: ease.out, delay: 0.9 + i * 0.1 }}
                  className="glass label inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px]"
                >
                  <span aria-hidden className="h-2 w-2 rounded-full bg-fg" />
                  {c}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </Container>

        {/* scroll indicator */}
        <motion.div
          aria-hidden
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={done ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
        >
          <span className="relative flex h-10 w-6 justify-center rounded-full hairline-strong pt-2">
            <span className="h-2 w-1 animate-scroll-dot rounded-full bg-fg" />
          </span>
          <span className="label text-[10px] subtle">{ui.scroll}</span>
        </motion.div>
      </div>
    </Section>
  )
}
