export function getSearchParams(key: string) {
  const url = window.location.href
  const searchIndex = url.indexOf('?')
  if (searchIndex === -1)
    return null

  let search = url.slice(searchIndex)
  const endIndex = search.lastIndexOf('#/')
  if (endIndex !== -1)
    search = search.slice(0, endIndex)

  const p = new URLSearchParams(search)
  return p.get(key)
}
