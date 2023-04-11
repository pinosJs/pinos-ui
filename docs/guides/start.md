---
outline: deep
---

# 快速上手

## 安装

```shell
pnpm add pinos-ui
```

## 全部引入

```js
import 'pinos-ui/dist/css/index.css'
import { install } from 'pinos-ui'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(install)
```

## 按需引入

### 自动引入

配合 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 完成自动引入。

安装插件：

```shell
pnpm add unplugin-vue-components @pinos-ui/plugins -D
```

对于 vite 项目，在 vite.config.ts 中拓展以下内容：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PinosUIResolver } from '@pinos-ui/plugins'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        PinosUIResolver()
      ]
    }),
  ]
})
```
对于 vue-cli 项目，在 vue.config.js 中拓展以下内容：

```js
const { PinosUIResolver } = require('@pinos-ui/plugins')
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    const plugins = [
      AutoImport({
        resolvers: [PinosUIResolver()]
      }),
      Components({
        resolvers: [PinosUIResolver()]
      })
    ]

    config.plugins = [...config.plugins, ...plugins]
  }
})

```

### 手动引入

借助 Vite 插件 vite-plugin-style-import 可以对组件的样式进行按需引入

安装插件：

```shell
pnpm add vite-plugin-style-import @pinos-ui/plugins -D
```
在 vite.config.ts 中拓展以下内容：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import { PinosUIStyleImportResolve } from '@pinos-ui/plugins'

export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [PinosUIStyleImportResolve()]
    }),
  ]
})
```

接下来我只需要直接 import 组件就行了

```vue
<script setup lang=ts>
import { PinTable } from 'pinos-ui'
</script>

<template>
  <pin-table />
</template>
```

## 全局类型支持

如果全局引入了组件库，在项目的 tsconfig.json 文件配置 compilerOptions.types 选项可以快速获得全局类型支持：

```json
{
  "compilerOptions": {
    "types": ["pinos-ui/types"]
  }
}
```
