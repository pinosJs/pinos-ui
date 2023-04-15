import Demo from '@ruabick/vitepress-demo-block'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import naive from 'naive-ui'
import { install } from 'pinos-ui'

import '@ruabick/vitepress-demo-block/dist/style.css'
import 'element-plus/dist/index.css'
import 'pinos-ui/dist/css/index.css'

export function useComponents(app: any) {
  app.component('Demo', Demo)
  app.use(naive)
  app.use(ElementPlus,
    {
      locale: zhCn
    }
  )
  app.use(install)
}
