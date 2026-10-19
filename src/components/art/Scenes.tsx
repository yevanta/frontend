import { blobPath } from '../../lib/utils'
import { ClayBuddy, ClayCircle, ClayCube, ClayEllipse, ClayRect, ClayRing, Shadow, Svg, useClay } from './Clay'

/** Use case art (product page): layers returned separately for hover parallax. */
export function UseCaseArt({ variant, label, layer }: { variant: number; label: string; layer: 'back' | 'mid' | 'front' }) {
  const k = useClay()
  return (
    <Svg label={layer === 'front' ? label : undefined} viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
      {k.defs}
      {layer === 'back' && <path d={blobPath(variant + 3, { r: 120, cx: 200, cy: 150, variance: 0.18 })} style={{ fill: 'var(--c4)', opacity: 0.1 }} />}
      {layer === 'mid' && (
        <>
          {variant === 0 && <ClayRect k={k} tone="c2" x={110} y={50} w={180} h={112} rx={18} />}
          {variant === 1 && (
            <>
              <ClayCube k={k} x={250} y={170} s={40} />
              <ClayCube k={k} x={290} y={146} s={40} tones={['c4', 'c2', 'c1']} />
              <ClayCube k={k} x={270} y={110} s={40} tones={['c3', 'c2', 'c1']} />
            </>
          )}
          {variant === 2 && <ClayRing k={k} cx={200} cy={150} rx={130} ry={40} w={9} />}
        </>
      )}
      {layer === 'front' && (
        <>
          {variant === 0 && (
            <>
              <g transform="translate(10 96) scale(0.5)"><ClayBuddy k={k} pose="think" body="c3" /></g>
              <g transform="translate(100 110) scale(0.48)"><ClayBuddy k={k} pose="laptop" body="c2" hair="c3" /></g>
              <g transform="translate(196 96) scale(0.5)"><ClayBuddy k={k} pose="wave" body="c3" glasses /></g>
            </>
          )}
          {variant === 1 && <g transform="translate(20 80) scale(0.56)"><ClayBuddy k={k} pose="cheer" body="c3" /></g>}
          {variant === 2 && (
            <>
              <ClayCircle k={k} tone="c3" cx={200} cy={150} r={60} />
              <path d="M174 152 l18 18 l36 -38" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--c4)', strokeWidth: 10 }} />
            </>
          )}
        </>
      )}
    </Svg>
  )
}

/** Stylised map for the contact card. */
export function MapArt({ label }: { label: string }) {
  const k = useClay()
  return (
    <Svg label={label} viewBox="0 0 400 240" className="h-full w-full">
      {k.defs}
      <rect width="400" height="240" rx="28" style={{ fill: 'var(--c2)' }} />
      <path d="M-10 160 C80 120 140 210 230 150 S350 90 420 120" fill="none" style={{ stroke: 'var(--c3)', strokeWidth: 26, opacity: 0.55 }} />
      <g style={{ fill: 'var(--c4)', opacity: 0.12 }}>
        {[[30, 24, 70, 50], [118, 20, 90, 64], [230, 26, 60, 44], [306, 18, 74, 60], [26, 196, 80, 34], [252, 176, 110, 44], [130, 100, 56, 40]].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx={10} />
        ))}
      </g>
      <g fill="none" style={{ stroke: 'var(--c4)', strokeWidth: 3, opacity: 0.28 }} strokeDasharray="2 9" strokeLinecap="round">
        <path d="M0 100 H400" />
        <path d="M210 0 V240" />
      </g>
      <g className="animate-float">
        <Shadow k={k} cx={210} cy={128} rx={24} ry={6} o={0.6} />
        <circle cx={210} cy={100} r={30} className="animate-pulse-ring" style={{ fill: 'var(--c4)', opacity: 0.3, transformOrigin: '210px 100px', transformBox: 'view-box' }} />
        <ClayRect k={k} tone="c4" x={190} y={66} w={40} h={52} rx={20} />
        <ClayCircle k={k} tone="c3" cx={210} cy={86} r={9} />
      </g>
    </Svg>
  )
}

