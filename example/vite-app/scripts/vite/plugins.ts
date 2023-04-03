// import { PinosUIResolver } from '@pinos-ui/plugins'
import { PinosUIStyleImportResolve } from '@pinos-ui/plugins'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {
  createStyleImportPlugin
} from 'vite-plugin-style-import'
// import AutoImport from 'unplugin-auto-import/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import Components from 'unplugin-vue-components/vite'
import createEsbuildPlugin from './plugins/esbuild'
import createHtmlPlugin from './plugins/html'
import createLegacyPlugin from './plugins/legacy'

import createVisualizerPlugin from './plugins/visualizer'
import type { PluginOption } from 'vite'

export default (env: Record<string, any>) => {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    // 按需引入样式，配合手动导入的方式
    // createStyleImportPlugin({
    //   resolves: [PinosUIStyleImportResolve()]
    // }),
    // AutoImport({
    //   resolvers: [ElementPlusResolver(), PinosUIResolver()]
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver(), PinosUIResolver()]
    // }),
    createLegacyPlugin(),
    createHtmlPlugin(env)
  ]

  const visualizerPlugin = createVisualizerPlugin()
  const esbuildPlugin = createEsbuildPlugin(env)

  visualizerPlugin && plugins.push(visualizerPlugin as any)
  esbuildPlugin && plugins.push(esbuildPlugin)

  return plugins
}
