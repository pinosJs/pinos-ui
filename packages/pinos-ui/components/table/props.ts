import type { ExtractPropTypes, PropType, Slots, VNode } from 'vue'
import type { ConfigurableProps } from '~types/utils'

type ComponentsConfig = {
  pagination: string
  table: string
  tableColumn: string
}

export type TableColumnProps = {
  cellSlot?: string
  columnSlot?: string
  customHeaderSlot?: string
  tableColumnProps?: TableColumnProps[]
} & Record<string, any>

export const tableProps = {
  tableData: {
    type: Array as PropType<any[]>,
    required: true
  },
  tableProps: {
    type: Object as PropType<Record<string, any>>
  },
  tableEvents: {
    type: Object as PropType<Record<string, any>>
  },
  tableColumnKey: {
    type: String
  }, // 默认渲染 tableColumn 的key是下标，但是如果存在对列的新增和删除，为了有良好的性能，可以传入一个基于 tableData 的唯一的key值
  tableColumnProps: {
    type: Object as PropType<TableColumnProps[]>,
    required: true
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  currentPage: {
    type: Number
  },
  pageSize: {
    type: Number
  },
  total: {
    type: Number
  },
  paginationOptions: {
    type: Object as PropType<Record<string, any>>
  },
  updateMethods: {
    type: Function as PropType<(...args: any[]) => any>
  },
  emptyRender: {
    type: Function as PropType<() => VNode[]>
  },
  componentsConfig: {
    type: Object as PropType<ComponentsConfig>
  }
}

export const tableColumnProps = {
  name: {
    type: String,
    required: true
  },
  columnProps: {
    type: Object as PropType<TableColumnProps>,
    required: true
  },
  prefix: {
    type: String
  },
  slots: {
    type: Object as PropType<Slots>,
    required: true,
    default() {
      return {}
    }
  }
}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableConfigProps = ConfigurableProps<TableProps, 'tableData' | 'tableEvents' | 'tableColumnProps' | 'tableColumnKey' | 'currentPage' | 'showPagination' | 'total' | 'updateMethods'>
