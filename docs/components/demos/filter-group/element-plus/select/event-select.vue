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
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'el-select',
          modelKey: 'value',
          props: {
            placeholder: '请选择',
            clearable: true
          },
          events: {
            change: (val: any) => {
              alert(val)
            }
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
        }
      ]
    })

    const query = ref<Record<string, any>>({
      value: ''
    })

    const mockSyncRequest = (data: any[], time = 1000): Promise<any[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, time)
      })
    }

    const getRequest = async () => {
      const status = [{
        label: '选项1',
        value: '1'
      }, {
        label: '选项2',
        value: '2'
      }]
      options.value = await mockSyncRequest(status, 200)
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
