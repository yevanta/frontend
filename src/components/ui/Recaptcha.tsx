import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'

type Grecaptcha = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => number
  reset: (id?: number) => void
}
declare global {
  interface Window { grecaptcha?: Grecaptcha; __yevantaRecaptchaReady?: () => void }
}

export type RecaptchaHandle = { reset: () => void }

/** Google's script is loaded once, on demand (explicit render mode). */
let loader: Promise<Grecaptcha> | null = null
function loadRecaptcha() {
  if (!loader) {
    loader = new Promise<Grecaptcha>((resolve, reject) => {
      window.__yevantaRecaptchaReady = () => resolve(window.grecaptcha as Grecaptcha)
      const s = document.createElement('script')
      s.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=__yevantaRecaptchaReady'
      s.async = true
      s.defer = true
      s.onerror = () => { loader = null; reject(new Error('reCAPTCHA failed to load')) }
      document.head.appendChild(s)
    })
  }
  return loader
}

/**
 * reCAPTCHA v2 checkbox. Loads when it comes near the viewport, reports the token through
 * onToken ('' when it expires), and switches to the compact widget where 304px will not fit.
 */
export function Recaptcha({ siteKey, onToken, loadingText, errorText, ref }: {
  siteKey: string
  onToken: (token: string) => void
  loadingText: string
  errorText: string
  ref?: Ref<RecaptchaHandle>
}) {
  const box = useRef<HTMLDivElement>(null)
  const widget = useRef<number | null>(null)
  const [state, setState] = useState<'idle' | 'ready' | 'error'>('idle')
  const tokenCb = useRef(onToken)
  tokenCb.current = onToken

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widget.current != null) window.grecaptcha?.reset(widget.current)
      tokenCb.current('')
    },
  }), [])

  useEffect(() => {
    const el = box.current
    if (!el) return
    let cancelled = false
    const start = () => {
      loadRecaptcha().then((g) => {
        if (cancelled || widget.current != null || !box.current) return
        widget.current = g.render(box.current, {
          sitekey: siteKey,
          theme: 'dark',
          size: box.current.clientWidth < 304 ? 'compact' : 'normal',
          callback: (t: string) => tokenCb.current(t),
          'expired-callback': () => tokenCb.current(''),
          'error-callback': () => tokenCb.current(''),
        })
        setState('ready')
      }).catch(() => !cancelled && setState('error'))
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); start() }
    }, { rootMargin: '600px 0px' })
    io.observe(el)
    return () => { cancelled = true; io.disconnect() }
  }, [siteKey])

  return (
    <div className="min-h-[78px]">
      <div ref={box} className="max-w-full" />
      {state === 'idle' && <p className="label text-[10px] subtle">{loadingText}</p>}
      {state === 'error' && <p role="alert" className="text-sm font-semibold">{errorText}</p>}
    </div>
  )
}
