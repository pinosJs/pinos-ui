import { getStyle } from '@pinos-ui/utils'
import { nextTick } from 'vue'
import type { ObjectDirective } from 'vue'

type Binding = {
  lineClamp?: number
  fillText?: string
}

class Ellipsis {
  binding: Binding
  el: HTMLElement

  constructor(el: HTMLElement, binding: Binding) {
    this.binding = binding || {
      lineClamp: 1,
      fillText: '...'
    }
    this.el = el
    this.ellipsisText()
  }

  ellipsisText() {
    nextTick(() => {
      const reg = /[px|rem|vw|em]/g
      let lineHeight = getStyle(this.el, 'lineHeight')
      lineHeight = lineHeight ? +(lineHeight.toString().split(reg)[0] || 0) : 0
      const lineClamp = this.binding.lineClamp || 1
      const fillText = this.binding.fillText || '...'
      const containerPaddingTop = getStyle(this.el, 'paddingTop')
      const containerPaddingBottom = getStyle(this.el, 'paddingBottom')
      let paddingTop = 0
      let paddingBottom = 0
      if (containerPaddingTop)
        paddingTop = +(containerPaddingTop.toString().split(reg)[0] || 0)
      if (containerPaddingBottom)
        paddingBottom = +(containerPaddingBottom.toString().split(reg)[0] || 0)

      const limitHeight = lineHeight * lineClamp

      if (limitHeight === 0)
        throw new Error('limitHeight is zero')

      let currentHeight = this.el.getBoundingClientRect().height - paddingTop - paddingBottom

      let res = this.el.textContent || ''
      if (res) {
        while (currentHeight > limitHeight) {
          res = res.slice(0, -1)
          if (res) {
            this.el.textContent = `${res}${fillText}`
            currentHeight = this.el.getBoundingClientRect().height - paddingTop - paddingBottom
          } else {
            this.el.textContent = fillText
            const h = this.el.getBoundingClientRect().height - paddingTop - paddingBottom
            if (h > limitHeight)
              this.el.textContent = ''

            currentHeight = 0
          }
        }
      }
    })
  }
}

type EllipsisInstance = InstanceType<typeof Ellipsis>

interface ExtendsHTMLElement extends HTMLElement {
  instance: EllipsisInstance | null
}

export const vEllipsis: ObjectDirective<ExtendsHTMLElement, any> = {
  mounted: (el: ExtendsHTMLElement, binding: { value: Binding }) => {
    el.instance = new Ellipsis(el, binding.value)
  },

  updated: (el: ExtendsHTMLElement) => {
    el.instance?.ellipsisText()
  },

  beforeUnmount: (el: ExtendsHTMLElement) => {
    if (el.instance)
      el.instance = null
  }
}
