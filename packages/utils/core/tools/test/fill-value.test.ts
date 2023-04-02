import { fillValue } from '../fill-value'

describe('test export module', () => {
  it('should export module', () => {
    expect(fillValue).toBeDefined()
  })
})

describe('test fullValue', () => {
  const phone = '13900010001'
  it('should work', () => {
    expect(fillValue(phone, 3, phone.length - 1)).toBe('139****')
    expect(fillValue(phone, 0, phone.length - 1, '123')).toBe('123')
    expect(fillValue('360102199706203223', 3, '360102199706203223'.length - 4)).toBe('360****223')
  })
  it('should throw error', () => {
    expect(() => fillValue(phone, -1, phone.length - 1)).toThrowError('endIndex and startIndex are not allowed to set negative values')
    expect(() => fillValue(phone, 0, phone.length)).toThrowError('The values of endIndex and startIndex have exceeded the fill range')
    expect(() => fillValue(phone, 1, 0)).toThrowError('startIndex must be greater than endIndex')
  })
})
