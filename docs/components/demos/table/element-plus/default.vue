<template>
  <el-button @click="handleChange">
    {{ hasSelected ? '去除多选列' : '新增多选列' }}
  </el-button>
  <div class="box">
    <pin-table
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-model:total="total"
      :table-data="tableData"
      :table-column-props="tableColumnProps"
      :update-methods="requestTableData"
    >
      <template #customCell="scope">
        <div>
          <p>展示当前完整的数据</p>
          <p>{{ scope.data || '---' }}</p>
        </div>
      </template>

      <template #operate>
        <el-table-column
          width="140px"
          label="操作"
          align="left"
        >
          <template #default="scope">
            <el-button
              link
              @click="handleClick(scope)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </template>
    </pin-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'
import type { TableColumnProps } from 'pinos-ui'

const tableData = ref<Record<string, any>[]>([])
const tableColumnProps = ref<TableColumnProps[]>([
  {
    type: 'selection',
    width: '55'
  },
  {
    label: 'id',
    prop: 'id',
    showOverflowTooltip: true
  },
  {
    label: 'Name',
    prop: 'name',
    showOverflowTooltip: true
  },
  {
    label: 'amount1',
    prop: 'amount1',
    sortable: true,
    showOverflowTooltip: true
  },
  {
    label: 'amount2',
    prop: 'amount2',
    width: '104px',
    showOverflowTooltip: true
  },
  {
    label: 'amount3',
    prop: 'amount3',
    showOverflowTooltip: true

  },
  {
    label: '自定义cell',
    cellSlot: 'customCell',
    width: '200px'
  },
  {
    columnSlot: 'operate'
  }
])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(100)

const hasSelected = computed(() => {
  return tableColumnProps.value.some(item => item.type)
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

const handleClick = (data: any) => {
  console.log(data)
}

const handleChange = () => {
  if (hasSelected.value) {
    tableColumnProps.value.splice(0, 1)
  } else {
    tableColumnProps.value.unshift({
      type: 'selection',
      width: '55'
    })
  }
}

watch(currentPage, (val: number) => {
  console.log(val, '=val==')
})

onMounted(() => {
  requestTableData()
})
</script>

<style scoped>
.box {
  height: 600px;
}
</style>
