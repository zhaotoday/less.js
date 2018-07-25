/**
 * 预设的数据库表列
 */
module.exports = app => {
  const { STRING, TEXT, INTEGER, FLOAT } = app.$Sequelize

  return {
    // 自增 ID，主键
    ID: {
      type: INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // 短自增 ID，主键
    SHORT_ID: {
      type: INTEGER(6).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // 关联 ID
    RELATED_ID: {
      type: INTEGER(10).UNSIGNED,
      allowNull: true
    },
    // 短关联 ID
    SHORT_RELATED_ID: {
      type: INTEGER(6).UNSIGNED,
      allowNull: true
    },
    // 排序
    ORDER: {
      type: INTEGER(10).UNSIGNED,
      allowNull: true
    },
    // 短排序
    SHORT_ORDER: {
      type: INTEGER(6).UNSIGNED,
      allowNull: true
    },
    // 标题
    TITLE: {
      type: STRING(200),
      allowNull: false
    },
    // 副标题
    SUBTITLE: {
      type: STRING(200),
      allowNull: true
    },
    // 描述
    DESCRIPTION: {
      type: TEXT('tiny'),
      allowNull: true
    },
    // 内容
    CONTENT: {
      type: TEXT('long'),
      allowNull: true
    },
    // 图片列表
    PICTURES: {
      type: STRING(200),
      allowNull: true
    },
    // 模型
    MODULE: {
      type: STRING(50),
      allowNull: true
    },
    // 名称
    NAME: {
      type: STRING(50),
      allowNull: true
    },
    // 用户名
    USERNAME: {
      type: STRING(50),
      allowNull: false
    },
    // 密码
    PASSWORD: {
      type: STRING(100),
      allowNull: false
    },
    // 电话
    TELEPHONE: {
      type: STRING(50),
      allowNull: true
    },
    // 手机
    CELLPHONE: {
      type: STRING(50),
      allowNull: true
    },
    // 邮箱
    EMAIL: {
      type: STRING(100),
      allowNull: true
    },
    // 地址
    ADDRESS: {
      type: STRING(200),
      allowNull: true
    },
    // 邮编
    POSTCODE: {
      type: STRING(50),
      allowNull: true
    },
    // 等级
    RANK: {
      type: INTEGER(4).UNSIGNED,
      allowNull: true
    },
    // 价格
    PRICE: {
      type: FLOAT(10),
      allowNull: true
    },
    // 库存
    STOCK: {
      type: INTEGER(8),
      allowNull: true
    },
    // 单位
    UNIT: {
      type: STRING(50),
      allowNull: true
    }
  }
}
