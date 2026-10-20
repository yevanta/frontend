/**
 * motion.ts: every animation parameter in one place.
 * Tune durations, easings, springs and speeds here.
 */

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  soft: [0.16, 1, 0.3, 1] as const,
  wipe: [0.76, 0, 0.24, 1] as const,
}

export const spring = {
  soft: { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 } as const,
  snappy: { type: 'spring', stiffness: 420, damping: 32 } as const,
  roll: { type: 'spring', stiffness: 160, damping: 22 } as const,
  pill: { type: 'spring', stiffness: 380, damping: 34 } as const,
}

export const motionCfg = {
  intro: { draw: 0.55, hold: 0.05, wipe: 0.7, layerDelay: 0.08 },
  route: { cover: 0.42, reveal: 0.55, layerDelay: 0.06 },
  split: { duration: 0.95, wordStagger: 0.045, lineStagger: 0.11, inLine: 0.018 },
  fade: { duration: 0.8, y: 28 },
  stagger: { cards: 0.07, list: 0.06 },
  magnetic: { strength: 0.32, spring: { stiffness: 220, damping: 16, mass: 0.6 } },
  ripple: { duration: 0.65 },
  cursor: { spring: { stiffness: 520, damping: 38, mass: 0.45 }, size: 34, hover: 78 },
  tilt: { max: 7, perspective: 1000, spring: { stiffness: 200, damping: 20 } },
  marquee: { speed: 46, hoverFactor: 0.22, easing: 0.06 },
  rolling: { interval: 2600 },
  countUp: { duration: 1.9 },
  carousel: { power: 0.28, timeConstant: 320, elastic: 0.08 },
  productRolling: { interval: 2800 },
  tabSwap: { duration: 0.35, y: 10 },
  toasts: { interval: 3200 },
  lenis: { duration: 1.15, wheelMultiplier: 1 },
  scrollTo: { duration: 1.4 },
  parallax: { grid: 0.12, mouse: 18, illustration: 70 },
  hero3d: { pointer: 0.55, scroll: 1.3, damping: 4 },
  colorShift: 0.9, // seconds: mirrored in CSS (:root transition)
}
