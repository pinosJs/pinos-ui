---
outline: deep
---

# validateIdCard

校验身份证

## 使用

```js
import { validateIdCard } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/card.vue" ></demo>


## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| value | 校验的字符串 |  string |  是 |  -  |
| last | 是否只校验后六位 |  boolean |  否 |  false  |

## 类型声明

```js
export declare function validateIdCard(value: string, last?: boolean): boolean;
```
