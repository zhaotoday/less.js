import type { LessApp } from '../types'

/** 根据 `app.$config.DB` 创建 Sequelize 实例。 */
export function createModel(app: LessApp) {
  const config = app.$config.DB

  if (!config)
    return null

  const { database, username, password, options = {} } = config
  return new app.$Sequelize.Sequelize(database, username, password, options)
}
