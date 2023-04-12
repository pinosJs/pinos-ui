import { validateNumber } from '../validate-number'

describe('test export module', () => {
  it('should export module', () => {
    expect(validateNumber).toBeDefined()
  })
})

describe('test validateNumber', () => {
  it('Is number', () => {
    expect(validateNumber('36010219990708300')).toBeTruthy()
    expect(validateNumber('36010219990708300A')).toBeFalsy()
    expect(validateNumber('36e3')).toBeFalsy()
    expect(validateNumber('36.')).toBeFalsy()
    expect(validateNumber('a36')).toBeFalsy()
    expect(validateNumber(3.6)).toBeTruthy()
    expect(validateNumber('3..6')).toBeFalsy()
    expect(validateNumber(-3.6)).toBeTruthy()
    expect(validateNumber('--3.6')).toBeFalsy()
    expect(validateNumber('-3.6.0')).toBeFalsy()
    expect(validateNumber('3.6.0')).toBeFalsy()
    expect(validateNumber(0)).toBeTruthy()
    expect(validateNumber('0')).toBeTruthy()
    expect(validateNumber(0.0001)).toBeTruthy()
    expect(validateNumber('-0.0')).toBeFalsy()
    expect(validateNumber('-0.000')).toBeFalsy()
    expect(validateNumber('-0.001')).toBeTruthy()
    expect(validateNumber('-0')).toBeFalsy()
  })

  it('exclude zero', () => {
    expect(validateNumber(0, { unableZero: true })).toBeFalsy()
  })

  it('Positive Integer', () => {
    expect(validateNumber(36, { fixed: 0 })).toBeTruthy()
    expect(validateNumber(0, { fixed: 0 })).toBeTruthy()
    expect(validateNumber(36.0, { fixed: 0 })).toBeTruthy()
    expect(validateNumber(36.1, { fixed: 0 })).toBeFalsy()
    expect(validateNumber(-36.0, { fixed: 0 })).toBeFalsy()
  })

  it('Negative Integer', () => {
    expect(validateNumber(36, { fixed: 0, negative: true })).toBeFalsy()
    expect(validateNumber(-36.0, { fixed: 0, negative: true })).toBeTruthy()
    expect(validateNumber(0, { fixed: 0 })).toBeTruthy()
    expect(validateNumber(36.1, { fixed: 0 })).toBeFalsy()
  })

  it('Integer exclude zero', () => {
    expect(validateNumber(0, { fixed: 0, unableZero: true })).toBeFalsy()
  })

  it('Negative positive decimal', () => {
    expect(validateNumber(1.1, { fixed: 2 })).toBeTruthy()
    expect(validateNumber(-1.1, { fixed: 2 })).toBeFalsy()
    expect(validateNumber(1.10, { fixed: 2 })).toBeTruthy()
    expect(validateNumber(1.101, { fixed: 2 })).toBeFalsy()
  })

  it('Negative decimal', () => {
    expect(validateNumber(1.1, { fixed: 2, negative: true })).toBeFalsy()
    expect(validateNumber(-1.1, { fixed: 2, negative: true })).toBeTruthy()
    expect(validateNumber(-1.10, { fixed: 2, negative: true })).toBeTruthy()
    expect(validateNumber(-1.101, { fixed: 2, negative: true })).toBeFalsy()
  })
})