/** Before: scattered spreadsheets, notes and chat bubbles. */
export function BeforeArt({ label }: { label: string }) {
  const k = useClay()
  const sheets = [
    { x: 40, y: 60, r: -12 }, { x: 170, y: 30, r: 8 }, { x: 330, y: 80, r: -6 }, { x: 90, y: 230, r: 10 }, { x: 260, y: 210, r: -14 }, { x: 420, y: 230, r: 6 },
  ]
  return (
    <Svg label={label} viewBox="0 0 600 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {k.defs}
      <rect width="600" height="400" style={{ fill: 'var(--c2)' }} />
      {sheets.map((s, i) => (
        <g key={i} transform={`rotate(${s.r} ${s.x + 70} ${s.y + 50})`}>
          <ClayRect k={k} tone={i % 2 ? 'c4' : 'c3'} x={s.x} y={s.y} w={140} h={100} rx={12} />
          <g style={{ stroke: i % 2 ? 'var(--c1)' : 'var(--c4)', strokeWidth: 2, opacity: 0.4 }}>
            {[0, 1, 2, 3].map((r) => <path key={r} d={`M${s.x + 12} ${s.y + 22 + r * 18} h116`} />)}
            {[0, 1, 2].map((c) => <path key={c} d={`M${s.x + 44 + c * 32} ${s.y + 12} v78`} />)}
          </g>
        </g>
      ))}
      {[{ x: 470, y: 40 }, { x: 20, y: 170 }, { x: 330, y: 320 }].map((b, i) => (
        <g key={i} transform={`rotate(${i * 7 - 6} ${b.x} ${b.y})`}>
          <ClayRect k={k} tone="c1" x={b.x} y={b.y} w={110} h={46} rx={23} />
          <circle cx={b.x + 28} cy={b.y + 23} r={4} style={{ fill: 'var(--c4)' }} />
          <circle cx={b.x + 44} cy={b.y + 23} r={4} style={{ fill: 'var(--c4)' }} />
          <circle cx={b.x + 60} cy={b.y + 23} r={4} style={{ fill: 'var(--c4)' }} />
        </g>
      ))}
      {[{ x: 250, y: 140, t: 'c4' }, { x: 500, y: 150, t: 'c3' }, { x: 160, y: 320, t: 'c4' }].map((n, i) => (
        <g key={i} transform={`rotate(${i * 9 - 8} ${n.x + 30} ${n.y + 30})`}>
          <ClayRect k={k} tone={n.t as 'c3' | 'c4'} x={n.x} y={n.y} w={62} h={62} rx={8} />
        </g>
      ))}
    </Svg>
  )
}

/** After: one organised workspace. */
export function AfterArt({ label }: { label: string }) {
  const k = useClay()
  return (
    <Svg label={label} viewBox="0 0 600 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {k.defs}
      <rect width="600" height="400" style={{ fill: 'var(--c4)' }} />
      <ClayRect k={k} tone="c1" x={60} y={40} w={480} h={320} rx={28} />
      <rect x={76} y={56} width={84} height={288} rx={16} style={{ fill: 'var(--c2)' }} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={92} y={78 + i * 34} width={52} height={10} rx={5} style={{ fill: 'var(--c4)', opacity: i === 0 ? 0.9 : 0.3 }} />)}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={178 + i * 120} y={56} width={108} height={70} rx={14} style={{ fill: i === 1 ? 'var(--c3)' : 'var(--c2)' }} />
          <rect x={192 + i * 120} y={72} width={40} height={8} rx={4} style={{ fill: 'var(--c4)', opacity: 0.5 }} />
          <rect x={192 + i * 120} y={92} width={64} height={16} rx={6} style={{ fill: 'var(--c4)', opacity: 0.9 }} />
        </g>
      ))}
      <rect x={178} y={140} width={228} height={204} rx={14} style={{ fill: 'var(--c2)' }} />
      <path d="M194 300 C240 290 250 220 300 230 S360 170 392 162" fill="none" strokeLinecap="round" style={{ stroke: 'var(--c4)', strokeWidth: 5 }} />
      <path d="M194 300 C240 290 250 220 300 230 S360 170 392 162 V330 H194 Z" style={{ fill: 'var(--c4)', opacity: 0.1 }} />
      <rect x={418} y={140} width={106} height={204} rx={14} style={{ fill: 'var(--c2)' }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={436} cy={164 + i * 36} r={7} style={{ fill: i < 3 ? 'var(--c3)' : 'var(--c4)', opacity: i < 3 ? 1 : 0.3 }} />
          <rect x={450} y={160 + i * 36} width={58} height={8} rx={4} style={{ fill: 'var(--c4)', opacity: 0.5 }} />
        </g>
      ))}
    </Svg>
  )
}

/** 404 art. */
export function LostArt({ label }: { label: string }) {
  const k = useClay()
  return (
    <Svg label={label} viewBox="0 0 400 400" className="h-full w-full">
      {k.defs}
      <ClayRing k={k} cx={200} cy={200} rx={180} ry={50} w={8} part="back" />
      <g className="animate-float-slow"><ClayBuddy k={k} pose="think" body="c3" glasses /></g>
      <ClayRing k={k} cx={200} cy={200} rx={180} ry={50} w={8} part="front" />
      <g className="animate-float"><ClayEllipse k={k} tone="c4" cx={80} cy={80} rx={22} ry={22} /></g>
    </Svg>
  )
}
