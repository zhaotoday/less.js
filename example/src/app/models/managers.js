module.exports = app => {
  const { STRING, INTEGER } = app.$Sequelize

  return app.$model.define('managers', {
    id: {
      type: INTEGER(6).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'ID'
    },
    username: {
      type: STRING(50),
      allowNull: false,
      comment: '用户名'
    },
    password: {
      type: STRING(100),
      allowNull: false,
      comment: '密码'
    },
    rank: {
      type: INTEGER(4).UNSIGNED,
      comment: '等级'
    },
    status: {
      type: INTEGER(1),
      isIn: [[0, 1]],
      comment: '状态'
    }
  })
}
