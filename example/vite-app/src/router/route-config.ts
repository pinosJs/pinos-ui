import modulesRoutes from './get-modules-routes'
import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  ...modulesRoutes
]
