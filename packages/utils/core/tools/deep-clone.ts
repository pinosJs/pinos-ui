import { isTargetTag, forEach } from '../common/index'
import { validateType } from '../validate/validate-type'

const deepTag = ['Map', 'Set', 'Array', 'Object']
const ctorTag = ['Boolean', 'Number', 'String', 'Date']

function isObject(target: any) {
  const type = typeof target

  return target !== null && (type === 'object' || type === 'symbol')
}

function initCloneTarget(target: any) {
  // 用它会是 Set 和 Map 一些属性丢失掉
  /**
   * eg:
   * a = new Set(['foo'])
   * b = Object.create(a.constructor.prototype)
   * b.add('1')
   * // TypeError: Method Set.prototype.add called on incompatible receiver #<Set>
   */
  // return Object.create(target.constructor.prototype)
  const Ctor = target.constructor
  return new Ctor()
}

function cloneSymbol(target: symbol) {
  return Object(Symbol.prototype.valueOf.call(target))
}

function cloneRegExp(regexp: any) {
  const reFlags = /\w*$/
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
  result.lastIndex = regexp.lastIndex
  return result
}

function cloneOtherType(target: any) {
  const Ctor = target.constructor

  if (isTargetTag(target, ctorTag))
    return new Ctor(target)
  else if (validateType(target, 'Error'))
    return new Ctor(target.message)
  else if (validateType(target, 'RegExp'))
    return cloneRegExp(target)
  else if (validateType(target, 'Symbol'))
    return cloneSymbol(target)
  else
    return null
}

function clone(target: any, _map = new WeakMap()) {
  if (!isObject(target))
    return target

  let cloneTarget: any
  if (isTargetTag(target, deepTag)) {
    cloneTarget = initCloneTarget(target)
  } else {
    // 处理 new Number(), new Boolean(), new Date() 等
    return cloneOtherType(target)
  }

  // 处理循环引用
  if (_map.has(target))
    return target

  _map.set(target, cloneTarget)

  // 处理 set
  if (validateType(target, 'Set')) {
    target.forEach((val: any) => {
      cloneTarget.add(clone(val, _map))
    })
    return cloneTarget
  }

  // 处理 map
  if (validateType(target, 'Map')) {
    target.forEach((value: any, key:any) => {
      cloneTarget.set(key, clone(value, _map))
    })
    return cloneTarget
  }

  // 处理 object 和 array
  const keys = validateType(target, 'Array') ? undefined : Object.keys(target)
  forEach(keys || target, (value: any, key: any) => {
    if (keys)
      key = value

    cloneTarget[key] = clone(target[key], _map)
  })

  return cloneTarget
}

export function deepClone(target: unknown) {
  return clone(target)
}
