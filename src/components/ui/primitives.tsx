import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Tone } from '../../content'
import { ease, motionCfg } from '../../motion'
import { cn } from '../../lib/utils'
import { SplitText } from './SplitText'

/** A page section: registers itself for the section counter and colour-shift background. */
export function Section({ id, tone, label, className, children, counted = true }: { id: string; tone: Tone; label: string; className?: string; children: ReactNode; counted?: boolean }) {
  return (
    <section id={id} data-section={counted ? '' : undefined} data-tone={tone} aria-label={label} className={cn('relative scroll-mt-20 overflow-x-clip', className)}>
      {children}
    </section>
  )
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10', className)}>{children}</div>
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('label inline-flex items-center gap-2 rounded-full hairline bg-fg/5 px-3 py-1.5', className)}>
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-fg" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-fg" />
      </span>
      {children}
    </span>
  )
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('label inline-flex items-center gap-1.5 rounded-full hairline px-2.5 py-1 text-[10px]', className)}>{children}</span>
}

/** Section heading: eyebrow + split-text title + optional lead; "split" puts the lead in a right column. */
export function SectionHeading({ eyebrow, title, lead, layout = 'split', className, titleId, aside }: { eyebrow: string; title: string; lead?: string; layout?: 'split' | 'stack'; className?: string; titleId?: string; aside?: ReactNode }) {
  return (
    <div className={cn(layout === 'split' ? 'grid gap-6 md:grid-cols-12 md:items-end' : 'max-w-3xl', className)}>
      <div className={layout === 'split' ? 'md:col-span-7' : ''}>
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <SplitText text={title} id={titleId} className="display-lg mt-5" />
      </div>
      {(lead || aside) && (
        <Reveal delay={0.2} className={layout === 'split' ? 'md:col-span-5 md:pb-2' : 'mt-5'}>
          {lead && <p className="text-muted max-w-md text-base leading-relaxed md:text-lg">{lead}</p>}
          {aside}
        </Reveal>
      )}
    </div>
  )
}

/** Fade-and-rise on scroll into view. */
export function Reveal({ children, delay = 0, className, y = motionCfg.fade.y, as = 'div' }: { children: ReactNode; delay?: number; className?: string; y?: number; as?: 'div' | 'li' | 'span' }) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: motionCfg.fade.duration, ease: ease.out, delay }}
    >
      {children}
    </Comp>
  )
}

/** Small "Illustrative" / "Placeholder" tag. */
export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('label text-[10px] subtle', className)}>※ {children}</span>
}
