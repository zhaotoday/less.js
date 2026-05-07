import type { AppFactory, LessApp } from '../types'
import { loadModule } from '../utils/load-module'

/** 创建应用初始化钩子。 */
export function createInitialize(app: LessApp) {
  return async () => {
    const initialize = await loadModule<AppFactory<void>>(`${app.$paths.extends}/initialize`)

    if (initialize)
      await initialize(app)
  }
}
