module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.$Sequelize

  return app.$model.define('rbacResources', {
    id: {
      type: INTEGER(3).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'ID'
    },
    name: {
      type: STRING(50),
      allowNull: false,
      comment: '名称'
    },
    code: {
      type: STRING(50),
      comment: '代码'
    },
    description: {
      type: TEXT('tiny'),
      comment: '描述'
    },
    alias: {
      type: STRING(50),
      comment: '别名'
    }
  })
}
