import { forEach, validateType } from './common'
import { deepClone } from './deep-clone'

function merge<T extends Record<string, any>, U extends Record<string, any>>(source: T, target: U, isNewObj = true) {
  const sourceClone = isNewObj ? deepClone(source) : source

  const keys = Object.keys(target)
  forEach(keys, (key) => {
    const targetValue = target[key]
    const sourceValue = sourceClone[key]

    if (validateType(targetValue, 'Object'))
      sourceClone[key] = merge(sourceValue || {}, targetValue, false)
    else if (validateType(targetValue, 'Array'))
      sourceClone[key] = merge(sourceValue || [], targetValue, false)
    else
      sourceClone[key] = targetValue
  })

  return sourceClone as T & U
}

export function mergeObject<T extends Record<string, any>, U extends Record<string, any>>(source: T, target: U) {
  return merge(source, target)
}
