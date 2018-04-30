module.exports = (router, path, controller) => {
  const methods = ['get', 'post', 'put', 'del']

  methods.forEach(value => {
    if (controller[value]) {
      router[value](`${path}/:id?`, controller[value])
    }
  })
}
