---
outline: deep
---

# hasClassName

判断dom元素中是否存在指定的class名称

## 使用

```js
import { hasClassName } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/has-class-name.vue"></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| el | 目标元素 |  HTMLElement |  是 |  -  |
| cls | class样式类名 | string |  是 |  - |

## 类型声明

```js
export declare const hasClassName: (el: HTMLElement, cls: string) => boolean
```
