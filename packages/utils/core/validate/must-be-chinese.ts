export function mustBeChinese(value: string) {
  value = value.trim()
  if (!value)
    return false

  const reg = /^[\u4E00-\u9FA5]{0,}$/g
  return reg.test(value)
}
