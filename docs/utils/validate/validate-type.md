---
outline: deep
---

# validateType

校验类型

## 使用

```js
import { validateType } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/type.vue" ></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| target | 校验目标 |  unknown |  是 |  -  |
| type | 类型 |  string |  是 |  -  |

## 类型声明

```js
export declare function validateType(target: unknown, type: string): boolean;
```
