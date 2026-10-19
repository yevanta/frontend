import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ease, motionCfg } from '../../motion'
import { usePrefs } from '../../lib/prefs'
import { useSmoothScroll } from '../../lib/scroll'
import { safeSessionGet, safeSessionSet } from '../../lib/storage'
import { Logo } from './Logo'

const INTRO_KEY = 'yevanta-intro-seen'

const IntroCtx = createContext({ done: true })
export const useIntro = () => useContext(IntroCtx)

/** Page-load intro: the logo draws, a rounded shape wipes up to reveal the hero, then content staggers in. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const { reduced } = usePrefs()
  // the intro plays once per browser session; reloads and later visits go straight to the content
  const [skip] = useState(() => reduced || safeSessionGet(INTRO_KEY) === '1')
  const [done, setDone] = useState(skip)
  const [show, setShow] = useState(!skip)
  const { lock, unlock } = useSmoothScroll()

  useEffect(() => {
    if (skip) {
      setDone(true)
      setShow(false)
      return
    }
    lock()
    const total = (motionCfg.intro.draw + motionCfg.intro.hold) * 1000
    const t1 = window.setTimeout(() => {
      setShow(false)
      setDone(true)
      safeSessionSet(INTRO_KEY, "1")
      unlock()
    }, total)
    return () => {
      window.clearTimeout(t1)
      unlock()
    }
  }, [skip, lock, unlock])

  return (
    <IntroCtx.Provider value={{ done }}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div key="intro" className="pointer-events-none fixed inset-0 z-[100]" aria-hidden exit={{ opacity: 1, transition: { duration: motionCfg.intro.wipe + motionCfg.intro.layerDelay } }}>
            <motion.div
              className="absolute inset-x-0 top-0 h-[120vh] bg-c3"
              style={{ borderBottomLeftRadius: '50% 14vh', borderBottomRightRadius: '50% 14vh' }}
              exit={{ y: '-120%', transition: { duration: motionCfg.intro.wipe, ease: ease.wipe, delay: motionCfg.intro.layerDelay } }}
            />
            <motion.div
              className="absolute inset-x-0 top-0 grid h-[120vh] place-items-center bg-c1 pb-[20vh]"
              style={{ borderBottomLeftRadius: '50% 14vh', borderBottomRightRadius: '50% 14vh' }}
              exit={{ y: '-120%', transition: { duration: motionCfg.intro.wipe, ease: ease.wipe } }}
            >
              <Logo height={72} animate />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroCtx.Provider>
  )
}
