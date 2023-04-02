import { toCapitalCase, toCamelCase, toKebabCase } from './index'

describe('test format date', () => {
  it('should export module', () => {
    expect(toCapitalCase).toBeDefined()
    expect(toCamelCase).toBeDefined()
    expect(toKebabCase).toBeDefined()
  })

  it('should work with toCapitalCase', () => {
    const res = 'HelloWorld'
    const str1 = 'helloWorld'
    const str2 = 'HelloWorld'
    const str3 = 'Hello-World'
    const str4 = 'hello-world'

    expect(toCapitalCase(str1)).toBe(res)
    expect(toCapitalCase(str2)).toBe(res)
    expect(toCapitalCase(str3)).toBe(res)
    expect(toCapitalCase(str4)).toBe(res)
  })

  it('should work with toCamelCase', () => {
    const res = 'helloWorld'
    const str1 = 'helloWorld'
    const str2 = 'HelloWorld'
    const str3 = 'Hello-World'
    const str4 = 'hello-world'
    expect(toCamelCase(str1)).toBe(res)
    expect(toCamelCase(str2)).toBe(res)
    expect(toCamelCase(str3)).toBe(res)
    expect(toCamelCase(str4)).toBe(res)
  })

  it('should work with toKebabCase', () => {
    const res = 'hello-world'
    const str1 = 'helloWorld'
    const str2 = 'HelloWorld'
    const str4 = 'hello-world'
    expect(toKebabCase(str1)).toBe(res)
    expect(toKebabCase(str2)).toBe(res)
    expect(toKebabCase(str4)).toBe(res)
  })
})
