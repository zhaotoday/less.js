import type { AppFactory, LessApp, LessHelpers } from '../types'
import { loadModule } from '../utils/load-module'

function parseJSON<T>(value: unknown, fallback: T): T {
  if (value == null)
    return fallback

  if (typeof value !== 'string')
    return value as T

  return JSON.parse(value) as T
}

/** Creates built-in helpers and merges optional helpers from `src/extends/helpers`. */
export async function createHelpers(app: LessApp): Promise<LessHelpers> {
  const helpers: LessHelpers = {
    formatQuery(query) {
      const {
        include = 'null',
        attributes = 'null',
        offset = 0,
        limit = app.$config.PAGE_SIZE ?? -1,
        group = 'null',
        where = '{}',
        order = JSON.stringify([['id', 'DESC']]),
      } = query

      const parsedLimit = Number(limit)

      return {
        include: parseJSON(include, null),
        attributes: parseJSON(attributes, null),
        offset: Number(offset),
        limit: parsedLimit === -1 ? undefined : parsedLimit,
        group: parseJSON(group, null),
        where: parseJSON(where, {}),
        order: parseJSON(order, [['id', 'DESC']]),
      }
    },

    random(length) {
      let ret = ''

      for (let i = 0; i < length; i += 1)
        ret += Math.floor(Math.random() * 10)

      return ret
    },

    sleep(duration) {
      return new Promise(resolve => setTimeout(resolve, duration))
    },
  }

  const helpersFactory = await loadModule<AppFactory<Partial<LessHelpers>>>(`${app.$paths.extends}/helpers`)
  const userHelpers = helpersFactory ? await helpersFactory(app) : {}

  return Object.assign(helpers, userHelpers)
}
