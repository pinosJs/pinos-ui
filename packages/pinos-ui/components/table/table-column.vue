<template>
  <!-- fix（element-plus）: tableColumnProps 动态变化时，如果有一项设置了 type 属性则会出现渲染列异常 -->
  <component
    :is="props.name"
    v-if="props.columnProps.type"
    v-bind="columnTypeProps"
  >
    <template
      v-if="props.columnProps.cellSlot"
      #default="scope"
    >
      <render-slot
        :slot-render="cellSlot"
        :scope-data="scope.row"
      />
    </template>
    <template
      v-if="props.columnProps.customHeaderSlot"
      #header
    >
      <render-slot :slot-render="headerSlot" />
    </template>
  </component>
  <component
    :is="props.name"
    v-else
    v-bind="columnProps"
  >
    <template
      v-if="props.columnProps.cellSlot"
      #default="scope"
    >
      <render-slot
        :slot-render="cellSlot"
        :scope-data="scope.row"
      />
    </template>
    <template
      v-if="props.columnProps.customHeaderSlot"
      #header
    >
      <render-slot :slot-render="headerSlot" />
    </template>
    <template v-if="props.columnProps.tableColumnProps">
      <table-column
        v-for="(subColumnProps, idx) in props.columnProps.tableColumnProps"
        :key="`${prefix}_sub_${idx}`"
        :column-props="subColumnProps"
        :slots="slots"
        :prefix="`s_${idx}`"
        :name="props.name"
      />
    </template>
  </component>
</template>

<script lang="ts" setup>
import { useProps } from '@utils/mixins'
import { computed, inject } from 'vue'
import RenderSlot from '../common/render-slot'
import { tableColumnProps } from './props'
import type { Ref } from 'vue'

const _props = defineProps(tableColumnProps)
const props = useProps('', _props, {
  name: 'el-table-column',
  columnProps: {},
  prefix: '',
  slots: {}
})

const currentPage = inject<Ref<number>>('rootCurrentPage')
const pageSize = inject<Ref<number>>('rootPageSize')

const defaultIndex = (index: number) => {
  if (currentPage !== undefined && pageSize !== undefined)
    return (currentPage.value - 1) * pageSize.value + (index + 1)
  else
    return index
}

const cellSlot = computed(() => {
  const slotName = props.columnProps.cellSlot
  if (slotName)
    return props.slots[slotName] || null
  else
    return null
})
const headerSlot = computed(() => {
  const slotName = props.columnProps.customHeaderSlot
  if (slotName)
    return props.slots[slotName] || null
  else
    return null
})
// 针对 type 类型的 props
const columnTypeProps = computed(() => {
  const { type, index, ...otherProps } = props.columnProps
  if (type === 'index') {
    return {
      type,
      ...otherProps,
      index: index || defaultIndex
    }
  } else {
    return props.columnProps
  }
})
</script>

<script lang="ts">
export default {
  name: 'TableColumn'
}
</script>
