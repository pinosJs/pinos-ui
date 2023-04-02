import { formatDate, getDayJs } from './index'

describe('test format date', () => {
  it('should export module', () => {
    expect(formatDate).toBeDefined()
    expect(getDayJs).toBeDefined()
  })

  it('should throw Error', () => {
    expect(() => formatDate(Date.now(), '')).toThrowError('Please pass in the format attribute')
  })

  it('should work with null or undefined', () => {
    expect(formatDate(null)).toBe('')
    expect(() => getDayJs(null)).toThrowError('date parameter cannot be null or undefined')
  })

  it('should work with Date', () => {
    const date = new Date(2022, 2, 3, 0, 0, 0)
    expect(formatDate(date)).toBe('2022-03-03')
    expect(getDayJs(date).format('YYYY-MM-DD')).toBe('2022-03-03')
  })

  it('should work with Number', () => {
    const time = new Date(2022, 2, 3, 0, 0, 0).getTime()
    expect(formatDate(time)).toBe('2022-03-03')
    expect(getDayJs(time).format('YYYY-MM-DD')).toBe('2022-03-03')
  })

  it('should work with String', () => {
    expect(formatDate('2022/3/3 00:00:00')).toBe('2022-03-03')
    expect(getDayJs('2022/3/3 00:00:00').format('YYYY-MM-DD')).toBe('2022-03-03')
  })

  describe('format time', () => {
    it.each([{
      dateStr: '2022/3/3 12:24:08',
      formatStr: 'YY-MM-DD',
      expected: '22-03-03'
    }, {
      dateStr: '2022/3/3 13:24:08',
      formatStr: 'YY-MM-DD HH:mm:ss',
      expected: '22-03-03 13:24:08'
    }, {
      dateStr: '2022/3/3 13:24:08',
      formatStr: 'YY-MM-DD hh:mm:ss',
      expected: '22-03-03 01:24:08'
    }, {
      dateStr: '2022/3/3 13:24:08',
      formatStr: 'YYYY-M-D',
      expected: '2022-3-3'
    }])('should work with $formatStr', ({ dateStr, formatStr, expected }) => {
      expect(formatDate(dateStr, formatStr)).toBe(expected)
      expect(getDayJs(dateStr).format(formatStr)).toBe(expected)
    })
  })
})
