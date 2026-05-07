import { resolve } from 'node:path'
import type { LessApp } from '../types'
import { loadModule } from '../utils/load-module'

/** Creates an application-root aware dynamic importer. */
export function createRequire(app: LessApp) {
  return <T = unknown>(modulePath: string) => loadModule<T>(resolve(app.$root, modulePath))
}
