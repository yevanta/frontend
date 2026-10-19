import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { motionCfg } from '../../motion'
import { usePrefs } from '../../lib/prefs'

const interactive = 'a, button, [role="button"], [role="tab"], [role="switch"], [role="slider"], input, select, textarea, label, [data-cursor]'

/** Soft ring cursor that grows over interactive elements and shows labels. Disabled on touch & reduced motion. */
export function Cursor() {
  const { rich } = usePrefs()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, motionCfg.cursor.spring)
  const sy = useSpring(y, motionCfg.cursor.spring)
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    if (!rich) return
    document.documentElement.classList.add('has-cursor')
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(interactive)
      setHover(!!el)
      setLabel(el?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '')
    }
    const leave = () => setVisible(false)
    const d = () => setDown(true)
    const u = () => setDown(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', d)
    window.addEventListener('pointerup', u)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', d)
      window.removeEventListener('pointerup', u)
    }
  }, [rich, x, y])

  if (!rich) return null
  const size = label ? motionCfg.cursor.hover : hover ? 54 : motionCfg.cursor.size

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      <motion.div className="absolute left-0 top-0" style={{ x: sx, y: sy }}>
        <motion.div
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[color-mix(in_srgb,var(--fg)_70%,transparent)]"
          style={{ width: motionCfg.cursor.hover, height: motionCfg.cursor.hover }}
          animate={{
            opacity: visible ? 1 : 0,
            scale: (size / motionCfg.cursor.hover) * (down ? 0.85 : 1),
            backgroundColor: label ? 'color-mix(in srgb, var(--fg) 92%, transparent)' : hover ? 'color-mix(in srgb, var(--fg) 12%, transparent)' : 'color-mix(in srgb, var(--fg) 0%, transparent)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span key={label} className="label text-[10px] text-bg" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg" style={{ x, y, opacity: visible ? 1 : 0 }} />
    </div>
  )
}
