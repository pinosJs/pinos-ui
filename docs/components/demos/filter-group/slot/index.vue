<template>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  >
    <template #custom>
      <span>我是自定义的</span>
    </template>
  </pin-filter-group>
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
        },
        {
          element: 'slot',
          slotName: ['custom']
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
