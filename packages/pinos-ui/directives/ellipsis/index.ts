import { getStyle } from '@pinos-ui/utils'
import { nextTick } from 'vue'
import type { ObjectDirective } from 'vue'

type Binding = {
  lineClamp?: number
}

class Ellipsis {
  binding: Binding
  el: HTMLElement

  constructor(el: HTMLElement, binding: Binding) {
    this.binding = binding
    this.el = el
    this.ellipsisText()
  }

  private ellipsisText() {
    // 判断当前元素是否本身就设置了换行
    const isWrap = getStyle(this.el, 'whiteSpace') !== 'normal'
    // 允许显示的行数
    const lineClamp = this.binding.lineClamp || 1
    // 先将其设置为不换行，获取其文本的真实宽度
    this.el.style.whiteSpace = 'nowrap'
    // 容器本身的宽度
    const containerWidth = this.el.getBoundingClientRect().width
    // 容器的左右边距
    const containerPaddingLeft = getStyle(this.el, 'paddingLeft')
    const containerPaddingRight = getStyle(this.el, 'paddingRight')
    let paddingLeft = 0
    let paddingRight = 0
    if (containerPaddingLeft)
      paddingLeft = +(containerPaddingLeft.toString().split(/[px | rem]/g)[0] || 0)

    if (containerPaddingRight)
      paddingRight = +(containerPaddingRight.toString().split(/[px | rem]/g)[0] || 0)

    // 容器的有效width
    const containerEffectWidth = containerWidth - paddingLeft - paddingRight
    const limitWidth = containerEffectWidth * lineClamp
    // 获取改文本节点的宽度
    const range = document.createRange()
    range.setStart(this.el, 0)
    range.setEnd(this.el, this.el.childNodes.length)
    let rangeTextWidth = range.getBoundingClientRect().width

    const textContent = this.el.textContent
    let res = textContent || ''
    if (textContent) {
      while (rangeTextWidth > limitWidth) {
        res = res.slice(0, -1)
        if (res) {
          this.el.innerHTML = `${res}...`
          const rRange = document.createRange()
          rRange.setStart(this.el, 0)
          rRange.setEnd(this.el, this.el.childNodes.length)
          rangeTextWidth = rRange.getBoundingClientRect().width
        } else {
          this.el.innerHTML = '...'
          rangeTextWidth = 0
        }
      }
    }

    if (!isWrap)
      this.el.style.whiteSpace = 'normal'
  }
}

type EllipsisInstance = InstanceType<typeof Ellipsis>

interface ExtendsHTMLElement extends HTMLElement {
  instance: EllipsisInstance | null
}

export const VEllipsis: ObjectDirective<ExtendsHTMLElement, any> = {
  mounted: (el: ExtendsHTMLElement, binding: { value: Binding }) => {
    nextTick(() => {
      el.instance = new Ellipsis(el, binding.value)
    })
  },

  beforeUnmount: (el: ExtendsHTMLElement) => {
    if (el.instance)
      el.instance = null
  }
}
