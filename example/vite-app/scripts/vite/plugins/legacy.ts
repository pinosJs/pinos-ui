import legacy from '@vitejs/plugin-legacy'

// 兼容不支持esm的浏览器 （在android6的拓客本的webview中不支持esm）
export default () => {
  return legacy({
    targets: ['Android >= 5', 'iOS >= 12', 'Chrome>=63'],
  })
}
