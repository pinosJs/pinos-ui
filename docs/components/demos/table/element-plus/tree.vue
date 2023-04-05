<template>
  <h1>树形数据</h1>
  <div class="box">
    <pin-table
      :table-data="tableData"
      :table-props="tableProps"
      :table-column-props="tableColumnProps"
      :show-pagination="false"
    />
  </div>
  <h1>懒加载</h1>
  <div class="box">
    <pin-table
      :table-data="tableLazyData"
      :table-props="tableLazyProps"
      :table-column-props="tableColumnProps"
      :show-pagination="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TableColumnProps } from 'pinos-ui'

interface User {
  id: number
  date: string
  name: string
  address: string
  hasChildren?: boolean
  children?: User[]
}

const tableData = ref<Record<string, any>[]>([])
const tableProps = ref<Record<string, any>>({
  'row-key': 'id'
})
const tableColumnProps = ref<TableColumnProps[]>([
  {
    label: 'Date',
    prop: 'date'
  },
  {
    label: 'Name',
    prop: 'name'
  },
  {
    label: 'Address',
    prop: 'address',
    showOverflowTooltip: true
  }
])

const tableLazyData = ref<Record<string, any>[]>([{
  id: 1,
  date: '2016-05-02',
  name: 'wangxiaohu',
  address: 'No. 189, Grove St, Los Angeles'
},
{
  id: 2,
  date: '2016-05-04',
  name: 'wangxiaohu',
  address: 'No. 189, Grove St, Los Angeles'
},
{
  id: 3,
  date: '2016-05-01',
  name: 'wangxiaohu',
  hasChildren: true,
  address: 'No. 189, Grove St, Los Angeles'
},
{
  id: 4,
  date: '2016-05-03',
  name: 'wangxiaohu',
  address: 'No. 189, Grove St, Los Angeles'
}])
const load = (
  row: User,
  treeNode: unknown,
  resolve: (date: User[]) => void
) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])
  }, 1000)
}
const tableLazyProps = ref<Record<string, any>>({
  'row-key': 'id',
  'lazy': true,
  'load': load,
  'tree-props': { children: 'children', hasChildren: 'hasChildren' }
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
      id: 1,
      date: '2016-05-02',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      id: 2,
      date: '2016-05-04',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      id: 3,
      date: '2016-05-01',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
      children: [
        {
          id: 31,
          date: '2016-05-01',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          id: 32,
          date: '2016-05-01',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]
    },
    {
      id: 4,
      date: '2016-05-03',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles'
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
