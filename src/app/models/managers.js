module.exports = app => {
  const {INTEGER} = app.$Sequelize
  const {SHORT_ID, USERNAME, PASSWORD, RANK} = app.$model.columns

  return app.$model.define('managers', {
    id: SHORT_ID,
    username: USERNAME,
    password: PASSWORD,
    rank: RANK,
    status: {
      type: INTEGER(1),
      isIn: [[0, 1]],
      allowNull: true
    }
  })
}
