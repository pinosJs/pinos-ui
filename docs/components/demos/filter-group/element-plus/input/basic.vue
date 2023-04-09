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
          element: 'el-input',
          modelKey: 'value',
          props: {
            placeholder: '请选择',
            clearable: true
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
