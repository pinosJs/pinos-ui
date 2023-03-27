/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, any>> {
  readonly VITE_ENV_TYPE: 'test' | 'production' | 'development'
  readonly VITE_DEV_MODULE: 'on' | 'off' // 是否加载dev-module中的路由
  readonly VITE_PROD_MOCK: 'on' | 'off' // 是否开启生产环境mock服务
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
