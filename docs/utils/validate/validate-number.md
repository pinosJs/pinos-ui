---
outline: deep
---

# validateNumber

校验数字

## 使用

```js
import { validateNumber } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/number.vue" ></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| value | 校验目标 |  number 或 string |  是 |  -  |
| cfg | 配置 |  object |  否 |  -  |

### cfg 的配置说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| fixed | 小数位保留的位数 |  number |  否 |  -  |
| negative | 是否可以为负数 |  boolean |  否 |  -  |
| unableZero | 不允许为0 |  boolean |  否 |  -  |

## 类型声明

```js
export declare function validateNumber(value: number | string, cfg?: {
    fixed?: number;
    negative?: boolean;
    unableZero?: boolean;
}): boolean;
```
