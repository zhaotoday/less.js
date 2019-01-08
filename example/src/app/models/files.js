module.exports = app => {
  const { STRING, INTEGER } = app.$Sequelize

  return app.$model.define('files', {
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
    type: {
      type: STRING(50),
      allowNull: false,
      comment: '类型'
    },
    size: {
      type: STRING(50),
      allowNull: false,
      comment: '尺寸'
    },
    dir: {
      type: STRING(10),
      comment: '目录'
    },
    uuid: {
      type: STRING(36),
      comment: '唯一 ID'
    },
    ext: {
      type: STRING(10),
      allowNull: false,
      comment: '后缀'
    },
    model: {
      type: STRING(50),
      comment: '模型'
    }
  })
}
