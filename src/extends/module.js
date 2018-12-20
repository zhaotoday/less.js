module.exports = app => {
  /**
   * 加载模块
   * @param {string} module 模块路劲
   * @returns {any}
   */
  return module => require(`../modules/${module}`)
}
