import { defaultComponentLink } from './side-bar'

export default () => {
  return [
    { text: '指南', link: '/guides/setup', activeMatch: '/guides/' },
    { text: '组件', link: defaultComponentLink, activeMatch: '/components/' },
    { text: '常用方法', link: '/utils/setup', activeMatch: '/utils/' }
  ]
}
