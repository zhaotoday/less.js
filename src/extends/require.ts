import { resolve } from 'node:path'
import type { LessApp } from '../types'
import { loadModule } from '../utils/load-module'

/** 创建感知应用根目录的动态导入函数。 */
export function createRequire(app: LessApp) {
  return <T = unknown>(modulePath: string) => loadModule<T>(resolve(app.$root, modulePath))
}
