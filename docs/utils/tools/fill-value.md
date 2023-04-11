---
outline: deep
---

# fillValue

在字符串的指定位置填充一些值

## 使用

```js
import { fillValue } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/fill-value.vue" ></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| value | 指定的字符串 |  string |  是 |  -  |
| startIndex | 开始位置的下标 | number |  是 |  - |
| endIndex | 结束位置的下标 | number |  是 |  - |
| fullText | 要填充的值 | string |  否 |  **** |

## 类型声明

```js
export declare const fillValue: (value: string, startIndex: number, endIndex: number, fullText?: string) => string
```
