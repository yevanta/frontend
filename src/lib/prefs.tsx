import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

type Prefs = {
  reduced: boolean
  touch: boolean
  small: boolean
  lowPower: boolean
  /** Rich effects (cursor, tilt, magnetic, parallax) */
  rich: boolean
}

const PrefsCtx = createContext<Prefs>({ reduced: false, touch: false, small: false, lowPower: false, rich: true })

export function PrefsProvider({ children }: { children: ReactNode }) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const touch = useMediaQuery('(hover: none), (pointer: coarse)')
  const small = useMediaQuery('(max-width: 767px)')
  const lowPower = useMemo(() => {
    const n = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    return (!!n.hardwareConcurrency && n.hardwareConcurrency <= 4) || (!!n.deviceMemory && n.deviceMemory <= 4) || !!n.connection?.saveData
  }, [])
  const value = useMemo<Prefs>(
    () => ({ reduced, touch, small, lowPower, rich: !reduced && !touch }),
    [reduced, touch, small, lowPower],
  )
  return <PrefsCtx.Provider value={value}>{children}</PrefsCtx.Provider>
}

export const usePrefs = () => useContext(PrefsCtx)
