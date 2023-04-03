import { getStyle } from '@pinos-ui/utils'
import { nextTick, unref } from 'vue'
import type { ObjectDirective } from 'vue'
import type { MaybeRef } from '~types/utils'

type Binding = MaybeRef<{
  content?: string
  lineClamp?: number
  fillText?: string
}>

class Ellipsis {
  binding: Binding
  el: HTMLElement

  constructor(el: HTMLElement, binding: Binding) {
    this.binding = binding
    this.el = el
    this.ellipsisText()
  }

  private ellipsisText(update = false) {
    nextTick(() => {
      const binding = {
        content: this.el.textContent || '',
        lineClamp: 1,
        fillText: '...',
        ...unref((this.binding || {}))
      }
      const { lineClamp, fillText, content } = binding

      if (update)
        this.el.textContent = content

      const reg = /[px|rem|vw|em]/g
      let lineHeight = getStyle(this.el, 'lineHeight')
      lineHeight = lineHeight ? +(lineHeight.toString().split(reg)[0] || 0) : 0
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

      let res = content || ''
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

  update(binding: Binding) {
    this.binding = binding
    this.ellipsisText(true)
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

  updated: (el: ExtendsHTMLElement, binding: { value: Binding; oldValue: Binding }) => {
    if (!binding)
      return

    const { value = {}, oldValue = {} } = binding
    if (unref(value).content !== unref(oldValue).content)
      el.instance?.update(binding.value)
  },

  beforeUnmount: (el: ExtendsHTMLElement) => {
    if (el.instance)
      el.instance = null
  }
}
