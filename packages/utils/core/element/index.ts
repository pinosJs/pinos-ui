export const hasClassName = (el: HTMLElement, cls: string) => {
  if (cls.includes(' '))
    throw new Error('className should not contain space.')
  if (el.classList)
    return el.classList.contains(cls)
  else
    return (` ${el.className} `).includes(` ${cls} `)
}

export const addClassName = (el: HTMLElement, cls: string) => {
  let curClass = el.className
  const classes = cls.split(' ').filter(i => i.trim())

  for (const clsName of classes) {
    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClassName(el, clsName))
        curClass += ` ${clsName}`
    }
  }
  if (!el.classList)
    el.className = curClass
}

export const removeClassName = (el: HTMLElement, cls: string) => {
  let curClass = el.className
  const classes = cls.split(' ').filter(i => i.trim())

  for (const clsName of classes) {
    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClassName(el, clsName))
        curClass = curClass.replace(` ${clsName} `, ' ')
    }
  }
  if (!el.classList)
    el.className = curClass.trim()
}

export const getStyle = (el: HTMLElement, styleName: keyof CSSStyleDeclaration) => {
  if (styleName === 'float')
    styleName = 'cssFloat'

  try {
    const style = el.style[styleName]
    if (style) return style
    if (document && document.defaultView) {
      const computed = document.defaultView.getComputedStyle(el)
      return computed ? computed[styleName] : ''
    } else {
      return ''
    }
  } catch {
    return el.style[styleName]
  }
}
