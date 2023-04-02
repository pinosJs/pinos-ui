import { validateType, validatePhoneNumber, validateIdCard, validateNumber } from './index'

describe('test export module', () => {
  it('should export module', () => {
    expect(validateType).toBeDefined()
    expect(validateIdCard).toBeDefined()
    expect(validatePhoneNumber).toBeDefined()
    expect(validateNumber).toBeDefined()
  })
})

describe('test validateType', () => {
  it.each([{
    targetType: 'string',
    target: 'hello',
    type: 'String',
    expected: true
  }, {
    targetType: 'error',
    target: new Date(),
    type: 'Date',
    expected: true
  }, {
    targetType: 'regexp',
    target: /\d*/g,
    type: 'RegExp',
    expected: true
  }, {
    targetType: 'symbol',
    target: Symbol('123'),
    type: 'Symbol',
    expected: true
  }, {
    targetType: 'weakSet',
    target: new WeakSet(),
    type: 'WeakSet',
    expected: true
  }, {
    targetType: 'weakMap',
    target: new WeakMap(),
    type: 'WeakMap',
    expected: true
  }, {
    targetType: 'date',
    target: new Error('123'),
    type: 'Error',
    expected: true
  }, {
    targetType: 'number',
    target: 1,
    type: 'Number',
    expected: true
  }, {
    targetType: 'object',
    target: {},
    type: 'Object',
    expected: true
  }, {
    targetType: 'array',
    target: [],
    type: 'Array',
    expected: true
  }, {
    targetType: 'function',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    target: () => {},
    type: 'Function',
    expected: true
  }, {
    targetType: 'null',
    target: null,
    type: 'Null',
    expected: true
  }, {
    targetType: 'undefined',
    target: undefined,
    type: 'Undefined',
    expected: true
  }, {
    targetType: 'NaN',
    target: Number.NaN,
    type: 'NaN',
    expected: true
  }])('should work with $targetType', ({ target, type, expected }) => {
    expect(validateType(target, type)).toBe(expected)
  })
})

describe('test validatePhoneNumber', () => {
  it('Length detection', () => {
    expect(validatePhoneNumber('1398000100')).toBeFalsy()
    expect(validatePhoneNumber('139800010011')).toBeFalsy()
    expect(validatePhoneNumber('')).toBeFalsy()
    expect(validatePhoneNumber('13980001001')).toBeTruthy()
  })

  it('Character detection', () => {
    expect(validatePhoneNumber('1398000100x')).toBeFalsy()
  })

  it('Rule detection', () => {
    expect(validatePhoneNumber('12980001000')).toBeFalsy()
  })
})

describe('test validateIdCard', () => {
  it('Length detection', () => {
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
