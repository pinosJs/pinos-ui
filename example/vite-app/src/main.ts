import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import './styles/reset.scss'

// 全局引入
// import { install } from 'pinos-ui'
// import 'pinos-ui/dist/css/index.css'

// createApp(App)
//   .use(router)
//   .use(install)
//   .mount('#app')

// 手动按需引入
// eslint-disable-next-line import/order
import install from './pinos-ui/index'

createApp(App)
  .use(router)
  .use(install)
  .mount('#app')
