---
outline: deep
---

# toCapitalCase

将命名转换为首字母大写的驼峰

## 使用

```js
import { toCapitalCase } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/to-capital-case.vue" ></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| value | 要转换的值 |  string |  是 |  -  |

## 类型声明

```js
type CapitalCase<T extends string> = T extends `${infer First}-${infer Rest}` ? `${Capitalize<First>}${CapitalCase<Rest>}` : Capitalize<T>;
export declare function toCapitalCase<T extends string>(value: T): CapitalCase<T>;
```
