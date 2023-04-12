import { validatePhone } from '../validate-phone'

describe('test export module', () => {
  it('should export module', () => {
    expect(validatePhone).toBeDefined()
  })
})

describe('test validatePhone', () => {
  it('Length detection', () => {
    expect(validatePhone('1398000100')).toBeFalsy()
    expect(validatePhone('139800010011')).toBeFalsy()
    expect(validatePhone('')).toBeFalsy()
    expect(validatePhone(' ')).toBeFalsy()
    expect(validatePhone('13980001001')).toBeTruthy()
  })

  it('Character detection', () => {
    expect(validatePhone('1398000100x')).toBeFalsy()
  })

  it('Rule detection', () => {
    expect(validatePhone('12980001000')).toBeFalsy()
  })
})
