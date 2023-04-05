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

function sidebarComponents() {
  return [{
    text: '组件',
    items: [
      {
        text: 'table',
        link: '/components/table'
      }
    ]
  }, {
    text: '指令',
    items: [
      {
        text: '测试',
        link: '/components/directives/index'
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
