import Theme from 'vitepress/theme'
import { useComponents } from './use-component'
import './styles/vars.css'

export default {
  ...Theme,
  enhanceApp(ctx: { app: any }) {
    const { app } = ctx
    useComponents(app)
  }
}
