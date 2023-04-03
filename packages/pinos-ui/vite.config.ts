import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { version } from './package.json'

export default defineConfig(() => {
  return {
    publicDir: false,
    clearScreen: false,
    define: {
      __VERSION__: JSON.stringify(version)
    },
    resolve: {
      alias: [
        { find: '@pinos-ui/utils', replacement: resolve(__dirname, '../utils/core') }
      ]
    },
    esbuild: {
      pure: ['console.log'],
      drop: ['debugger']
    },
    build: {
      minify: true,
      modulePreload: false,
      lib: {
        entry: resolve(__dirname, 'index.ts'),
        name: 'PinosUi'
      },
      rollupOptions: {
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'dist/lib',
            entryFileNames: '[name].cjs'
          },
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: __dirname,
            dir: 'dist/es',
            entryFileNames: '[name].mjs'
          }
        ],
        external: ['vue']
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      tsconfigPaths({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.vue'],
        loose: true
      }),
      dts({
        outputDir: 'dist/types'
      })
    ]
  }
})
