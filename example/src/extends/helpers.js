module.exports = app => {
  return {
    getFileURLById (id) {
      return `${app.$config.BASE_URL}/api/v1/public/files/${id}`
    }
  }
}
