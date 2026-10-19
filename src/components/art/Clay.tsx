import { useId, type ReactNode, type SVGProps } from 'react'
import type { Tone } from '../../content'

/**
 * Clay illustration kit. Every shape is drawn three times: a flat palette
 * tone, a soft c4 highlight and a soft c1 shadow: giving a claymorphic,
 * lit-from-top-left feel using only the four palette colours.
 */

export const v = (t: Tone) => `var(--${t})`

export function useClay() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const defs = (
    <defs>
      <radialGradient id={`${id}hl`} cx="0.3" cy="0.25" r="0.65">
        <stop offset="0" style={{ stopColor: 'var(--c4)', stopOpacity: 0.8 }} />
        <stop offset="0.5" style={{ stopColor: 'var(--c4)', stopOpacity: 0.12 }} />
        <stop offset="1" style={{ stopColor: 'var(--c4)', stopOpacity: 0 }} />
      </radialGradient>
      <radialGradient id={`${id}sh`} cx="0.72" cy="0.85" r="0.75">
        <stop offset="0" style={{ stopColor: 'var(--c1)', stopOpacity: 0.6 }} />
        <stop offset="0.6" style={{ stopColor: 'var(--c1)', stopOpacity: 0.12 }} />
        <stop offset="1" style={{ stopColor: 'var(--c1)', stopOpacity: 0 }} />
      </radialGradient>
      <linearGradient id={`${id}ring`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style={{ stopColor: 'var(--c4)' }} />
        <stop offset="0.5" style={{ stopColor: 'var(--c3)' }} />
        <stop offset="1" style={{ stopColor: 'var(--c2)' }} />
      </linearGradient>
      {/* soft ambient shadow as a gradient (no SVG blur filter: far cheaper to animate, especially in Safari) */}
      <radialGradient id={`${id}blur`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" style={{ stopColor: 'var(--c1)', stopOpacity: 1 }} />
        <stop offset="0.55" style={{ stopColor: 'var(--c1)', stopOpacity: 0.55 }} />
        <stop offset="1" style={{ stopColor: 'var(--c1)', stopOpacity: 0 }} />
      </radialGradient>
    </defs>
  )
  return { id, defs, hl: `url(#${id}hl)`, sh: `url(#${id}sh)`, ring: `url(#${id}ring)`, blur: `url(#${id}blur)` }
}

export type ClayKit = ReturnType<typeof useClay>

type ShapeFn = (fill: string) => ReactNode

function Layers({ k, tone, draw, shade = true }: { k: ClayKit; tone: Tone; draw: ShapeFn; shade?: boolean }) {
  return (
    <g>
      {draw(v(tone))}
      {draw(k.hl)}
      {shade && draw(k.sh)}
    </g>
  )
}

export const ClayCircle = ({ k, tone, cx, cy, r }: { k: ClayKit; tone: Tone; cx: number; cy: number; r: number }) => (
  <Layers k={k} tone={tone} draw={(f) => <circle cx={cx} cy={cy} r={r} style={{ fill: f }} />} />
)

export const ClayRect = ({ k, tone, x, y, w, h, rx, transform }: { k: ClayKit; tone: Tone; x: number; y: number; w: number; h: number; rx: number; transform?: string }) => (
  <Layers k={k} tone={tone} draw={(f) => <rect x={x} y={y} width={w} height={h} rx={rx} transform={transform} style={{ fill: f }} />} />
)

export const ClayPath = ({ k, tone, d, transform }: { k: ClayKit; tone: Tone; d: string; transform?: string }) => (
  <Layers k={k} tone={tone} draw={(f) => <path d={d} transform={transform} style={{ fill: f }} />} />
)

export const ClayEllipse = ({ k, tone, cx, cy, rx, ry }: { k: ClayKit; tone: Tone; cx: number; cy: number; rx: number; ry: number }) => (
  <Layers k={k} tone={tone} draw={(f) => <ellipse cx={cx} cy={cy} rx={rx} ry={ry} style={{ fill: f }} />} />
)

export const Shadow = ({ k, cx, cy, rx, ry = 12, o = 0.45 }: { k: ClayKit; cx: number; cy: number; rx: number; ry?: number; o?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx * 1.15} ry={ry * 1.6} style={{ fill: k.blur, opacity: o }} />
)

/** Isometric rounded cube. */
export function ClayCube({ k, x, y, s, tones = ['c4', 'c3', 'c2'] }: { k: ClayKit; x: number; y: number; s: number; tones?: [Tone, Tone, Tone] }) {
  const h = s * 0.58
  const top = `M${x} ${y} l${s} ${-h * 0.5} l${s} ${h * 0.5} l${-s} ${h * 0.5} Z`
  const left = `M${x} ${y} l${s} ${h * 0.5} v${s} l${-s} ${-h * 0.5} Z`
  const right = `M${x + s} ${y + h * 0.5} l${s} ${-h * 0.5} v${s} l${-s} ${h * 0.5} Z`
  return (
    <g strokeLinejoin="round" style={{ strokeWidth: 6 }}>
      <path d={left} style={{ fill: v(tones[1]), stroke: v(tones[1]) }} />
      <path d={right} style={{ fill: v(tones[2]), stroke: v(tones[2]) }} />
      <path d={top} style={{ fill: v(tones[0]), stroke: v(tones[0]) }} />
      <path d={left} style={{ fill: k.sh }} />
      <path d={top} style={{ fill: k.hl }} />
    </g>
  )
}

/** Tilted ring (torus-like) drawn as two arcs so it can wrap around shapes. */
export function ClayRing({ k, cx, cy, rx, ry, w = 10, part = 'full', rotate = -14 }: { k: ClayKit; cx: number; cy: number; rx: number; ry: number; w?: number; part?: 'full' | 'back' | 'front'; rotate?: number }) {
  const back = `M${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`
  const front = `M${cx + rx} ${cy} A${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`} fill="none" strokeLinecap="round">
      {(part === 'full' || part === 'back') && <path d={back} style={{ stroke: k.ring, strokeWidth: w, opacity: 0.75 }} />}
      {(part === 'full' || part === 'front') && <path d={front} style={{ stroke: k.ring, strokeWidth: w }} />}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  The character                                                      */
/* ------------------------------------------------------------------ */

type Pose = 'laptop' | 'wave' | 'think' | 'cheer'

/** A friendly rounded character (viewBox 0 0 400 400). */
export function ClayBuddy({ k, pose = 'laptop', body = 'c3', hair = 'c1', skin = 'c4', glasses = false, blink = true }: { k: ClayKit; pose?: Pose; body?: Tone; hair?: Tone; skin?: Tone; glasses?: boolean; blink?: boolean }) {
  return (
    <g>
      <Shadow k={k} cx={200} cy={372} rx={130} ry={14} />
      {/* crossed legs */}
      <ClayRect k={k} tone="c2" x={104} y={300} w={192} h={58} rx={29} />
      <ClayEllipse k={k} tone="c1" cx={110} cy={336} rx={28} ry={19} />
      <ClayEllipse k={k} tone="c1" cx={290} cy={336} rx={28} ry={19} />
      {/* torso */}
      <ClayPath k={k} tone={body} d="M150 205 Q150 170 186 168 L214 168 Q250 170 250 205 L264 298 Q266 322 242 322 L158 322 Q134 322 136 298 Z" />
      {/* arms */}
      {pose === 'laptop' && (
        <>
          <ClayRect k={k} tone={body} x={126} y={196} w={34} h={92} rx={17} transform="rotate(22 143 242)" />
          <ClayRect k={k} tone={body} x={240} y={196} w={34} h={92} rx={17} transform="rotate(-22 257 242)" />
        </>
      )}
      {pose === 'wave' && (
        <>
          <ClayRect k={k} tone={body} x={126} y={196} w={34} h={92} rx={17} transform="rotate(14 143 242)" />
          <g style={{ transformOrigin: '252px 196px' }} className="animate-[float_2.4s_ease-in-out_infinite]">
            <ClayRect k={k} tone={body} x={240} y={110} w={34} h={96} rx={17} transform="rotate(28 257 196)" />
            <ClayCircle k={k} tone={skin} cx={292} cy={112} r={20} />
          </g>
        </>
      )}
      {pose === 'think' && (
        <>
          <ClayRect k={k} tone={body} x={126} y={196} w={34} h={92} rx={17} transform="rotate(14 143 242)" />
          <ClayRect k={k} tone={body} x={232} y={168} w={34} h={84} rx={17} transform="rotate(-160 249 210)" />
          <ClayCircle k={k} tone={skin} cx={234} cy={170} r={16} />
        </>
      )}
      {pose === 'cheer' && (
        <>
          <ClayRect k={k} tone={body} x={118} y={110} w={34} h={100} rx={17} transform="rotate(-24 135 196)" />
          <ClayRect k={k} tone={body} x={248} y={110} w={34} h={100} rx={17} transform="rotate(24 265 196)" />
          <ClayCircle k={k} tone={skin} cx={104} cy={112} r={19} />
          <ClayCircle k={k} tone={skin} cx={296} cy={112} r={19} />
        </>
      )}
      {/* head */}
      <ClayCircle k={k} tone={skin} cx={200} cy={118} r={60} />
      <ClayPath k={k} tone={hair} d="M140 118 Q136 54 200 52 Q266 54 262 116 Q246 88 216 94 Q190 100 172 84 Q158 102 140 118 Z" />
      {/* face */}
      <g className={blink ? 'animate-blink' : ''} style={{ transformOrigin: '200px 126px', transformBox: 'view-box' }}>
        <ellipse cx={180} cy={126} rx={5.5} ry={7.5} style={{ fill: 'var(--c1)' }} />
        <ellipse cx={220} cy={126} rx={5.5} ry={7.5} style={{ fill: 'var(--c1)' }} />
      </g>
      {glasses && (
        <g fill="none" style={{ stroke: 'var(--c1)', strokeWidth: 3.5 }}>
          <circle cx={180} cy={126} r={15} />
          <circle cx={220} cy={126} r={15} />
          <path d="M195 126 h10" />
        </g>
      )}
      <circle cx={166} cy={146} r={9} style={{ fill: 'var(--c3)', opacity: 0.45 }} />
      <circle cx={234} cy={146} r={9} style={{ fill: 'var(--c3)', opacity: 0.45 }} />
      <path d="M186 148 Q200 160 214 148" fill="none" strokeLinecap="round" style={{ stroke: 'var(--c1)', strokeWidth: 4 }} />
      {/* laptop */}
      {pose === 'laptop' && (
        <g>
          <ClayRect k={k} tone="c2" x={124} y={196} w={152} h={92} rx={14} />
          <rect x={132} y={204} width={136} height={76} rx={9} style={{ fill: 'var(--c4)', opacity: 0.12 }} />
          <circle cx={200} cy={242} r={10} style={{ fill: 'var(--c4)', opacity: 0.55 }} />
          <ClayRect k={k} tone="c1" x={112} y={284} w={176} h={14} rx={7} />
        </g>
      )}
    </g>
  )
}

/** Round avatar with hairstyle variants. */
export function ClayAvatar({ variant = 0, size = 64, className }: { variant?: number; size?: number; className?: string }) {
  const k = useClay()
  const bg: Tone[] = ['c3', 'c2', 'c4', 'c1']
  const hair: Tone[] = ['c1', 'c3', 'c2', 'c3']
  const skin: Tone = variant === 2 ? 'c3' : 'c4'
  const hairs = [
    'M24 44 Q22 18 50 16 Q78 18 76 44 Q66 30 50 32 Q36 34 24 44 Z',
    'M22 50 Q18 14 50 14 Q84 14 78 50 Q76 30 50 28 Q28 28 22 50 Z',
    'M26 40 Q30 16 52 18 Q74 20 76 40 Q60 26 26 40 Z',
    'M24 42 Q24 20 50 18 Q76 20 76 42 L76 64 Q72 40 50 34 Q30 38 24 64 Z',
  ]
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label="Placeholder avatar illustration">
      {k.defs}
      <ClayCircle k={k} tone={bg[variant % 4]} cx={50} cy={50} r={50} />
      <ClayEllipse k={k} tone={hair[variant % 4] === 'c3' ? 'c2' : 'c3'} cx={50} cy={98} rx={30} ry={22} />
      <ClayCircle k={k} tone={skin} cx={50} cy={48} r={24} />
      <ClayPath k={k} tone={hair[variant % 4]} d={hairs[variant % 4]} />
      <circle cx={42} cy={50} r={2.6} style={{ fill: 'var(--c1)' }} />
      <circle cx={58} cy={50} r={2.6} style={{ fill: 'var(--c1)' }} />
      <path d="M43 58 Q50 64 57 58" fill="none" strokeLinecap="round" style={{ stroke: 'var(--c1)', strokeWidth: 2.2 }} />
    </svg>
  )
}

export function Svg({ children, viewBox = '0 0 400 400', label, className, ...rest }: { children: ReactNode; viewBox?: string; label?: string; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={viewBox} className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...rest}>
      {children}
    </svg>
  )
}
