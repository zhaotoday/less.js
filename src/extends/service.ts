import type { ModelStatic } from 'sequelize'
import type { AppFactory, BaseServiceContract, LessApp } from '../types'
import { loadModule } from '../utils/load-module'

type Where = Record<PropertyKey, unknown>

const operatorKeys = new Set([
  'eq',
  'ne',
  'gte',
  'gt',
  'lte',
  'lt',
  'not',
  'in',
  'notIn',
  'is',
  'like',
  'notLike',
  'iLike',
  'notILike',
  'regexp',
  'notRegexp',
  'iRegexp',
  'notIRegexp',
  'between',
  'notBetween',
  'overlap',
  'contains',
  'contained',
  'adjacent',
  'strictLeft',
  'strictRight',
  'noExtendRight',
  'noExtendLeft',
  'and',
  'or',
  'any',
  'all',
  'values',
  'col',
])

function normalizeOperators(value: unknown, Op: typeof import('sequelize').Op): unknown {
  if (Array.isArray(value))
    return value.map(item => normalizeOperators(item, Op))

  if (!value || typeof value !== 'object')
    return value

  return Object.entries(value as Record<string, unknown>).reduce<Where>((ret, [key, item]) => {
    const operatorName = key.startsWith('$') ? key.slice(1) : ''
    const targetKey = operatorName && operatorKeys.has(operatorName)
      ? Op[operatorName as keyof typeof Op] as PropertyKey
      : key

    ret[targetKey] = normalizeOperators(item, Op)
    return ret
  }, {})
}

/** 创建绑定到当前应用的默认服务基类。 */
export async function createServiceClass(app: LessApp) {
  abstract class Service implements BaseServiceContract {
    /** 当前服务操作的 Sequelize 模型。 */
    Model: ModelStatic<any> | null = null

    /** 模型是否包含用于默认排序的 `order` 字段。 */
    hasOrder = false

    /** 默认的 Sequelize include 关联树。 */
    include?: unknown

    /** 按 ID 查询单条记录，或按查询参数查询列表。 */
    async find({
      id = '',
      include = null,
      attributes = null,
      offset = 0,
      limit = app.$config.PAGE_SIZE ?? 10,
      group = null,
      where = {},
      order = [['id', 'DESC']],
    }: Record<string, any> = {}) {
      this.assertModel()

      const normalizedInclude = include
        ? include.map((item: Record<string, any>) => ({
            ...item,
            model: typeof item.model === 'string'
              ? app.$models[item.model]
              : item.model,
            as: item.as,
          }))
        : null

      if (id) {
        return this.Model.findByPk(id, {
          include: normalizedInclude || this.include,
          attributes,
        })
      }

      const normalizedOrder = this.hasOrder && JSON.stringify(order) === JSON.stringify([['id', 'DESC']])
        ? [['order', 'DESC']]
        : order

      return this.Model.findAll({
        include: normalizedInclude || this.include,
        attributes,
        offset,
        limit: limit === -1 ? undefined : limit,
        group,
        where: normalizeOperators(where, app.$Sequelize.Op),
        order: normalizedOrder,
      })
    }

    /** 查询符合条件的上一条记录。 */
    async findPrev({ id = '', attributes = null, where = {}, order = [['order', 'ASC']] }: Record<string, any> = {}) {
      this.assertModel()
      const nextWhere = id ? { ...where, id: { $gt: id } } : where
      return (await this.Model.findAll({
        attributes,
        limit: 1,
        where: normalizeOperators(nextWhere, app.$Sequelize.Op),
        order,
      }))[0] || null
    }

    /** 查询符合条件的下一条记录。 */
    async findNext({ id = '', attributes = null, where = {} }: Record<string, any> = {}, order = [['order', 'DESC']]) {
      this.assertModel()
      const nextWhere = id ? { ...where, id: { $lt: id } } : where
      return (await this.Model.findAll({
        attributes,
        limit: 1,
        where: normalizeOperators(nextWhere, app.$Sequelize.Op),
        order,
      }))[0] || null
    }

    /** 按 ID 删除一条或多条记录。 */
    async destroy({ id }: { id: string }) {
      this.assertModel()
      const where = id.includes(',')
        ? { id: { $in: id.split(',') } }
        : { id }

      return this.Model.destroy({ where: normalizeOperators(where, app.$Sequelize.Op) })
    }

    /** 创建一条记录。 */
    async create({ body = null }: { body?: any } = {}) {
      this.assertModel()

      if (this.hasOrder) {
        const findPrevRes = await this.Model.findAll({
          limit: 1,
          order: [['id', 'DESC']],
        })
        body = { ...body, order: findPrevRes[0] ? Number(findPrevRes[0].get('id')) + 1 : 1 }
      }

      return this.Model.create(body)
    }

    /** 批量创建记录。 */
    async bulkCreate({ bodies = [] }: { bodies?: any[] } = {}) {
      this.assertModel()
      return this.Model.bulkCreate(bodies)
    }

    /** 按 ID 或自定义 where 条件更新记录。 */
    async update({ id, body = null, where }: { body?: any, id?: string, where?: Where } = {}) {
      this.assertModel()
      return this.Model.update(body, {
        where: normalizeOperators(id ? { id } : where, app.$Sequelize.Op),
      })
    }

    /** 统计符合 where 条件的记录数。 */
    async count({ where = {} }: { where?: Where } = {}) {
      this.assertModel()
      return this.Model.count({ where: normalizeOperators(where, app.$Sequelize.Op) })
    }

    /** 对一个或多个字段做递增操作。 */
    async increment({ body, where }: { body?: any, where?: Where } = {}) {
      this.assertModel()
      return this.Model.increment(body, { where: normalizeOperators(where, app.$Sequelize.Op) })
    }

    private assertModel(): asserts this is this & { Model: ModelStatic<any> } {
      if (!this.Model)
        throw new Error('Service.Model is not configured.')
    }
  }

  const serviceFactory = await loadModule<AppFactory<typeof Service>>(`${app.$paths.extends}/service`)
  return serviceFactory ? await serviceFactory(app) : Service
}
