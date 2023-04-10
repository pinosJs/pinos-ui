function sidebarGuides() {
  return [
    {
      text: '指南',
      items: [
        {
          text: '介绍',
          link: '/guides/setup'
        },
        {
          text: '快速上手',
          link: '/guides/start'
        },
        {
          text: '全局配置',
          link: '/guides/global'
        },
        {
          text: '空间命名',
          link: '/guides/namespace'
        }
      ]
    }
  ]
}

const components = [
  {
    text: 'filter-group',
    link: '/components/filter-group'
  },
  {
    text: 'table',
    link: '/components/table'
  },
  {
    text: 'config-provider',
    link: '/components/config-provider'
  }
].sort((a, b) => {
  if (a.text > b.text)
    return 1
  else
    return -1
})

export const defaultComponentLink = (components[0] as ({
  text: string
  link: string
})).link

function sidebarComponents() {
  return [{
    text: '组件',
    items: components
  }, {
    text: '指令',
    items: [
      {
        text: 'v-ellipsis',
        link: '/components/directives/v-ellipsis'
      }
    ]
  }]
}

function sidebarUtils() {
  return [{
    text: 'Date',
    items: [
      {
        text: '测试',
        link: '/utils/setup'
      }
    ]
  }]
}

export default () => {
  return {
    '/guides/': sidebarGuides(),
    '/components/': sidebarComponents(),
    '/utils/': sidebarUtils()
  }
}
