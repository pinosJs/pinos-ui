<template>
  <div :class="nh.b()">
    <div :class="nh.bs('top-wrapper')">
      <component
        :is="props.componentsConfig.table"
        :class="nh.bs('wrapper')"
        :data="props.tableData"
        v-bind="props.tableProps"
        v-on="props.tableEvents"
      >
        <template v-for="(columnProps, index) in props.tableColumnProps">
          <slot
            v-if="columnProps.columnSlot"
            :name="columnProps.columnSlot"
          />
          <template v-else>
            <table-column
              :key="getColumnKey(columnProps, index)"
              :column-props="columnProps"
              :slots="slots"
              :name="props.componentsConfig.tableColumn"
            />
          </template>
        </template>

        <template #empty>
          <template v-if="props.emptyRender && !slots.empty">
            <render-slot :slot-render="props.emptyRender" />
          </template>
          <slot
            v-else
            name="empty"
          />
        </template>
      </component>
    </div>
    <div
      v-if="props.showPagination && props.tableData.length"
      :class="nh.bs('bottom-wrapper')"
    >
      <component
        :is="props.componentsConfig.pagination"
        :current-page="props.currentPage"
        :page-size="props.pageSize"
        :total="props.total"
        size="small"
        :page-sizes="[20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        v-bind="props.paginationOptions"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProps, useNameHelper } from '@utils/mixins'
import { watch, ref, useSlots, provide, isRef, h } from 'vue'
import RenderSlot from '../common/render-slot'
import { tableProps } from './props'
import TableColumn from './table-column.vue'
import type { TableColumnProps } from './props'
import type { TableExpose } from './types'
import type { MaybeRef } from '~types/utils'

const _props = defineProps(tableProps)
const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
  (e: 'update:pageSize', value: number): void
  (e: 'update:total', value: number): void
}>()
const props = useProps('table', _props, {
  tableData: [],
  tableProps: {},
  tableEvents: {},
  tableColumnKey: '',
  tableColumnProps: [],
  showPagination: true,
  currentPage: 1,
  pageSize: 20,
  total: 0,
  paginationOptions: {},
  updateMethods: () => {},
  emptyRender: () => [h('span', '暂无数据')],
  componentsConfig: {
    pagination: 'el-pagination',
    table: 'el-table',
    tableColumn: 'el-table-column'
  }
})

const slots = useSlots()
const nh = useNameHelper('table')

const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)

provide('rootCurrentPage', currentPage)
provide('rootPageSize', pageSize)

watch(() => props.total, (val: number) => {
  total.value = val
}, { immediate: true, deep: true })

watch(() => props.currentPage, (val: number) => {
  currentPage.value = val
}, { immediate: true, deep: true })

watch(() => props.pageSize, (val: number) => {
  pageSize.value = val
}, { immediate: true, deep: true })

const handleSizeChange = (size: number) => {
  const { updateMethods } = props
  pageSize.value = size
  currentPage.value = 1
  emit('update:currentPage', currentPage.value)
  emit('update:pageSize', size)
  updateMethods()
}

const handlePageChange = (page: number) => {
  const { updateMethods } = props
  currentPage.value = page
  emit('update:currentPage', page)
  updateMethods()
}

const getColumnKey = (columnProps: TableColumnProps, index: number) => {
  const { tableData, tableColumnKey } = props
  const type = columnProps.type
  if (type)
    return tableColumnKey ? `${tableData[index][tableColumnKey]}__${type}` : `${index}__${type}`
  else
    return tableColumnKey ? tableData[index][tableColumnKey] : index
}

// 删除某一行的方法，供外部调用
const deleteColumn = async <T = any>(list: MaybeRef<T[]>, index: number) => {
  const l = isRef(list) ? list.value : list
  const len = l.length
  const pageCounts = Math.ceil(total.value / pageSize.value)

  if (pageCounts > 1) {
    const { updateMethods } = props

    if (len > 1) {
      if (currentPage.value === pageCounts) {
        l.splice(index, 1)
        total.value--
        emit('update:total', total.value)
      } else {
        updateMethods()
      }
    } else {
      if (currentPage.value === 1)
        currentPage.value = 1
      else
        currentPage.value -= 1

      emit('update:currentPage', currentPage.value)

      updateMethods()
    }
  } else {
    l.splice(index, 1)
    total.value--
    emit('update:total', total.value)
  }
}

defineExpose<TableExpose>({
  deleteColumn
})
</script>

<script lang="ts">
export default {
  name: 'Table'
}
</script>
