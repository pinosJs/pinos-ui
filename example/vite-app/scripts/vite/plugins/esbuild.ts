import esbuild from 'rollup-plugin-esbuild'
import type { Plugin } from 'vite'

export default (envData: Record<string, any>) => {
  if (envData.VITE_ENV_TYPE === 'development') {
    // fix: 开发环境 chrome 70 不支持可选链
    // https://github.com/vitejs/vite/issues/5222
    return {
      ...esbuild({
        target: 'chrome70',
        include: /\.vue|ts|tsx$/,
        loaders: {
          '.vue': 'js',
        },
      }),
      enforce: 'post',
    } as Plugin
  }
  else {
    return null
  }
}
