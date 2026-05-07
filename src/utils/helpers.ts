/** 将 kebab-case 片段转换为 lowerCamelCase。 */
export function toLowerCamelCase(value: string) {
  return value.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

/** 将字符串首字母转换为大写。 */
export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/** 将控制器文件路径格式化为 REST 路由路径。 */
export function formatRouteURL(url: string) {
  const urlItems = url.split('/')

  if (urlItems[urlItems.length - 2] === 'actions') {
    const splicedURLItems = urlItems.splice(urlItems.length - 2, 1)
    return toLowerCamelCase([...urlItems, ...splicedURLItems].join('/'))
  }

  return toLowerCamelCase(url)
}
