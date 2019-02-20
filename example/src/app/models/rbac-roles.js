module.exports = app => {
  const { STRING, INTEGER, TEXT, JSON } = app.$Sequelize

  return app.$model.define('rbacRoles', {
    id: {
      type: INTEGER(6).UNSIGNED,
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
    permissions: {
      type: JSON,
      comment: '权限'
    },
    alias: {
      type: STRING(50),
      comment: '别名'
    }
  })
}
