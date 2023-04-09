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
    const options = ref<any[]>([])
    const options2 = ref<any[]>([])
    const options3 = ref<any[]>([])
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'el-select',
          modelKey: 'value1',
          props: {
            placeholder: '请选择',
            clearable: true
          },
          events: {
            change: getOptions2
          },
          children: {
            element: 'el-option',
            renderList: options.value,
            props: (item: { label: string; value: string }) => {
              return {
                label: item.label,
                value: item.value,
                key: item.value
              }
            }
          }
        },
        {
          element: 'el-select',
          modelKey: 'value2',
          props: {
            placeholder: '请选择',
            clearable: true,
            disabled: !query.value.value1
          },
          events: {
            change: getOptions3
          },
          children: {
            element: 'el-option',
            renderList: options2.value,
            props: (item: { label: string; value: string }) => {
              return {
                label: item.label,
                value: item.value,
                key: item.value
              }
            }
          }
        },
        {
          element: 'el-select',
          modelKey: 'value3',
          props: {
            placeholder: '请选择',
            clearable: true,
            disabled: !query.value.value1 || !query.value.value2,
            multiple: true
          },
          children: {
            element: 'el-option',
            renderList: options3.value,
            props: (item: { label: string; value: string }) => {
              return {
                label: item.label,
                value: item.value,
                key: item.value
              }
            }
          }
        }
      ]
    })

    const query = ref<Record<string, any>>({
      value1: '',
      value2: '',
      value3: []
    })

    const mockSyncRequest = (data: any[], time = 1000): Promise<any[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, time)
      })
    }

    const getRequest = async () => {
      const list = [{
        label: '食物',
        value: 'food'
      }]
      options.value = await mockSyncRequest(list, 200)
    }

    const getOptions2 = async (val: string) => {
      console.log(val)
      const list = [{
        label: '水果',
        value: 'fruit'
      }]

      options2.value = await mockSyncRequest(list, 200)
      query.value.value2 = ''
      query.value.value3 = []
    }

    const getOptions3 = async (val: string) => {
      console.log(val)
      const list = [{
        label: '🍎',
        value: 'APPLE'
      }, {
        label: '🍌',
        value: 'BANANA'
      }, {
        label: '🍊',
        value: 'ORANGE'
      }]
      options3.value = await mockSyncRequest(list, 200)
      query.value.value3 = []
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
