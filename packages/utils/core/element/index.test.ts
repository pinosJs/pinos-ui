import { hasClassName, addClassName, removeClassName, getStyle } from './index'

describe('test get dom attrs', () => {
  it('should export module', () => {
    expect(hasClassName).toBeDefined()
    expect(addClassName).toBeDefined()
    expect(removeClassName).toBeDefined()
    expect(getStyle).toBeDefined()
  })

  test('use hasClassName in this test file', () => {
    const element = document.createElement('div')
    const emptyElement = document.createElement('div')
    element.classList.add('class-list-01')
    element.classList.add('class-list-02')

    expect(hasClassName(element, 'class-list-01')).toBeTruthy()
    expect(hasClassName(element, 'class-list')).toBeFalsy()
    expect(hasClassName(element, 'class-list-02')).toBeTruthy()
    expect(hasClassName(emptyElement, 'class-list-02')).toBeFalsy()
  })

  test('use addClassName in this test file', () => {
    const element = document.createElement('div')
    addClassName(element, 'class-list-01')
    let flag = false
    if (element.classList)
      flag = Array.from(element.classList).includes('class-list-01')
    else
      flag = element.className.includes('class-list-01')
    expect(flag).toBeTruthy()
  })

  test('use removeClassName in this test file', () => {
    const element = document.createElement('div')
    element.classList.add('class-list-01')
    removeClassName(element, 'class-list-01')
    let flag = false
    if (element.classList)
      flag = Array.from(element.classList).includes('class-list-01')
    else
      flag = element.className.includes('class-list-01')
    expect(flag).toBeFalsy()
  })

  test('use getStyle in this test file', () => {
    const element = document.createElement('div')
    element.style.color = 'red'

    expect(getStyle(element, 'color')).toBe('red')
  })
})
