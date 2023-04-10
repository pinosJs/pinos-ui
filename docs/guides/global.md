---
outline: deep
---

pinos-ui 提供了全局配置的功能，方便开发者设置某些组件一些公共的属性。

## 全部引入时设置全局配置

```js
import 'pinos-ui/dist/css/index.css'
import { install } from 'pinos-ui'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(install, {
  table: {
    //
  }
})
```

[查看全局配置项](https://github.com/pinosJs/pinos-ui/blob/main/packages/pinos-ui/props.ts)


## 按需引入时设置全局配置

可以通过[config-provide 组件](/components/config-provider)实现
