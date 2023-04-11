---
outline: deep
---

# addClassName

添加一个或多个样式类给指定的dom

## 使用

```js
import { addClassName } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/add-class-name.vue"></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| el | 目标元素 |  HTMLElement |  是 |  -  |
| cls | class样式类名，多个用空格隔开 | string |  是 |  - |

## 类型声明

```js
export declare const addClassName: (el: HTMLElement, cls: string) => void
```
