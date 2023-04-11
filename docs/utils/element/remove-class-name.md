---
outline: deep
---

# removeClassName

为指定的dom移除一个或多个样式类

## 使用

```js
import { removeClassName } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/remove-class-name.vue"></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| el | 目标元素 |  HTMLElement |  是 |  -  |
| cls | class样式类名，多个用空格隔开 | string |  是 |  - |

## 类型声明

```js
export declare const removeClassName: (el: HTMLElement, cls: string) => void
```
