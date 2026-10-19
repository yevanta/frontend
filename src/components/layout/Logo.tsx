import { motion } from 'framer-motion'
import { site } from '../../content'
import { ease, motionCfg } from '../../motion'

/** The "Y" brand mark (client artwork). `draw` plays a short spin-in for the intro. */
export function LogoMark({ size = 32, draw = false }: { size?: number; draw?: boolean }) {
  return (
    <motion.img
      src={site.logo.mark}
      alt=""
      aria-hidden
      width={size}
      height={size}
      draggable={false}
      className="select-none"
      style={{ width: size, height: size }}
      initial={draw ? { opacity: 0, scale: 0.6, rotate: -60 } : false}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: motionCfg.intro.draw, ease: ease.out }}
    />
  )
}

/** Full logo (client artwork). Has its own light badge, so it reads on dark and light sections. */
export function Logo({ height = 34, animate = false }: { height?: number; animate?: boolean }) {
  const width = Math.round((height * site.logo.width) / site.logo.height)
  return (
    <motion.img
      src={site.logo.src}
      alt={site.brand}
      width={width}
      height={height}
      draggable={false}
      className="block select-none"
      style={{ width, height }}
      initial={animate ? { opacity: 0, scale: 0.85, y: 10 } : false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: motionCfg.intro.draw, ease: ease.out }}
    />
  )
}
