<template>
  <div class="box">
    <pin-table
      ref="tableInstance"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-model:total="total"
      :table-data="tableData"
      :table-column-props="tableColumnProps"
      :update-methods="requestTableData"
    >
      <template #operate>
        <el-table-column
          width="140px"
          label="操作"
          align="left"
        >
          <template #default="scope">
            <el-button
              link
              @click="handleDelete(scope)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </pin-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TableInstance, TableColumnProps } from 'pinos-ui'

const currentPage = ref(1)
const pageSize = ref(2)
const total = ref(0)
const tableData = ref<Record<string, any>[]>([])
const tableColumnProps = ref<TableColumnProps[]>([
  {
    type: 'index',
    width: '60px',
    label: '序号'
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
  },
  {
    columnSlot: 'operate'
  }
])
const tableInstance = ref<TableInstance | null>(null)
const deleteCount = ref(0)

const mockSyncRequest = (data: any[], time = 1000): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}

const requestTableData = async () => {
  const res = [
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
  ]
  res.splice(0, deleteCount.value)
  total.value = res.length
  const list = await mockSyncRequest(res)
  console.log('currentPage: ', currentPage.value)
  const start = (currentPage.value - 1) * pageSize.value
  const end = Math.min(start + pageSize.value, list.length)
  console.log('最终的数组：', start, end, list.slice(start, end))
  tableData.value = list.slice(start, end)
}

const handleDelete = (data: any) => {
  try {
    // 请求删除的接口 ...
    deleteCount.value++

    const index = data.$index as number
    if (tableInstance.value)
      tableInstance.value.deleteRow(tableData, index)
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  requestTableData()
})
</script>

<style scoped>
.box {
  height: 400px;
}

.text-red {
  color: red;
}
</style>
