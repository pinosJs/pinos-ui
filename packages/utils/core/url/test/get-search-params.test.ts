import { getSearchParams } from '../get-search-params'

function getCtx(href: string) {
  return Object.assign(window, { location: { href } })
}

describe('test export module', () => {
  it('should export module', () => {
    expect(getSearchParams).toBeDefined()
  })
})

describe('test getSearchParams', () => {
  it('should work', () => {
    const data = getSearchParams.bind(getCtx('https://abc.com/index.html?a=123&b=456'))('b')
    expect(data).toBe('456')
  })
  it('should work', () => {
    const data = getSearchParams.apply(getCtx('https://abc.com/#/index?a=123&b=456'), ['b'])
    expect(data).toBe('456')
  })
  it('should work', () => {
    const data = getSearchParams.call(getCtx('https://abc.com/#/index?a=123&b=456#/wechat'), 'b')
    expect(data).toBe('456')
  })
  it('should work', () => {
    const data = getSearchParams.call(getCtx('https://abc.com/#?a=123&b=456#/wechat'), 'b')
    expect(data).toBe('456')
  })
})
