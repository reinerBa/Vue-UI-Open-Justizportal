// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
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