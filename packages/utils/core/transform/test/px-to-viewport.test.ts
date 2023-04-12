import { transformPxToViewport } from '../px-to-viewport'

describe('test export module', () => {
  it('should export module', () => {
    expect(transformPxToViewport).toBeDefined()
  })
})

describe('test transformPxToViewport', () => {
  it('should work', () => {
    expect(transformPxToViewport('75px')).toBe('20vw')
    expect(transformPxToViewport('0px')).toBe('0px')
    expect(transformPxToViewport('75px', {
      viewportWidth: 750
    })).toBe('10vw')
    expect(transformPxToViewport('{width: 75px; color: red;}')).toBe('{width: 20vw; color: red;}')
  })
})
