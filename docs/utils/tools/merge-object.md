---
outline: deep
---

# mergeObject

对象的深度合并

## 使用

```js
import { mergeObject } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/merge-object.vue" ></demo>


## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| source | 合并的源对象 |  object |  是 |  -  |
| target | 被合并的对象 |  object |  是 |  -  |

:::tip
如果target对象与source对象中存在相同的键名时，source对象该键名所绑定的值会被target对象覆盖
:::


## 类型声明

```js
export declare function mergeObject<T extends Record<string, any>, U extends Record<string, any>>(source: T, target: U): T & U;
```
