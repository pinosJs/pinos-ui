<template>
  <div class="box">
    <pin-table
      :table-data="tableData"
      :table-column-props="tableColumnProps"
      :show-pagination="false"
    >
      <template #expend="scope">
        <div>
          <p>amount2: </p>
          <p>{{ scope.data.amount2 }}</p>
          <p>amount3: </p>
          <p>{{ scope.data.amount3 }}</p>
        </div>
      </template>
    </pin-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TableColumnProps } from 'pinos-ui'

const tableData = ref<Record<string, any>[]>([])
const tableColumnProps = ref<TableColumnProps[]>([
  {
    type: 'expand',
    cellSlot: 'expend'
  },
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
  }
])

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
      id: '129871221298712212987122129871221298712212987122',
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
