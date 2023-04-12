import { mustBeChinese } from '../must-be-chinese'

describe('test export module', () => {
  it('should export module', () => {
    expect(mustBeChinese).toBeDefined()
  })
})

describe('test mustBeChinese', () => {
  it('is work', () => {
    expect(mustBeChinese('你好？')).toBeFalsy()
    expect(mustBeChinese('你好？啊')).toBeFalsy()
    expect(mustBeChinese('你好1啊')).toBeFalsy()
    expect(mustBeChinese('')).toBeFalsy()
    expect(mustBeChinese(' ')).toBeFalsy()
    expect(mustBeChinese(' 1你好 ')).toBeFalsy()
    expect(mustBeChinese('1')).toBeFalsy()
    expect(mustBeChinese('?')).toBeFalsy()
    expect(mustBeChinese('你好')).toBeTruthy()
  })
})
