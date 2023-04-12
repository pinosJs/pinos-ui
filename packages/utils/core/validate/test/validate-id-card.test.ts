import { validateIdCard } from '../validate-id-card'

describe('test export module', () => {
  it('should export module', () => {
    expect(validateIdCard).toBeDefined()
  })
})

describe('test validateIdCard', () => {
  it('Length detection', () => {
    expect(validateIdCard('')).toBeFalsy()
    expect(validateIdCard(' ')).toBeFalsy()
    expect(validateIdCard('36010219990708300')).toBeFalsy()
    expect(validateIdCard('3601021999070830022')).toBeFalsy()
  })

  it('Rule detection', () => {
    expect(validateIdCard('360102199907083002')).toBeTruthy()
    expect(validateIdCard('36010219990708300X')).toBeTruthy()
    expect(validateIdCard('36010219990708300x')).toBeTruthy()
    expect(validateIdCard('36010219990708300A')).toBeFalsy()
  })

  it('Last rule detection', () => {
    expect(validateIdCard('083002', true)).toBeTruthy()
    expect(validateIdCard('08300X', true)).toBeTruthy()
    expect(validateIdCard('08300x', true)).toBeTruthy()
    expect(validateIdCard('08300A', true)).toBeFalsy()
  })
})
