import type { RouteRecordRaw } from 'vue-router'

// eslint-disable-next-line import/no-mutable-exports
let modulesRoutes: RouteRecordRaw[] = []

function compileModulesFile(
  modulesFiles: Record<string, any>,
) {
  Object.values(modulesFiles).forEach((modulesFile) => {
    const moduleExport = modulesFile.default
    modulesRoutes = [...modulesRoutes, ...moduleExport]
  })
}

const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true })
compileModulesFile(modulesFiles)

// 开发环境的路由模块
if (import.meta.env.VITE_DEV_MODULE === 'on') {
  const devModulesFiles = import.meta.glob('./dev-modules/*.ts', { eager: true })
  compileModulesFile(devModulesFiles)
}

export default modulesRoutes
