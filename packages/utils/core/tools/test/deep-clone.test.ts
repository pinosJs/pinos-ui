/* eslint-disable no-new-wrappers */
import { validateType } from '../../validate/validate-type'
import { deepClone } from '../deep-clone'

const checkSet = (target: Set<any>, value: any) => {
  let flag = false
  target.forEach((item: any) => {
    if (validateType(item, 'Set') && item.has(value))
      flag = true
  })
  return flag
}
describe('test deepClone', () => {
  it('should export module', () => {
    expect(deepClone).toBeDefined()
  })

  it('clone Number', () => {
    const source = Number(1)
    const source2 = 1
    const source3 = new Number(1)
    const clone = deepClone(source)
    const clone2 = deepClone(source2)
    const clone3 = deepClone(source3)
    expect(clone).toBe(source)
    expect(clone2).toBe(source2)
    expect(typeof clone3).toBe('object')
    expect(clone3).not.toBe(source3)
    expect(clone3).toStrictEqual(source3)
  })

  it('clone String', () => {
    const source = String('foo')
    const source2 = 'foo'
    const source3 = new String('foo')
    const clone = deepClone(source)
    const clone2 = deepClone(source2)
    const clone3 = deepClone(source3)
    expect(clone).toBe(source)
    expect(clone2).toBe(source2)
    expect(typeof clone3).toBe('object')
    expect(clone3).not.toBe(source3)
    expect(clone3).toStrictEqual(source3)
  })

  it('clone Boolean', () => {
    const source = Boolean(true)
    const source2 = true
    const source3 = new String(true)
    const clone = deepClone(source)
    const clone2 = deepClone(source2)
    const clone3 = deepClone(source3)
    expect(clone).toBeTruthy()
    expect(clone2).toBeTruthy()
    expect(clone3).toBeTruthy()
    expect(typeof clone3).toBe('object')
    expect(clone3).not.toBe(source3)
    expect(clone3).toStrictEqual(source3)
  })

  it('clone Date', () => {
    const source = new Date('2021-02-02')
    const cloneTarget = deepClone(source)
    expect(cloneTarget).not.toBe(source)
    expect(cloneTarget).toStrictEqual(source)
  })

  it('clone Error', () => {
    const source = new Error('123')
    const cloneTarget = deepClone(source)
    expect(cloneTarget).not.toBe(source)
    expect(cloneTarget.message).toStrictEqual(source.message)
  })

  it('clone Symbol', () => {
    const source = Symbol('foo')
    const cloneTarget = deepClone(source)
    expect(source === cloneTarget).toBeFalsy()
    expect(source.toString()).toStrictEqual(cloneTarget.toString())
  })

  it('clone Set', () => {
    const subSet = new Set(['yan'])
    const source = new Set(['foo', 'json', subSet])
    const cloneTarget = deepClone(source)

    expect(cloneTarget).not.toBe(source)
    expect(cloneTarget.has('foo')).toBeTruthy()

    expect(source.has(subSet)).toBeTruthy()
    expect(cloneTarget.has(subSet)).toBeFalsy()
    expect(checkSet(cloneTarget, 'yan')).toBeTruthy()
    subSet.add('ok')
    expect(checkSet(source, 'ok')).toBeTruthy()
    expect(checkSet(cloneTarget, 'ok')).toBeFalsy()

    cloneTarget.add('123')
    expect(cloneTarget.has('123')).toBeTruthy()
    expect(source.has('123')).toBeFalsy()

    source.delete('foo')
    expect(cloneTarget.has('foo')).toBeTruthy()
    expect(source.has('foo')).toBeFalsy()
  })

  it('clone Map', () => {
    const subMap = new Map()
    subMap.set('name', 'jack')
    const source = new Map()
    source.set('age', 18)
    source.set('child', subMap)
    const cloneTarget = deepClone(source)

    expect(cloneTarget).not.toBe(source)
    expect(cloneTarget.get('age')).toBe(18)

    expect(cloneTarget.has('child')).toBeTruthy()
    expect(cloneTarget.get('child').get('name')).toBe('jack')
    subMap.set('desc', 'hello world')
    expect(cloneTarget.get('child').has('desc')).toBeFalsy()
    expect(source.get('child').has('desc')).toBeTruthy()

    cloneTarget.set('msg', '123')
    expect(cloneTarget.get('msg')).toBe('123')
    expect(source.has('msg')).toBeFalsy()

    source.delete('age')
    expect(cloneTarget.has('age')).toBeTruthy()
    expect(source.has('age')).toBeFalsy()
  })

  it('clone Object or Array', () => {
    const source: any = {
      num: {
        num1: 1,
        num2: Number(1),
        num3: new Number(1)
      },
      str: {
        str1: '1',
        str2: String('1'),
        str3: new String('1')
      },
      bool: {
        bool1: true,
        bool2: Boolean(true),
        bool3: new Boolean(true)
      },
      date: new Date(),
      sym: Symbol('foo'),
      set: new Set([1]),
      map: new Map(),
      arr: [{
        list: [1, 2, 3]
      }],
      func: () => {
        return 123
      }
    }
    const cloneTarget = deepClone(source)

    expect(cloneTarget).not.toBe(source)
    expect(source.bool.bool1).toStrictEqual(cloneTarget.bool.bool1)
    expect(source.date).toStrictEqual(cloneTarget.date)
    expect(cloneTarget.set.has(1)).toBeTruthy()
    expect(cloneTarget.set).not.toBe(source.set)
    expect(source.func()).toStrictEqual(cloneTarget.func())
    cloneTarget.arr[0].list[0] = 123
    expect(cloneTarget.arr[0].list[0]).toStrictEqual(123)
    expect(source.arr[0].list[0]).not.toStrictEqual(123)
  })

  it('test loop', () => {
    const source: any = {
      a: 1
    }
    source.baz = source
    expect(() => deepClone(source)).not.toThrowError()
  })

  it('test loop map', () => {
    const source: any = new Map()
    source.set('baz', source)

    expect(() => deepClone(source)).not.toThrowError()
  })
})
