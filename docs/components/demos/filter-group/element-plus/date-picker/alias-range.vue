<template>
  <el-button @click="setDefaultData">
    设置默认值
  </el-button>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  />
  <h5>query的值</h5>
  <p>{{ query }}</p>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import type { FilterGroupOption } from 'pinos-ui'

export default defineComponent({
  name: 'Fg',
  setup() {
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'el-date-picker',
          modelKey: 'value',
          props: {
            'type': 'daterange',
            'range-separator': '至',
            'start-placeholder': '请选择开始时间',
            'end-placeholder': '请选择结束时间',
            'format': 'YYYY/MM/DD',
            'value-format': 'YYYY-MM-DD'
          },
          alias: {
            startTime: 0,
            endTime: 1
          }
        }
      ]
    })

    const query = ref<Record<string, any>>({
      startTime: '',
      endTime: ''
    })

    const setDefaultData = () => {
      query.value = { startTime: '2023-04-20', endTime: '2023-05-24' }
    }

    return {
      filterGroupOption,
      setDefaultData,
      query
    }
  }
})
</script>
