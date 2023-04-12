import { existEmoji } from '../exist-emoji'

describe('test export module', () => {
  it('should export module', () => {
    expect(existEmoji).toBeDefined()
  })
})

describe('test existEmoji', () => {
  it('is work', () => {
    expect(existEmoji('你好？')).toBeFalsy()
    expect(existEmoji('你好？啊')).toBeFalsy()
    expect(existEmoji('你好1啊')).toBeFalsy()
    expect(existEmoji('')).toBeFalsy()
    expect(existEmoji(' ')).toBeFalsy()
    expect(existEmoji(' 1你好 ')).toBeFalsy()
    expect(existEmoji('1')).toBeFalsy()
    expect(existEmoji('?')).toBeFalsy()
    expect(existEmoji('你好')).toBeFalsy()
    expect(existEmoji('🚀🔥')).toBeTruthy()
    expect(existEmoji('🚀好')).toBeTruthy()
    expect(existEmoji('🚀1')).toBeTruthy()
    expect(existEmoji('🚀？')).toBeTruthy()
  })
})
