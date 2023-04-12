import { validateType } from '../validate-type'

describe('test export module', () => {
  it('should export module', () => {
    expect(validateType).toBeDefined()
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
