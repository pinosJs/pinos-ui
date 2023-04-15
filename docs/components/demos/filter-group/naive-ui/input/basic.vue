<template>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  />
  <h4>n-input 插槽</h4>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption2"
  >
    <template #prefix>
      <span>prefix</span>
    </template>
    <template #suffix>
      <span>suffix</span>
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
          element: 'n-input',
          modelKey: 'value',
          bindingArg: 'value',
          props: {
            placeholder: '请选择',
            clearable: true
          }
        }
      ]
    })
    const filterGroupOption2 = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'n-input',
          modelKey: 'value',
          bindingArg: 'value',
          props: {
            placeholder: '请选择',
            clearable: true
          },
          children: {
            element: 'slot',
            slotName: [
              'prefix',
              'suffix'
            ]
          }
        }
      ]
    })

    const query = ref<Record<string, any>>({
      value: ''
    })

    return {
      filterGroupOption,
      filterGroupOption2,
      query
    }
  }
})
</script>
