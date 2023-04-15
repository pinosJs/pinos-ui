<template>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  />
  <h5>query的值</h5>
  <p>{{ query }}</p>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue'
import type { FilterGroupOption } from 'pinos-ui'

export default defineComponent({
  name: 'Fg',
  setup() {
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'n-checkbox-group',
          modelKey: 'value',
          bindingArg: 'value',
          props: {},
          children: {
            element: 'n-checkbox',
            renderList: fruitsList.value,
            props: (item: { label: string; value: string }) => {
              if (item.value === 'BANANA') {
                return {
                  label: item.label,
                  disabled: true,
                  value: item.value
                }
              } else {
                return {
                  label: item.label,
                  value: item.value
                }
              }
            }
          }
        }
      ]
    })

    const fruitsList = ref<any[]>([])

    const query = ref<Record<string, any>>({
      value: ['APPLE']
    })

    const mockSyncRequest = (data: any[], time = 1000): Promise<any[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, time)
      })
    }

    const getRequest = async () => {
      const fruits = [{
        label: '🍎',
        value: 'APPLE'
      }, {
        label: '🍌',
        value: 'BANANA'
      }, {
        label: '🍊',
        value: 'ORANGE'
      }]
      fruitsList.value = await mockSyncRequest(fruits)
    }

    onMounted(() => {
      getRequest()
    })

    return {
      filterGroupOption,
      query
    }
  }
})
</script>
