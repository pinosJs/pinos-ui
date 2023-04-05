<template>
  <h1>合并行</h1>
  <div class="box">
    <pin-table
      :table-data="tableData"
      :table-props="tableProps"
      :table-column-props="tableColumnProps"
      :show-pagination="false"
    />
  </div>
  <h1>合并列</h1>
  <div class="box">
    <pin-table
      :table-data="tableData"
      :table-props="tableProps2"
      :table-column-props="tableColumnProps"
      :show-pagination="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TableColumnProps } from 'pinos-ui'

interface User {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}

interface SpanMethodProps {
  row: User
  column: any
  rowIndex: number
  columnIndex: number
}

const tableData = ref<Record<string, any>[]>([])
const arraySpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex
}: SpanMethodProps) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0)
      return [1, 2]
    else if (columnIndex === 1)
      return [0, 0]
  }
}
const tableProps = ref<Record<string, any>>({
  'span-method': arraySpanMethod,
  'border': true
})
const tableColumnProps = ref<TableColumnProps[]>([
  {
    label: 'ID',
    prop: 'id',
    width: '180px'
  },
  {
    label: 'Name',
    prop: 'name'
  },
  {
    label: 'Amount 1',
    prop: 'amount1'

  },
  {
    label: 'Amount 2',
    prop: 'amount2'
  },
  {
    label: 'Amount 3',
    prop: 'amount3'
  }
])
const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
}
const tableProps2 = ref<Record<string, any>>({
  'span-method': objectSpanMethod,
  'border': true
})

const mockSyncRequest = (data: any[], time = 1000): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}

const requestTableData = async () => {
  tableData.value = await mockSyncRequest([
    {
      id: '12987122',
      name: 'Tom',
      amount1: '234',
      amount2: '3.2',
      amount3: 10
    },
    {
      id: '12987123',
      name: 'Tom',
      amount1: '165',
      amount2: '4.43',
      amount3: 12
    },
    {
      id: '12987124',
      name: 'Tom',
      amount1: '324',
      amount2: '1.9',
      amount3: 9
    },
    {
      id: '12987125',
      name: 'Tom',
      amount1: '621',
      amount2: '2.2',
      amount3: 17
    },
    {
      id: '12987126',
      name: 'Tom',
      amount1: '539',
      amount2: '4.1',
      amount3: 15
    }
  ])
}

onMounted(() => {
  requestTableData()
})
</script>

<style scoped>
.box {
  height: 400px;
}
</style>
