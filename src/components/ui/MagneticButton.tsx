import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'
import { motionCfg } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { cn } from '../../lib/utils'
import { Icon } from './Icon'
import { SmartLink } from './SmartLink'

type Props = {
  children: ReactNode
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'solid' | 'ghost'
  size?: 'md' | 'lg'
  arrow?: boolean
  cursor?: string
  className?: string
  disabled?: boolean
  ariaLabel?: string
}

/** Magnetic pill button: drifts toward the pointer, slides a fill + arrow on hover, ripples on press. */
export function MagneticButton({ children, to, onClick, type = 'button', variant = 'solid', size = 'md', arrow = true, cursor, className, disabled, ariaLabel }: Props) {
  const wrap = useRef<HTMLSpanElement>(null)
  const { rich } = usePrefs()
  const x = useSpring(0, motionCfg.magnetic.spring)
  const y = useSpring(0, motionCfg.magnetic.spring)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const move = (e: PointerEvent) => {
    if (!rich || !wrap.current) return
    const r = wrap.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * motionCfg.magnetic.strength)
    y.set((e.clientY - r.top - r.height / 2) * motionCfg.magnetic.strength)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }
  const press = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const id = performance.now()
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    window.setTimeout(() => setRipples((rs) => rs.filter((p) => p.id !== id)), motionCfg.ripple.duration * 1000)
  }

  const cls = cn(
    'group relative isolate inline-flex items-center overflow-hidden rounded-full font-semibold tracking-tight transition-[box-shadow] duration-300',
    size === 'lg' ? 'gap-4 py-3 pl-7 pr-3 text-base md:text-lg' : 'gap-3 py-2.5 pl-5 pr-2.5 text-sm md:text-[15px]',
    variant === 'solid' ? 'bg-fg text-bg clay' : 'hairline-strong text-fg',
    disabled && 'pointer-events-none opacity-60',
    className,
  )

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 -z-10 -translate-x-[101%] rounded-full transition-transform duration-500 ease-soft group-hover:translate-x-0',
          variant === 'solid' ? 'bg-[color-mix(in_srgb,var(--fg)_78%,var(--acc))]' : 'bg-fg/10',
        )}
      />
      <span className="relative">{children}</span>
      {arrow && (
        <span
          aria-hidden
          className={cn('relative grid place-items-center overflow-hidden rounded-full', size === 'lg' ? 'h-10 w-10' : 'h-8 w-8', variant === 'solid' ? 'bg-bg/90 text-fg' : 'bg-fg text-bg')}
        >
          <Icon name="arrow" size={size === 'lg' ? 18 : 16} className="transition-transform duration-500 ease-soft group-hover:translate-x-[180%]" />
          <Icon name="arrow" size={size === 'lg' ? 18 : 16} className="absolute -translate-x-[180%] transition-transform duration-500 ease-soft group-hover:translate-x-0" />
        </span>
      )}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute -z-10 h-10 w-10 rounded-full bg-[color-mix(in_srgb,var(--acc)_45%,transparent)]"
          style={{ left: r.x - 20, top: r.y - 20 }}
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 9, opacity: 0 }}
          transition={{ duration: motionCfg.ripple.duration, ease: 'easeOut' }}
        />
      ))}
    </>
  )

  return (
    <motion.span ref={wrap} style={{ x, y }} onPointerMove={move} onPointerLeave={leave} className="inline-block">
      {to ? (
        <SmartLink to={to} className={cls} onPointerDown={press} cursor={cursor} aria-label={ariaLabel}>
          {inner}
        </SmartLink>
      ) : (
        <button type={type} onClick={onClick} onPointerDown={press} className={cls} data-cursor={cursor} disabled={disabled} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.span>
  )
}

/** Animated-underline text link. */
export function UnderlineLink({ to, children, className, arrow = true }: { to: string; children: ReactNode; className?: string; arrow?: boolean }) {
  return (
    <SmartLink to={to} className={cn('group relative inline-flex items-center gap-2 font-semibold', className)}>
      <span className="relative">
        {children}
        <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-soft group-hover:origin-left group-hover:scale-x-100" />
        <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full bg-current opacity-30" />
      </span>
      {arrow && <Icon name="arrow" size={16} className="transition-transform duration-500 ease-soft group-hover:translate-x-1" />}
    </SmartLink>
  )
}
