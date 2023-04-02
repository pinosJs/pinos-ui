import { mergeObject } from '../merge-object'

describe('test mergeObject', () => {
  it('should export module', () => {
    expect(mergeObject).toBeDefined()
  })

  it('should merge', () => {
    const source = {
      name: 'zhangshan',
      obj: {
        name: 'sourceName'
      },
      arr: [2, { name: 'source', age: 18 }]
    }
    const target = {
      obj: {
        name: 'targetName'
      },
      tObj: {
        name: 'target'
      },
      tArr: [{
        age: {
          age: 18
        }
      }],
      arr: [2, { name: 'target', age: 20, desc: '我是target特有的' }],
      tFunc: () => {
        return 123
      }
    }

    const obj = mergeObject(source, target)
    const arrObj = obj.arr[1] as Record<string, any>
    const tArrObj = obj.tArr[0] as Record<string, any>
    expect(obj.name).toStrictEqual('zhangshan')
    expect(obj.obj.name).toStrictEqual('targetName')
    expect(arrObj.name).toStrictEqual('target')
    expect(arrObj.age).toStrictEqual(20)
    expect(arrObj.desc).toStrictEqual('我是target特有的')
    expect(obj.tObj.name).toStrictEqual('target')
    expect(tArrObj.age.age).toStrictEqual(18)
    expect(obj.tFunc()).toStrictEqual(123)

    obj.name = '123'
    expect(obj.name).toStrictEqual('123')
    expect(source.name).not.toStrictEqual('123')
  })

  it('loop object', () => {
    const source: any = {
      a: 1
    }
    source.b = source
    const target = {
      a: 2
    }

    expect(() => mergeObject(source, target)).not.toThrowError()
  })
})
