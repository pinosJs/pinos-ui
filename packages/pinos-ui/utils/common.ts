export function UpperCamelCase(str: string) {
  const strList = str.trim().split('-').filter(s => s.trim())
  return strList.map((s) => {
    const f = s[0] as string
    s = s.replace(f, f.toUpperCase())
    return s
  }).join('')
}

export function validateType(target: unknown, type: string) {
  if (type === 'NaN')
    return Number.isNaN(target)
  else
    return Object.prototype.toString.call(target) === `[object ${type}]`
}

export function isTargetTag(target: unknown, tags: string[]) {
  return tags.some(i => validateType(target, i))
}

// 执行效率普通for和while最高
export function forEach(arr: any[], cb: (...args: any[]) => void) {
  let i = -1
  const len = arr.length
  while (++i < len)
    cb(arr[i], i)

  return arr
}

/**
 * 将命名转换为首字母大写的驼峰
 *
 * @param value 需要转换的命名
 */

type CapitalCase<T extends string> = T extends `${infer First}-${infer Rest}`
  ? `${Capitalize<First>}${CapitalCase<Rest>}`
  : Capitalize<T>

export function toCapitalCase<T extends string>(value: T) {
  return (value.charAt(0).toUpperCase() +
    value
      .slice(1)
      .replace(/-(\w)/g, (_, char) => (char ? char.toUpperCase() : ''))) as CapitalCase<T>
}

/**
 *  将命名转换为驼峰命名
 *
 * @param value 需要转换的命名
 */
export function toCamelCase(value: string) {
  const capitalName = toCapitalCase(value)

  return capitalName.charAt(0).toLowerCase() + capitalName.slice(1)
}
