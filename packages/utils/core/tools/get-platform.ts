type Platform = 'ios' | 'android' | 'pc' | 'android-wx' | 'ios-wx'

export const getPlatform = (diffWxBrowser = false): Platform => {
  const u = navigator.userAgent
  const isAndroid = u.includes('Android') || u.includes('Adr')
  const isIOS = !!/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(u)
  let browser: 'wx' | '' = ''

  if (diffWxBrowser)
    browser = u.includes('MicroMessenger') ? 'wx' : ''

  if (isAndroid)
    return browser ? `android-${browser}` : 'android'
  else if (isIOS)
    return browser ? `ios-${browser}` : 'ios'
  else
    return 'pc'
}
