import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './route-config'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
