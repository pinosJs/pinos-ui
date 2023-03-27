import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, splitVendorChunk } from 'vite'
import { name } from './package.json'
import initPlugins from './scripts/vite/plugins'
import proxy from './scripts/vite/proxy'

export default defineConfig(({ mode }) => {
  const envData = loadEnv(mode, process.cwd())

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url))
      }
    },

    plugins: initPlugins(envData),

    server: {
      cors: true,
      host: '0.0.0.0',
      port: 4000,
      strictPort: false,
      open: true,
      proxy
    },

    preview: {
      port: 6002
    },

    build: {
      outDir: name,
      minify: 'terser',
      chunkSizeWarningLimit: 400,
      rollupOptions: {
        output: {
          manualChunks: (id, api) => {
            if (id.includes('element-plus/theme-chalk/'))
              return 'element-plus'
            else
              return splitVendorChunk()(id, api)
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: envData.VITE_ENV_TYPE === 'production',
          drop_debugger: envData.VITE_ENV_TYPE === 'production'
        }
      }
    }
  }
})
