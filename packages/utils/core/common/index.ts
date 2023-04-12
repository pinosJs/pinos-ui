import { validateType } from '../validate/validate-type'

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
