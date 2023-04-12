---
outline: deep
---

# validatePhone

校验电话号码

## 使用

```js
import { validatePhone } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/phone.vue" ></demo>


## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| value | 校验目标 |  string |  是 |  -  |

## 类型声明

```js
export declare function validatePhone(value: string): boolean;
```
