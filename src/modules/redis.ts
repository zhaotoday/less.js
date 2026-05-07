import { createClient } from 'redis'
import type { LessApp } from '../types'

/** Creates a Redis client using `app.$config.REDIS`. */
export function createRedisModule(app: LessApp) {
  return createClient(app.$config.REDIS ?? {})
}
