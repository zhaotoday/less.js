module.exports = (router, path, controller) => {
  const methods = ['get', 'post', 'put', 'del']

  methods.forEach(value => {
    if (controller[value]) {
      router.get(`${path}/:id?`, controller[value])
    }
  })
}
