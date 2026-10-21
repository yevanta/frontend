import { useEffect } from 'react'
import { site } from '../../content'

declare global {
  interface Window {
    chatwootSettings?: Record<string, unknown>
    chatwootSDK?: { run: (opts: { websiteToken: string; baseUrl: string }) => void }
  }
}

/**
 * Chatwoot live chat (Chatwoot's own embed, loaded once for the whole site).
 * It waits for the page to load and the browser to go idle, so it never competes
 * with the first paint or the hero animation.
 */
export function ChatWidget() {
  useEffect(() => {
    const { baseUrl, websiteToken, position, type, launcherTitle } = site.chat
    if (!websiteToken || document.getElementById('chatwoot-sdk')) return
    let idleId: number | undefined
    let timer: number | undefined

    const inject = () => {
      window.chatwootSettings = { position, type, launcherTitle }
      const s = document.createElement('script')
      s.id = 'chatwoot-sdk'
      s.src = `${baseUrl}/packs/js/sdk.js`
      s.async = true
      s.onload = () => window.chatwootSDK?.run({ websiteToken, baseUrl })
      document.body.appendChild(s)
    }
    const whenIdle = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(inject, { timeout: 4000 })
      else timer = globalThis.setTimeout(inject, 1500) as unknown as number
    }
    const afterLoad = () => { timer = window.setTimeout(whenIdle, 2500) }

    if (document.readyState === 'complete') afterLoad()
    else window.addEventListener('load', afterLoad, { once: true })
    return () => {
      window.removeEventListener('load', afterLoad)
      if (timer) window.clearTimeout(timer)
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
    }
  }, [])
  return null
}
