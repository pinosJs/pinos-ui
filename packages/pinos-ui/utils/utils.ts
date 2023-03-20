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
