<template>
  <div class="box">
    <pin-table
      :table-data="tableData"
      :table-column-props="tableColumnProps"
      :show-pagination="false"
    >
      <template #zipCell="scope">
        <p>
          自定义cell {{ scope.data.zip }}
        </p>
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
    label: 'Date',
    prop: 'date',
    width: '150'
  },
  {
    label: 'Delivery Info',
    tableColumnProps: [{
      label: 'Name',
      prop: 'name',
      width: '120'
    }, {
      label: 'Address Info',
      tableColumnProps: [{
        label: 'State',
        prop: 'state',
        width: '120'
      }, {
        label: 'City',
        prop: 'city',
        width: '120'
      }, {
        label: 'Address',
        prop: 'address'
      }, {
        label: 'Zip',
        // prop: 'zip',
        cellSlot: 'zipCell',
        width: '120'
      }]
    }]
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
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-08',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-06',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-07',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
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
