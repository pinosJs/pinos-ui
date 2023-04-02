import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: 'dot',
    setupFiles: [resolve(__dirname, './.test/setup.ts')],
    watch: false
  }
})
