export function existEmoji(value: string) {
  value = value.trim()
  if (!value)
    return false

  const reg = /(\uD83C[\uDF00-\uDFFF])|(\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF])|[\u2600-\u2B55]/g
  return reg.test(value)
}
