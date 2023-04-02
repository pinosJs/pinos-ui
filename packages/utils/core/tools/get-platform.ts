export const getPlatform = (differenceBrowser = false) => {
  const u = navigator.userAgent
  const isAndroid = u.includes('Android') || u.includes('Adr')
  const isIOS = !!/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(u)
  let browser = ''

  if (differenceBrowser) {
    // 区分不同的 webview
    browser = u.includes('MicroMessenger') ? 'WX' : ''
  }

  if (isAndroid)
    return browser ? `Android-${browser}` : 'Android'
  else if (isIOS)
    return browser ? `IOS-${browser}` : 'IOS'
  else
    return 'PC'
}
