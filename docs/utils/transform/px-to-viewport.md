---
outline: deep
---

# transformPxToViewport

将 px 转 vw

## 使用

```js
import { transformPxToViewport } from '@pinos-ui/utils'
```

## 代码示例

<demo src="./demos/viewport.vue" ></demo>

## 参数说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| value | 要转化的值 |  string |  是 |  -  |
| config | 配置项 |  object |  否 |  -  |

### config 配置项说明

| 参数名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| viewportWidth | 视口宽度 |  number |  否 |  375  |
| minPixelValue | 最小px的值 |  number |  否 |  1  |
| unitPrecision | 单位的转化精度 |  number |  否 |  8  |
| viewportUnit | 转换后的单位 |  string |  否 |  vw  |

## 类型声明

```js
export declare function transformPxToViewport(value: string, config?: {
    viewportWidth?: number;
    minPixelValue?: number;
    unitPrecision?: number;
    viewportUnit?: string;
}): string;
```
