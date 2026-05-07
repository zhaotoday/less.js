/** Converts a kebab-case segment to lower camel case. */
export function toLowerCamelCase(value: string) {
  return value.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

/** Capitalizes the first character of a string. */
export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/** Formats controller file paths into REST route paths. */
export function formatRouteURL(url: string) {
  const urlItems = url.split('/')

  if (urlItems[urlItems.length - 2] === 'actions') {
    const splicedURLItems = urlItems.splice(urlItems.length - 2, 1)
    return toLowerCamelCase([...urlItems, ...splicedURLItems].join('/'))
  }

  return toLowerCamelCase(url)
}
