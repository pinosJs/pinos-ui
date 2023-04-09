function sidebarGuides() {
  return [
    {
      text: '指南',
      items: [
        {
          text: '介绍',
          link: '/guides/setup'
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
  }
].sort()

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
