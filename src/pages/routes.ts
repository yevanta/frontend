import { lazy } from 'react'

/** Route chunks: lazy so each page (and its heavy sections) loads on demand. */
const loaders = {
  '/product': () => import('./Product'),
}

export const ProductPage = lazy(loaders['/product'])

const started = new Set<string>()
export function preloadRoute(path: string) {
  if (started.has(path) || !(path in loaders)) return
  started.add(path)
  void loaders[path as keyof typeof loaders]()
}
