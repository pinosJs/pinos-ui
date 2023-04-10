# 空间命名

pinos-ui 提供的默认命名空间为 pin。 在特殊情况下，我们需要自定义命名空间

## 全部引入设置空间命名

创建一个 sass 文件

```scss
// styles/namespace.scss

@use "pinos-ui/styles" with (
  $namespace: "po"
);
```

修改入口文件 main.ts

```ts
import 'styles/namespace.scss'

createApp(App).use(install, { namespace: 'po' })
```

## 按需引入设置空间命名

使用 PinConfigProvider 包装您的根组件

```vue
<!-- App.vue -->
<template>
  <pin-config-provider namespace="po">
    <!-- ... -->
  </pin-config-provider>
</template>
```

创建一个 sass 文件

```scss
// styles/namespace.scss

@forward "pinos-ui/styles/design" with (
  $namespace: "po"
);
```

如果你是配合 unplugin-vue-components 的话，需要设置 importStyle 为 sass：

```ts
// vite.config.ts

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PinosUIResolver } from '@pinos-ui/plugins'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        PinosUIResolver({
          importStyle: 'sass'
        })
      ]
    }),
  ]
})
```

如果你是配合 vite-plugin-style-import 的话，需要设置 importStyle 为 sass：

```js
// vite.config.ts
import { PinosUIStyleImportResolve } from '@pinos-ui/plugins'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [PinosUIStyleImportResolve({
        importStyle: 'sass'
      })]
    })
  ]
})
```

对于 vite 项目，在 vite.config.ts 中拓展以下内容：

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/reset.scss" as *;' // @/styles/reset.scss 的 @ 是根据你的 tsconfig.json 的 paths 而定的
      }
    }
  }
  // ...
})
```

对于 vue-cli 项目，在 vue.config.js 中拓展以下内容：

```js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // ...
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@use "@/styles/reset.scss" as *;' // @/styles/reset.scss 的 @ 是根据你的 tsconfig.json 的 paths 而定的
      }
    }
  }
})

```
