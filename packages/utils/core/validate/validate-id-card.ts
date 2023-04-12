export function validateIdCard(value: string, last = false) {
  const reg = !last
    ? /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
    : /\d{5}[\dXx]$/

  return reg.test(value)
}
