import type { LessApp } from '../types'

/** Creates the Sequelize instance configured by `app.$config.DB`. */
export function createModel(app: LessApp) {
  const config = app.$config.DB

  if (!config)
    return null

  const { database, username, password, options = {} } = config
  return new app.$Sequelize.Sequelize(database, username, password, options)
}
