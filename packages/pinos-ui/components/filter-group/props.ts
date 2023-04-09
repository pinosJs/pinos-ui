import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '~types/utils'

export interface FilterGroupOption {
  element: string
  modelKey?: string
  hidden?: boolean
  slotName?: string[]
  events?: Record<string, any>
  props?: Record<string, any> | ((data: any) => Record<string, any>)
  renderList?: any[] | ((data: any, index?: number) => any[])
  alias?: Record<string, any>
  children?: FilterGroupOption
}

export const filterItemProps = {
  option: {
    type: Object as PropType<FilterGroupOption>,
    required: true
  },
  modelValue: {
    type: Object as PropType<Record<string, any>>
  },
  parentData: {
    type: Object as PropType<any>
  },
  parentIndex: {
    type: Number
  },
  slotName: {
    type: String
  },
  slotScope: {
    type: Object as PropType<any>
  }
}

export const filterGroupProps = {
  option: {
    type: Array as PropType<FilterGroupOption[]>,
    required: true
  },
  modelValue: {
    type: Object as PropType<Record<string, any>>,
    required: true
  }
}

export type FilterGroupProps = ExtractPropTypes<typeof filterGroupProps>
export type FilterGroupConfigProps = ConfigurableProps<FilterGroupProps, 'modelValue' | 'option'>
