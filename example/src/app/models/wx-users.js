module.exports = app => {
  const { STRING, INTEGER } = app.$Sequelize

  return app.$model.define('wxUsers', {
    id: {
      type: INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'ID'
    },
    openId: {
      type: STRING(50),
      comment: 'openId'
    },
    unionId: {
      type: STRING(50),
      comment: 'unionId'
    },
    avatarUrl: {
      type: STRING(200),
      comment: '头像'
    },
    nickName: {
      type: STRING(100),
      comment: '昵称'
    },
    gender: {
      type: STRING(1),
      comment: '性别'
    },
    language: {
      type: STRING(50),
      comment: '语言'
    },
    city: {
      type: STRING(50),
      comment: '城市'
    },
    province: {
      type: STRING(50),
      comment: '省份'
    },
    country: {
      type: STRING(50),
      comment: '国家'
    },
    telephone: {
      type: STRING(11),
      comment: '手机号'
    },
    alias: {
      type: STRING(50),
      comment: '别名'
    }
  })
}
