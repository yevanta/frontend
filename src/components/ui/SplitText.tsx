import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ease, motionCfg } from '../../motion'
import { cn } from '../../lib/utils'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

type Props = {
  text: string
  as?: Tag
  className?: string
  /** 'lines' groups words by rendered line; 'words' staggers every word. */
  mode?: 'lines' | 'words'
  delay?: number
  /** When provided, animation is driven manually instead of on scroll-into-view. */
  play?: boolean
  id?: string
}

/** Parses "Some ~outline~ words" into tokens. */
function parse(text: string) {
  const out: { w: string; outline: boolean; glue: boolean }[] = []
  text.split(/(~[^~]+~)/).forEach((chunk) => {
    const outline = chunk.startsWith('~') && chunk.endsWith('~')
    // punctuation right after an outlined word ("~need~,") stays attached to it
    const glueFirst = !/^\s/.test(chunk) && out.length > 0
    chunk.replace(/~/g, '').split(/\s+/).filter(Boolean).forEach((w, i) => out.push({ w, outline, glue: i === 0 && glueFirst && /^[,.;:!?…’”)]/.test(w) }))
  })
  return out
}

/** Split-text reveal: each word sits in its own mask and rises in, per line or per word. */
export function SplitText({ text, as = 'h2', className, mode = 'lines', delay = 0, play, id }: Props) {
  const tokens = useMemo(() => parse(text), [text])
  const plain = tokens.map((t) => t.w).join(' ')
  const ref = useRef<HTMLElement>(null)
  const [lines, setLines] = useState<number[] | null>(null)

  useLayoutEffect(() => {
    if (mode !== 'lines' || !ref.current) return
    const spans = ref.current.querySelectorAll<HTMLElement>('[data-w]')
    let top = -Infinity
    let line = -1
    const arr: number[] = []
    spans.forEach((s) => {
      const t = (s.parentElement as HTMLElement).offsetTop
      if (Math.abs(t - top) > 6) {
        line++
        top = t
      }
      arr.push(line)
    })
    setLines(arr)
  }, [mode, text])

  const delayFor = (i: number) => {
    if (mode === 'lines' && lines) {
      const firstInLine = lines.indexOf(lines[i])
      return delay + lines[i] * motionCfg.split.lineStagger + (i - firstInLine) * motionCfg.split.inLine
    }
    return delay + i * motionCfg.split.wordStagger
  }

  const Comp = motion[as] as typeof motion.h2
  const drive = play === undefined
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }
    : { initial: 'hidden', animate: play ? 'show' : 'hidden' }

  return (
    <Comp ref={ref as never} id={id} className={className} {...drive}>
      <span className="sr-only">{plain}</span>
      {tokens.map((t, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span
              data-w
              className={cn('inline-block will-change-transform', t.outline && 'text-outline')}
              variants={{
                hidden: { y: '115%', opacity: 0, rotate: 4 },
                show: { y: '0%', opacity: 1, rotate: 0, transition: { duration: motionCfg.split.duration, ease: ease.out, delay: delayFor(i) } },
              }}
            >
              {t.w}
            </motion.span>
          </span>
          {i < tokens.length - 1 && !tokens[i + 1].glue && ' '}
        </Fragment>
      ))}
    </Comp>
  )
}
