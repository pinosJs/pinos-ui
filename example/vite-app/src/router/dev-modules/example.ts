import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/example/home.vue')
  }
  // - APPEND ROUTE CONFIG -
]

export default routes
