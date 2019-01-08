module.exports = app => {
  const { STRING, TEXT, INTEGER } = app.$Sequelize

  return app.$model.define('categories', {
    id: {
      type: INTEGER(6).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'ID'
    },
    parentId: {
      type: INTEGER(6).UNSIGNED,
      comment: '父级 ID',
      defaultValue: 0
    },
    title: {
      type: STRING(200),
      allowNull: false,
      comment: '标题'
    },
    description: {
      type: TEXT('tiny'),
      comment: '描述'
    },
    order: {
      type: INTEGER(6).UNSIGNED,
      comment: '次序'
    },
    model: {
      type: STRING(50),
      comment: '模型'
    },
    alias: {
      type: STRING(50),
      comment: '别名'
    }
  })
}
