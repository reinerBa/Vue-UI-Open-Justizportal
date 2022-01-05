import { inject, InjectionKey } from 'vue'

export function injectStrict<T>(key: InjectionKey<T> | string, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    if(typeof key === 'symbol')
    throw new Error(`Could not resolve ${ key.description }`)
    throw new Error(`Could not resolve ${ key }`)
  }
  return resolved
}