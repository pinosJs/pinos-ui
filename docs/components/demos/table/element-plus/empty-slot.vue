<template>
  <div class="box">
    <pin-table
      :table-data="tableData"
      :table-column-props="tableColumnProps"
      :show-pagination="false"
    >
      <template #empty>
        <span class="text-red">自定义数据为空的内容</span>
      </template>
    </pin-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumnProps } from 'pinos-ui'

const tableData = ref<Record<string, any>[]>([])
const tableColumnProps = ref<TableColumnProps[]>([
  {
    label: 'id',
    prop: 'id',
    showOverflowTooltip: true
  },
  {
    label: 'Name',
    prop: 'name',
    width: '104px'

  },
  {
    label: 'amount1',
    prop: 'amount1',
    showOverflowTooltip: true
  },
  {
    label: 'amount2',
    prop: 'amount2',
    width: '104px'
  },
  {
    label: 'amount3',
    prop: 'amount3',
    showOverflowTooltip: true
  }
])
</script>

<style scoped>
.box {
  height: 400px;
}

.text-red {
  color: red;
}
</style>
