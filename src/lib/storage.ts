export function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage unavailable (private mode, blocked): the UI still works */
  }
}

export function safeSessionGet(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeSessionSet(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value)
  } catch {
    /* storage unavailable: the intro simply plays again */
  }
}
