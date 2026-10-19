export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Smooth closed blob path. Every blob with the same `points` count has an
 * identical command structure, so they can be morphed into one another.
 */
export function blobPath(seed: number, { points = 8, r = 110, variance = 0.2, cx = 150, cy = 150 } = {}) {
  const rand = mulberry32(seed)
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2 - Math.PI / 2
    const rr = r * (1 + (rand() - 0.5) * 2 * variance)
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]
  })
  const f = (n: number) => n.toFixed(1)
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % points]
    const p3 = pts[(i + 2) % points]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`
  }
  return d + ' Z'
}

/** Smooth line path through points (for charts). */
export function linePath(values: number[], w: number, h: number, pad = 6) {
  const max = Math.max(...values), min = Math.min(...values)
  const span = max - min || 1
  const pts = values.map((v, i) => [pad + (i / (values.length - 1)) * (w - pad * 2), h - pad - ((v - min) / span) * (h - pad * 2)])
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const mx = (x0 + x1) / 2
    d += ` C${mx.toFixed(1)} ${y0.toFixed(1)} ${mx.toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`
  }
  return d
}

export function isExternal(to: string) {
  return /^https?:\/\//.test(to)
}

/** Reads the palette from CSS variables so JS (e.g. Three.js) shares one source. */
export function readPalette() {
  const s = getComputedStyle(document.documentElement)
  const get = (k: string, fb: string) => s.getPropertyValue(k).trim() || fb
  return { c1: get('--c1', '#37353E'), c2: get('--c2', '#44444E'), c3: get('--c3', '#715A5A'), c4: get('--c4', '#D3DAD9') }
}

/** Run `fn` when the browser is idle (or after `timeout` ms at the latest). Returns a cancel function. */
export function whenIdle(fn: () => void, timeout = 2000) {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(fn, { timeout })
    return () => w.cancelIdleCallback?.(id)
  }
  const id = window.setTimeout(fn, Math.min(timeout, 1200))
  return () => window.clearTimeout(id)
}
