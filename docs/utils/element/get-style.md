---
outline: deep
---

# getStyle

获取一个dom的样式

## 使用

```js
import { getStyle } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/get-style.vue"></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| el | 目标元素 |  HTMLElement |  是 |  -  |
| styleName | style 属性 |  keyof CSSStyleDeclaration |  是 |  - |

## 类型声明

```js
export declare const getStyle: (el: HTMLElement, styleName: keyof CSSStyleDeclaration) => string | number | CSSRule | ((index: number) => string) | ((property: string, value: string | null, priority?: string | undefined) => void) | null | undefined
```
