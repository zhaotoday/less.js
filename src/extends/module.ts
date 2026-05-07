import type { LessApp } from '../types'
import { createJwtModule } from '../modules/jwt'
import { createRedisModule } from '../modules/redis'
import { createTimeModule } from '../modules/time'
import { createUuidModule } from '../modules/uuid'

/** 创建 `app.$module` 使用的内置模块加载器。 */
export function createModuleLoader(app: LessApp) {
  const modules = {
    jwt: () => createJwtModule(),
    redis: () => createRedisModule(app),
    time: () => createTimeModule(),
    uuid: () => createUuidModule(),
  }

  return async <T = unknown>(moduleName: string): Promise<T> => {
    const factory = modules[moduleName as keyof typeof modules]

    if (!factory)
      throw new Error(`Unknown Less.js module: ${moduleName}`)

    return factory() as T
  }
}
