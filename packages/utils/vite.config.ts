import { resolve } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { version } from './package.json'
import type { PluginOption } from 'vite'

function initPlugins() {
  const res: PluginOption[] = [
    tsconfigPaths(),
    dts({
      outputDir: 'dist/types'
    })
  ]

  if (process.env.ANALYZE) {
    res.push(visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }))
  }

  return res
}

export default defineConfig(() => {
  return {
    publicDir: false,
    clearScreen: false,
    define: {
      __VERSION__: JSON.stringify(version)
    },
    esbuild: {
      pure: ['console.log'],
      drop: ['debugger']
    },
    build: {
      outDir: 'dist',
      modulePreload: false,
      minify: true,
      lib: {
        entry: resolve(__dirname, 'core/index.ts'),
        formats: ['es', 'cjs', 'iife'],
        fileName: (format, entryName) => {
          const fileNameMap = {
            iife: `${entryName}.iife.js`,
            cjs: `${entryName}.cjs`,
            es: `${entryName}.mjs`
          }
          return fileNameMap[format]
        },
        name: 'PinosUIUtils'
      },
      rollupOptions: {
        output: {
          globals: {
            vue: 'Vue'
          }
        },
        external: ['vue']
      }
    },
    plugins: initPlugins()
  }
})
