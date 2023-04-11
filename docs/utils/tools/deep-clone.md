---
outline: deep
---

# fillValue

深拷贝对象或数组

## 使用

```js
import { deepClone } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/deep-clone.vue" ></demo>


## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| target | 要克隆的对象 |  unknown |  是 |  -  |


## 类型声明

```js
export declare function deepClone(target: unknown): any;
```
