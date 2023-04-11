<template>
  <div class="box">
    <el-button @click="tableData = []">
      清空数据
    </el-button>
    <pin-config-provider :props="providerProps">
      <pin-table
        :table-data="tableData"
        :table-column-props="tableColumnProps"
        :show-pagination="false"
      />
    </pin-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ref, h, resolveComponent } from 'vue'
import type { TableColumnProps, PropsOptions } from 'pinos-ui'

const providerProps: PropsOptions = {
  table: {
    tableProps: {
      border: true
    },
    emptyRender: () => {
      return [h(resolveComponent('ElEmpty'), {
        description: 'config-provider 自定义'
      })]
    }
  }
}
const tableData = ref<Record<string, any>[]>([{
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
}])
const tableColumnProps = ref<TableColumnProps[]>([
  {
    label: 'id',
    prop: 'id'
  },
  {
    label: 'Name',
    prop: 'name',
    width: '104px'

  },
  {
    label: 'amount1',
    prop: 'amount1'
  },
  {
    label: 'amount2',
    prop: 'amount2',
    width: '104px'

  },
  {
    label: 'amount3',
    prop: 'amount3'
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
