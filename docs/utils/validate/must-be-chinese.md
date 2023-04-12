---
outline: deep
---

# mustBeChinese

必须为中文

## 使用

```js
import { mustBeChinese } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/must-be-chinese.vue" ></demo>


## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| value | 校验的字符串 |  string |  是 |  -  |


## 类型声明

```js
export declare function mustBeChinese(value: string): boolean;
```
