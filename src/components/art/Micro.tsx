import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState, type ComponentType } from 'react'
import { linePath } from '../../lib/utils'
import { ClayBuddy, Svg, useClay } from './Clay'

const loop = { repeat: Infinity, ease: 'easeInOut' } as const
const fg = (o = 1) => ({ stroke: 'var(--fg)', opacity: o })
const fill = (o = 1) => ({ fill: 'var(--fg)', opacity: o })

function Toggle() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const t = window.setInterval(() => setOn((v) => !v), 1800)
    return () => window.clearInterval(t)
  }, [])
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(10 ${14 + i * 30})`}>
          <rect width="70" height="8" rx="4" style={fill(0.25)} />
          <rect x="100" y="-6" width="40" height="22" rx="11" style={fill(i === 1 ? (on ? 0.95 : 0.25) : i === 0 ? 0.95 : 0.25)} />
          <motion.circle
            cy="5"
            r="8"
            animate={{ cx: i === 1 ? (on ? 128 : 112) : i === 0 ? 128 : 112 }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            style={{ fill: i === 1 ? (on ? 'var(--bg)' : 'var(--fg)') : i === 0 ? 'var(--bg)' : 'var(--fg)' }}
          />
        </g>
      ))}
    </g>
  )
}

/** Small looping illustrations for the bento cards (viewBox 160x100). */
function FeatureAnimInner({ kind }: { kind: string }) {
  const k = useClay()
  return (
    <Svg viewBox="0 0 160 100" className="h-full w-full overflow-visible">
      {k.defs}
      {kind === 'chart' && (
        <g fill="none" strokeLinecap="round">
          {[20, 45, 70].map((y) => <path key={y} d={`M6 ${y}H154`} style={{ ...fg(0.12), strokeWidth: 1 }} />)}
          <motion.path d={linePath([12, 28, 22, 40, 34, 58, 52, 76], 160, 90)} style={{ ...fg(), strokeWidth: 3 }}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
          <motion.circle cx="154" cy="10" r="5" style={fill()} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.6, ...loop }} />
        </g>
      )}
      {kind === 'toggle' && <Toggle />}
      {kind === 'shield' && (
        <g>
          {[0, 1].map((i) => (
            <motion.circle key={i} cx="80" cy="50" r="30" fill="none" style={{ ...fg(0.5), strokeWidth: 2, transformOrigin: '80px 50px', transformBox: 'view-box' }}
              animate={{ scale: [0.7, 1.6], opacity: [0.6, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 1.1, ease: 'easeOut' }} />
          ))}
          <motion.path d="M80 18 54 28v20c0 15 11 27 26 31 15-4 26-16 26-31V28L80 18z" style={fill(0.9)}
            animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.2, ...loop }} />
          <path d="M68 48l8 8 16-16" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--bg)' }} />
        </g>
      )}
      {kind === 'bars' && (
        <g>
          {[38, 56, 44, 70, 62, 84].map((h, i) => (
            <motion.rect key={i} x={12 + i * 24} y={92 - h} width="14" height={h} rx="7" style={{ ...fill(i === 5 ? 1 : 0.35), transformOrigin: `0 92px`, transformBox: 'view-box' }}
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }} />
          ))}
        </g>
      )}
      {kind === 'sync' && (
        <g>
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '80px 50px', transformBox: 'view-box' }}>
            <path d="M80 18a32 32 0 0 1 30 20" fill="none" strokeWidth="4" strokeLinecap="round" style={fg()} />
            <path d="M80 82a32 32 0 0 1-30-20" fill="none" strokeWidth="4" strokeLinecap="round" style={fg()} />
            <path d="M104 36l7 3 3-8" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={fg()} />
            <path d="M56 64l-7-3-3 8" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={fg()} />
          </motion.g>
          <circle cx="22" cy="50" r="10" style={fill(0.35)} />
          <circle cx="138" cy="50" r="10" style={fill(0.35)} />
          <motion.circle cx="80" cy="50" r="10" style={fill()} animate={{ scale: [1, 0.8, 1] }} transition={{ duration: 1.5, ...loop }} />
        </g>
      )}
      {kind === 'bell' && (
        <g>
          <motion.g animate={{ rotate: [0, 14, -12, 8, -4, 0] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }} style={{ transformOrigin: '80px 16px', transformBox: 'view-box' }}>
            <path d="M80 16c-14 0-24 10-24 24v16l-8 10h64l-8-10V40c0-14-10-24-24-24z" style={fill(0.9)} />
            <circle cx="80" cy="74" r="7" style={fill(0.9)} />
          </motion.g>
          <motion.g initial={{ scale: 0 }} animate={{ scale: [0, 1.15, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }} style={{ transformOrigin: '104px 22px', transformBox: 'view-box' }}>
            <circle cx="104" cy="22" r="11" style={{ fill: 'var(--acc)' }} />
            <text x="104" y="27" textAnchor="middle" style={{ fill: 'var(--c4)', font: '700 12px JetBrains Mono, monospace' }}>3</text>
          </motion.g>
        </g>
      )}
      {kind === 'ring' && (
        <g fill="none" strokeLinecap="round">
          <circle cx="80" cy="50" r="36" strokeWidth="9" style={fg(0.15)} />
          <motion.circle cx="80" cy="50" r="36" strokeWidth="9" style={{ ...fg(), rotate: -90, transformOrigin: '80px 50px', transformBox: 'view-box' }}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.82 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} />
          <text x="80" y="56" textAnchor="middle" style={{ fill: 'var(--fg)', font: '600 17px Unbounded, sans-serif' }}>82</text>
        </g>
      )}
      {kind === 'cursor' && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x={10 + i * 50} y="20" width="40" height="40" rx="12" style={fill(i === 1 ? 0.9 : 0.2)} />)}
          <motion.g animate={{ x: [0, 50, 100, 50, 0], y: [0, 6, 0, -4, 0] }} transition={{ duration: 5, ...loop }}>
            <path d="M28 44l0 30 8-8 6 12 6-3-6-12 11 0z" style={{ fill: 'var(--acc)', stroke: 'var(--c4)', strokeWidth: 2 }} strokeLinejoin="round" />
          </motion.g>
          <motion.g animate={{ x: [100, 0, 50, 100] }} transition={{ duration: 6, ...loop }}>
            <path d="M18 64l0 22 6-6 4 9 5-2-4-9 8 0z" style={{ fill: 'var(--fg)', stroke: 'var(--bg)', strokeWidth: 2 }} strokeLinejoin="round" />
          </motion.g>
        </g>
      )}
      {kind === 'flow' && (
        <g>
          <path id={`${k.id}fp`} d="M14 70 C40 70 40 30 80 30 S120 70 146 70" fill="none" strokeWidth="2" strokeDasharray="4 6" style={fg(0.4)} />
          {[14, 80, 146].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={i === 1 ? 30 : 70} r="13" style={fill(i === 1 ? 1 : 0.4)} />
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <circle key={i} r="4" style={{ fill: 'var(--acc)' }}>
              <animateMotion dur="3s" begin={`${i}s`} repeatCount="indefinite" path="M14 70 C40 70 40 30 80 30 S120 70 146 70" />
            </circle>
          ))}
        </g>
      )}
      {kind === 'registry' && (
        <g>
          {[0, 1, 2].map((i) => (
            <motion.g key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.6 }} transition={{ delay: i * 0.12, duration: 0.5 }}>
              <rect x="6" y={10 + i * 28} width="148" height="22" rx="8" style={fill(0.1)} />
              <circle cx="18" cy={21 + i * 28} r="4" style={fill(0.7)} />
              <rect x="28" y={18 + i * 28} width={56 - i * 8} height="6" rx="3" style={fill(0.55)} />
              <motion.rect x="112" y={15 + i * 28} width="36" height="12" rx="6" style={{ fill: i === 1 ? 'var(--acc)' : 'var(--fg)' }}
                animate={i === 1 ? { opacity: [1, 0.4, 1] } : { opacity: 0.85 }} transition={{ duration: 2.4, ...loop }} />
            </motion.g>
          ))}
        </g>
      )}
      {kind === 'history' && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {[25, 50, 75].map((y) => <path key={y} d={`M6 ${y}H154`} style={{ ...fg(0.12), strokeWidth: 1 }} />)}
          <motion.path d="M6 72 H44 V56 H86 V62 H120 V34 H154" style={{ ...fg(), strokeWidth: 3 }}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
          {[[44, 56], [86, 62], [120, 34]].map(([cx, cy], i) => (
            <motion.circle key={i} cx={cx} cy={cy} r="4.5" style={fill()} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }} transition={{ delay: 0.5 + i * 0.35 }} />
          ))}
        </g>
      )}
      {kind === 'competitors' && (
        <g>
          {[52, 66, 44].map((h, i) => (
            <motion.rect key={i} x={20 + i * 40} y={88 - h} width="24" height={h} rx="8" style={{ ...fill(0.35), transformOrigin: '0 88px', transformBox: 'view-box' }}
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: false, amount: 0.6 }} transition={{ delay: i * 0.1, duration: 0.7 }} />
          ))}
          <motion.g animate={{ y: [0, -10, 4, 0] }} transition={{ duration: 4, ...loop }}>
            <path d="M8 36 H152" strokeWidth="3" strokeDasharray="5 5" style={fg()} />
            <circle cx="148" cy="36" r="6" style={{ fill: 'var(--acc)' }} />
          </motion.g>
        </g>
      )}
      {kind === 'position' && (
        <g>
          <rect x="10" y="44" width="140" height="10" rx="5" style={fill(0.15)} />
          <rect x="54" y="38" width="64" height="22" rx="11" style={fill(0.18)} />
          {[54, 86, 118].map((x) => <circle key={x} cx={x} cy="49" r="4" style={fill(0.6)} />)}
          <motion.g animate={{ x: [-30, 22, 46, -30] }} transition={{ duration: 6, ...loop }}>
            <path d="M80 24 V74" strokeWidth="3" strokeLinecap="round" style={fg()} />
            <circle cx="80" cy="49" r="8" style={{ fill: 'var(--fg)', stroke: 'var(--bg)', strokeWidth: 3 }} />
          </motion.g>
        </g>
      )}
      {kind === 'confidence' && (
        <g fill="none" strokeLinecap="round">
          <circle cx="56" cy="50" r="32" strokeWidth="8" style={fg(0.15)} />
          <motion.circle cx="56" cy="50" r="32" strokeWidth="8" style={{ ...fg(), rotate: -90, transformOrigin: '56px 50px', transformBox: 'view-box' }}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.78 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} />
          <text x="56" y="55" textAnchor="middle" style={{ fill: 'var(--fg)', font: '600 13px Unbounded, sans-serif' }}>High</text>
          <rect x="102" y="30" width="48" height="8" rx="4" style={fill(0.55)} />
          <rect x="102" y="46" width="36" height="8" rx="4" style={fill(0.3)} />
          <rect x="102" y="62" width="42" height="14" rx="7" style={{ fill: 'var(--acc)' }} />
        </g>
      )}
      {kind === 'models' && (
        <g>
          {['v3', 'v2', 'v1'].map((v, i) => (
            <motion.g key={v} initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.6 }} transition={{ delay: i * 0.12 }}>
              <rect x={14 + i * 8} y={14 + i * 24} width={132 - i * 16} height="20" rx="10" style={fill(i === 0 ? 0.9 : 0.2 + (2 - i) * 0.08)} />
              <text x={28 + i * 8} y={28 + i * 24} style={{ fill: i === 0 ? 'var(--bg)' : 'var(--fg)', font: '700 10px JetBrains Mono, monospace' }}>{v}</text>
              {i === 0 && <motion.circle cx="134" cy="24" r="4" style={{ fill: 'var(--acc)' }} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.6, ...loop }} />}
            </motion.g>
          ))}
        </g>
      )}
      {kind === 'trail' && (
        <g>
          <path d="M24 16 V86" strokeWidth="2" strokeDasharray="3 6" style={fg(0.4)} />
          {[0, 1, 2].map((i) => (
            <motion.g key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.6 }} transition={{ delay: 0.2 + i * 0.3 }}>
              <circle cx="24" cy={20 + i * 30} r="10" style={fill(i === 2 ? 0.35 : 1)} />
              <path d={`M19 ${20 + i * 30} l4 4 l7 -8`} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--bg)', opacity: i === 2 ? 0 : 1 }} />
              <rect x="44" y={14 + i * 30} width={84 - i * 14} height="7" rx="3.5" style={fill(0.6)} />
              <rect x="44" y={24 + i * 30} width="44" height="5" rx="2.5" style={fill(0.3)} />
            </motion.g>
          ))}
        </g>
      )}
      {kind === 'buddy' &&<g transform="translate(30 -10) scale(0.26)"><ClayBuddy k={k} pose="laptop" /></g>}
    </Svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Module graphics (product page): viewBox 320x220                   */
/* ------------------------------------------------------------------ */

const inView = { initial: 'off', whileInView: 'on', viewport: { once: false, amount: 0.4 } } as const

function ModuleGraphicInner({ kind }: { kind: string }) {
  return (
    <Svg viewBox="0 0 320 220" className="h-full w-full">
      <motion.g {...inView}>
        {kind === 'table' && (
          <g>
            <rect x="10" y="10" width="300" height="30" rx="10" style={fill(0.2)} />
            {[0, 1, 2, 3, 4].map((r) => (
              <motion.g key={r} variants={{ off: { opacity: 0, x: -30 }, on: { opacity: 1, x: 0, transition: { delay: r * 0.1, duration: 0.6 } } }}>
                <rect x="10" y={50 + r * 32} width="300" height="26" rx="8" style={fill(r === 1 ? 0.22 : 0.08)} />
                <circle cx="28" cy={63 + r * 32} r="6" style={fill(0.7)} />
                <rect x="44" y={59 + r * 32} width={90 + (r % 3) * 20} height="8" rx="4" style={fill(0.6)} />
                <rect x="200" y={59 + r * 32} width="40" height="8" rx="4" style={fill(0.3)} />
                <rect x="256" y={56 + r * 32} width="44" height="14" rx="7" style={{ fill: r % 2 ? 'var(--acc)' : 'var(--fg)', opacity: 0.8 }} />
              </motion.g>
            ))}
          </g>
        )}
        {kind === 'line' && (
          <g fill="none" strokeLinecap="round">
            {[40, 90, 140, 190].map((y) => <path key={y} d={`M10 ${y}H310`} style={{ ...fg(0.12), strokeWidth: 1 }} />)}
            <motion.path d={linePath([30, 50, 42, 80, 70, 110, 96, 130, 150], 320, 210, 14)} style={{ ...fg(), strokeWidth: 4 }}
              variants={{ off: { pathLength: 0 }, on: { pathLength: 1, transition: { duration: 1.6, ease: 'easeInOut' } } }} />
            <motion.path d={linePath([20, 26, 40, 34, 52, 48, 66, 60, 72], 320, 210, 14)} strokeDasharray="5 7" style={{ ...fg(0.45), strokeWidth: 3 }}
              variants={{ off: { pathLength: 0 }, on: { pathLength: 1, transition: { duration: 1.6, delay: 0.3, ease: 'easeInOut' } } }} />
          </g>
        )}
        {kind === 'bars' && (
          <g>
            {[60, 110, 80, 150, 120, 170, 140, 190].map((h, i) => (
              <motion.rect key={i} x={16 + i * 37} y={206 - h} width="24" height={h} rx="10" style={{ ...fill(i % 3 === 2 ? 1 : 0.4), transformOrigin: '0 206px', transformBox: 'view-box' }}
                variants={{ off: { scaleY: 0 }, on: { scaleY: 1, transition: { delay: i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} />
            ))}
          </g>
        )}
        {kind === 'timeline' && (
          <g>
            <motion.path d="M20 110 H300" strokeWidth="3" strokeLinecap="round" style={fg(0.5)} variants={{ off: { pathLength: 0 }, on: { pathLength: 1, transition: { duration: 1.2 } } }} />
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.g key={i} variants={{ off: { opacity: 0, y: 10 }, on: { opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.15 } } }}>
                <circle cx={30 + i * 65} cy="110" r="9" style={fill(i < 3 ? 1 : 0.35)} />
                <rect x={10 + i * 65} y={i % 2 ? 130 : 50} width="60" height="40" rx="10" style={fill(i % 2 ? 0.18 : 0.28)} />
                <rect x={18 + i * 65} y={(i % 2 ? 130 : 50) + 10} width="34" height="7" rx="3.5" style={fill(0.7)} />
                <rect x={18 + i * 65} y={(i % 2 ? 130 : 50) + 22} width="24" height="6" rx="3" style={fill(0.4)} />
              </motion.g>
            ))}
          </g>
        )}
        {kind === 'checklist' && (
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.g key={i} variants={{ off: { opacity: 0, x: 20 }, on: { opacity: 1, x: 0, transition: { delay: i * 0.12 } } }}>
                <rect x="20" y={14 + i * 40} width="280" height="32" rx="12" style={fill(0.1)} />
                <rect x="30" y={20 + i * 40} width="20" height="20" rx="6" style={fill(i < 3 ? 1 : 0.25)} />
                {i < 3 && (
                  <motion.path d={`M34 ${30 + i * 40} l4 4 l8 -8`} fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--bg)' }}
                    variants={{ off: { pathLength: 0 }, on: { pathLength: 1, transition: { delay: 0.4 + i * 0.15 } } }} />
                )}
                <rect x="62" y={26 + i * 40} width={120 + (i % 2) * 40} height="8" rx="4" style={fill(i < 3 ? 0.4 : 0.7)} />
                <circle cx="280" cy={30 + i * 40} r="8" style={{ fill: 'var(--acc)', opacity: 0.8 }} />
              </motion.g>
            ))}
          </g>
        )}
        {kind === 'radar' && (
          <g transform="translate(160 112)" fill="none">
            {[30, 60, 90].map((r) => (
              <polygon key={r} points={hex(r)} strokeWidth="1.5" style={fg(0.2)} />
            ))}
            {Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2
              return <path key={i} d={`M0 0 L${Math.cos(a) * 90} ${Math.sin(a) * 90}`} style={fg(0.15)} />
            })}
            <motion.polygon points={radar([0.9, 0.7, 0.85, 0.6, 0.95, 0.75])} strokeWidth="3" style={{ fill: 'color-mix(in srgb, var(--fg) 22%, transparent)', stroke: 'var(--fg)', transformOrigin: '0 0' }}
              variants={{ off: { scale: 0, opacity: 0 }, on: { scale: 1, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }} />
            <motion.line x1="0" y1="0" x2="0" y2="-90" strokeWidth="2" style={{ stroke: 'var(--acc)', transformOrigin: '0 0' }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
          </g>
        )}
      </motion.g>
    </Svg>
  )
}

function hex(r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2
    return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`
  }).join(' ')
}
function radar(vals: number[]) {
  return vals.map((v, i) => {
    const a = (i / vals.length) * Math.PI * 2 - Math.PI / 2
    return `${(Math.cos(a) * 90 * v).toFixed(1)},${(Math.sin(a) * 90 * v).toFixed(1)}`
  }).join(' ')
}

/**
 * Looping micro-animations only exist while they are near the viewport, so
 * off-screen cards cost nothing on the main thread.
 */
function whenVisible<P extends object>(Inner: ComponentType<P>) {
  return function Gated(props: P) {
    const ref = useRef<HTMLDivElement>(null)
    const live = useInView(ref, { margin: '160px 0px' })
    return <div ref={ref} className="h-full w-full">{live && <Inner {...props} />}</div>
  }
}

export const FeatureAnim = whenVisible(FeatureAnimInner)
export const ModuleGraphic = whenVisible(ModuleGraphicInner)
