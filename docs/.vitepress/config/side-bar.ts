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
  text: 'Transform',
  items: [
    {
      text: 'transformPxToViewport',
      link: '/utils/transform/px-to-viewport'
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
}, {
  text: 'Validate',
  items: [
    {
      text: 'validateType',
      link: '/utils/validate/validate-type'
    },
    {
      text: 'validatePhone',
      link: '/utils/validate/validate-phone'
    },
    {
      text: 'validateIdCard',
      link: '/utils/validate/validate-id-card'
    },
    {
      text: 'validateNumber',
      link: '/utils/validate/validate-number'
    },
    {
      text: 'mustBeChinese',
      link: '/utils/validate/must-be-chinese'
    },
    {
      text: 'existEmoji',
      link: '/utils/validate/exist-emoji'
    }
  ]
}, {
  text: 'Namespace',
  items: [
    {
      text: 'toCamelCase',
      link: '/utils/namespace/to-camel-case'
    },
    {
      text: 'toCapitalCase',
      link: '/utils/namespace/to-capital-case'
    },
    {
      text: 'toKebabCase',
      link: '/utils/namespace/to-kebab-case'
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
  return utilsConfig.sort((a, b) => {
    if (b.text === '指南') {
      return 1
    } else {
      if (a.text > b.text)
        return 1
      else
        return -1
    }
  }).map((item) => {
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
