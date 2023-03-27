// import { install } from 'pinos-ui'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import './styles/reset.scss'
// import 'pinos-ui/dist/css/index.css'

createApp(App)
  .use(router)
  // .use(install)
  .mount('#app')
