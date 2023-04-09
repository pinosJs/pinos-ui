<template>
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
            'type': 'date',
            'placeholder': '请选择',
            'format': 'YYYY/MM/DD',
            'value-format': 'YYYY-MM-DD'
          }
        }
      ]
    })

    const query = ref<Record<string, any>>({
      value: ''
    })

    return {
      filterGroupOption,
      query
    }
  }
})
</script>
