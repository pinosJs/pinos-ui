/**
 * 校验数字
 * @export
 * @param {(number | string)} value
 * @param {{
 *   fixed?: number // 精确到小数点多少位，默认是 0 代表整数
 *   negative?: boolean // 是否为负数
 *   unableZero?: boolean // 禁止输入0
 * }} cfg
 * @return {boolean}
 */
export function validateNumber(value: number | string, cfg?: {
  fixed?: number
  negative?: boolean
  unableZero?: boolean
}) {
  if (typeof value === 'number')
    value = value.toString()

  // 排除 '0.0' '-0' 这种无意义的数字
  if (value !== '0' && /^(-?)[0]+(\.[0]+)?$/.test(value))
    return false

  let reg: RegExp
  cfg = cfg || {}
  const { negative, unableZero } = cfg
  if (cfg.fixed !== undefined) {
    const fixed = Math.max(0, cfg.fixed)
    if (fixed === 0) {
      if (negative) {
        // 负整数
        reg = /^-[1-9]+$/
      } else {
        // 正整数
        if (unableZero) {
          // 不包含 0
          reg = /^[1-9]+$/
        } else {
          reg = /^\d+$/
        }
      }
    } else {
      if (negative) {
        // 负小数
        reg = new RegExp(`^-\\d+(\\.\\d{1,${fixed}})?$`)
      } else {
        // 正小数
        reg = new RegExp(`^\\d+(\\.\\d{1,${fixed}})?$`)
      }
    }
  } else {
    // 可以是正负数
    if (unableZero && value === '0')
      return false
    else
      reg = /^(-?)\d+(\.\d+)?$/
  }

  return reg.test(value)
}
