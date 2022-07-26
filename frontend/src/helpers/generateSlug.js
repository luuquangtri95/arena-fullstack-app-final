export function generateSlug(str) {
  if (!String(str) || str.length === 0) return
  let resultStr = `${str.split(' ').join('-')}-${Date.now()}`

  if (resultStr.length > 150) return resultStr.slice(0, 150)
}
