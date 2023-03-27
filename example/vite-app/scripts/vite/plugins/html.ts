import { createHtmlPlugin } from 'vite-plugin-html'

export default (envData: Record<string, any>) => {
  return createHtmlPlugin({
    template: 'index.html',
    minify: true,
    entry: '/src/main.ts',
    inject: {
      data: {
        env: envData.VITE_ENV_TYPE,
      },
    },
  })
}
