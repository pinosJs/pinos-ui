---
outline: deep
---

# generateRandom

生成随机数

## 使用

```js
import { generateRandom } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/generate-random.vue" ></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| length | 要生成随机数的长度 |  number |  是 |  -  |
| randomMap | 生成随机数的模板 |  string |  否 |  0123456789abcdef  |

## 类型声明

```js
export declare const generateRandom: (length: number, randomMap?: string) => string
```
