---
outline: deep
---

# getPlatform

获取平台的信息

## 使用

```js
import { getPlatform } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/get-platform.vue" ></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| diffWxBrowser | 是否区分微信浏览器 |  boolean |  否 |  false  |


## 类型声明

```js
type Platform = 'ios' | 'android' | 'pc' | 'android-wx' | 'ios-wx';
export declare const getPlatform: (diffWxBrowser?: boolean) => Platform
```
