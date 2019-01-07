module.exports = {
  toLowerCamelCase (str) {
    return str.replace(/-([a-z])/g, (all, letter) => letter.toUpperCase())
  },
  formatRouteURL (url) {
    const urlItems = url.split('/')

    if (urlItems[urlItems.length - 2] === 'actions') {
      const splicedURLItems = urlItems.splice(urlItems.length - 2, 1)
      return this.toCamelCase([...urlItems, ...splicedURLItems].join('/'))
    } else {
      return this.toCamelCase(url)
    }
  }
}
