import { calcDistanceByPoint } from '../get-distance'

describe('test export module', () => {
  it('should export module', () => {
    expect(calcDistanceByPoint).toBeDefined()
  })
})

describe('test calcDistanceByPoint', () => {
  it('should work', () => {
    const data = calcDistanceByPoint({
      lat: 22.554389,
      lng: 114.136683
    }, {
      lat: 22.545544,
      lng: 113.992667
    })
    const { distance, distanceStr } = data
    expect(distance).toBe(14845.730146145846)
    expect(distanceStr).toBe('14.8km')
  })
})

describe('test fixed with calcDistanceByPoint', () => {
  it('should work', () => {
    const data = calcDistanceByPoint({
      lat: 22.554389,
      lng: 114.136683
    }, {
      lat: 22.545544,
      lng: 113.992667
    }, { fixed: 3 })
    const { distanceStr } = data
    expect(distanceStr).toBe('14.846km')
  })
})

describe('test fixed with calcDistanceByPoint', () => {
  it('should work', () => {
    const data = calcDistanceByPoint({
      lat: 22.554389,
      lng: 114.136683
    }, {
      lat: 22.545544,
      lng: 113.992667
    }, {
      formatCb: (d) => {
        return `计算出来的距离为：${d.toFixed(1)}m`
      }
    })
    const { distanceStr } = data
    expect(distanceStr).toBe('计算出来的距离为：14845.7m')
  })
})
