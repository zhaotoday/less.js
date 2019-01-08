module.exports = app => {
  const Categories = require('./categories')(app)
  const { STRING, TEXT, INTEGER } = app.$Sequelize

  const Articles = app.$model.define('articles', {
    id: {
      type: INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'ID'
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
    content: {
      type: TEXT('long'),
      comment: '内容'
    },
    picture: {
      type: STRING(10),
      comment: '图片'
    },
    order: {
      type: INTEGER(10).UNSIGNED,
      comment: '次序'
    },
    alias: {
      type: STRING(50),
      comment: '别名'
    }
  })

  Articles.belongsTo(Categories)

  return Articles
}
