<template>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  >
    <template #default="scope">
      <span>自定义-{{ scope.data.parentData.label }}</span>
    </template>
  </pin-filter-group>

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
          element: 'el-checkbox-group',
          modelKey: 'value',
          props: {},
          children: {
            element: 'el-checkbox',
            renderList: fruitsList.value,
            props: (item: { label: string; value: string }) => {
              return {
                label: item.value
              }
            },
            children: {
              element: 'slot',
              slotName: ['default']
            }
          }
        }
      ]
    })

    const fruitsList = ref<any[]>([])

    const query = ref<Record<string, any>>({
      value: []
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
