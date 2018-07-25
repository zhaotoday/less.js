module.exports = app => {
  const { database, username, password, options } = app.$consts.DB
  const Op = app.$Sequelize.Op

  // 如果你使用默认别名并且不限制它们，Sequelize会发出警告。
  // 如果您想继续使用所有默认别名（不包括旧版别名）而不发出警告，您可以传递以下运算符参数
  // 参考链接：https://demopark.github.io/sequelize-docs-Zh-CN/querying.html
  Object.assign(options, {
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $overlap: Op.overlap,
      $contains: Op.contains,
      $contained: Op.contained,
      $adjacent: Op.adjacent,
      $strictLeft: Op.strictLeft,
      $strictRight: Op.strictRight,
      $noExtendRight: Op.noExtendRight,
      $noExtendLeft: Op.noExtendLeft,
      $and: Op.and,
      $or: Op.or,
      $any: Op.any,
      $all: Op.all,
      $values: Op.values,
      $col: Op.col
    }
  })

  return new app.$Sequelize(database, username, password, options)
}
