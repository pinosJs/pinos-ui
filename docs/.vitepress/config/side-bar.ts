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

const utilsConfig = [{
  text: '指南',
  items: [
    {
      text: '快手上手',
      link: '/utils/setup'
    }
  ]
}, {
  text: 'Element',
  items: [
    {
      text: 'hasClassName',
      link: '/utils/element/has-class-name'
    },
    {
      text: 'addClassName',
      link: '/utils/element/add-class-name'
    },
    {
      text: 'removeClassName',
      link: '/utils/element/remove-class-name'
    },
    {
      text: 'getStyle',
      link: '/utils/element/get-style'
    }
  ]
}, {
  text: 'Tools',
  items: [
    {
      text: 'deepClone',
      link: '/utils/tools/deep-clone'
    },
    {
      text: 'fillValue',
      link: '/utils/tools/fill-value'
    },
    {
      text: 'getPlatform',
      link: '/utils/tools/get-platform'
    },
    {
      text: 'generateRandom',
      link: '/utils/tools/generate-random'
    },
    {
      text: 'mergeObject',
      link: '/utils/tools/merge-object'
    }
  ]
}]

export const defaultComponentLink = (components[0] as ({
  text: string
  link: string
})).link

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
  return utilsConfig.map((item) => {
    const { items, text } = item
    return {
      text,
      items: items.sort((a, b) => {
        if (a.text > b.text)
          return 1
        else
          return -1
      })
    }
  })
}

export default () => {
  return {
    '/guides/': sidebarGuides(),
    '/components/': sidebarComponents(),
    '/utils/': sidebarUtils()
  }
}
