import { IButton, IConfigProvider } from 'pinos-ui'
import type { App } from 'vue'

export default (app: App) => {
  app.use(IButton)
    .use(IConfigProvider)
}
