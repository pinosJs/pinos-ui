import { visualizer } from 'rollup-plugin-visualizer'

export default () => {
  if (process.env.ANALYZE) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  } else {
    return null
  }
}
