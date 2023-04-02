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

/**
 * 将命名转换为短横线命名
 *
 * @param value 需要转换的命名
 */
export function toKebabCase(value: string) {
  return (
    value.charAt(0).toLowerCase() +
    value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}
