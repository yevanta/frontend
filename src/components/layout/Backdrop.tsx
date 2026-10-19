import { motion, useScroll, useTransform } from 'framer-motion'
import { motionCfg } from '../../motion'
import { usePrefs } from '../../lib/prefs'

/** Pre-rendered noise tile (palette c4 tint). A bitmap is far cheaper to animate than an SVG feTurbulence filter. */
const grain = "url('/grain.webp')"

/** Fixed atmosphere: drifting gradient mesh, parallax dot grid and film grain. */
export function Backdrop() {
  const { small, reduced } = usePrefs()
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, (v) => -((v * motionCfg.parallax.grid) % 28))

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* gradient mesh: radial gradients (no blur filter) drifting via transforms */}
      <div className="absolute inset-0 opacity-70 mix-blend-soft-light">
        <div className="absolute -left-[20%] -top-[20%] h-[80vmax] w-[80vmax] animate-drift rounded-full" style={{ background: 'radial-gradient(circle at center, color-mix(in srgb, var(--c3) 85%, transparent), transparent 62%)' }} />
        <div className="absolute -right-[25%] top-[10%] h-[75vmax] w-[75vmax] animate-drift-2 rounded-full" style={{ background: 'radial-gradient(circle at center, color-mix(in srgb, var(--c4) 55%, transparent), transparent 60%)' }} />
        {!small && (
          <div className="absolute -bottom-[30%] left-[20%] h-[70vmax] w-[70vmax] animate-drift rounded-full [animation-delay:-12s]" style={{ background: 'radial-gradient(circle at center, color-mix(in srgb, var(--c1) 90%, transparent), transparent 60%)' }} />
        )}
      </div>
      {/* parallax dot grid */}
      <motion.div className="dot-grid absolute -top-10 left-0 right-0 h-[calc(100%+80px)] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" style={{ y: reduced ? 0 : gridY }} />
      {/* film grain */}
      <div className="absolute -inset-[20%] animate-grain opacity-[0.09] mix-blend-overlay" style={{ backgroundImage: grain, backgroundSize: '160px 160px' }} />
    </div>
  )
}
