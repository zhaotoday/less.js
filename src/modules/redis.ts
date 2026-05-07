import { createClient } from 'redis'
import type { LessApp } from '../types'

/** 使用 `app.$config.REDIS` 创建 Redis 客户端。 */
export function createRedisModule(app: LessApp) {
  return createClient(app.$config.REDIS ?? {})
}
