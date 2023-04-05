import { applyPlugins } from '@ruabick/md-demo-plugins'
import { defineConfig } from 'vitepress'
import initNav from './config/nav'
import initSideBar from './config/side-bar'

export default defineConfig({
  title: 'pinos-ui',
  outDir: '../docs-dist',
  description: '一个vue3的组件库',

  head: [
    ['link', { rel: 'icon', href: '/mini-logo.png' }],
    ['meta', { name: 'theme-color', content: '#42d392' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    nav: initNav(),
    sidebar: initSideBar(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pinosJs/pinos-ui' }
    ]
  },

  markdown: {
    config: (md) => {
      applyPlugins(md)
    }
  }
})
