import type { TableProps } from './props'
import type { ComponentPublicInstance } from 'vue'
import type { MaybeRef } from '~types/utils'

export type TableExpose = {
  deleteColumn: <T = any>(list: MaybeRef<T[]>, index: number) => void
}

export type TableInstance = ComponentPublicInstance<TableProps, TableExpose>
