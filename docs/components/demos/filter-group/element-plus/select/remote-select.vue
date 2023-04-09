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
    const mockRemoteList = ref<any[]>([])
    const loading = ref(false)
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'el-select',
          modelKey: 'value',
          props: {
            'placeholder': '请输入1',
            'filterable': true,
            'clearable': true,
            'remote': true,
            'remote-method': remoteMethod,
            'loading': loading.value
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

    const remoteMethod = async (query: string) => {
      loading.value = true
      if (query) {
        setTimeout(() => {
          loading.value = false
          options.value = mockRemoteList.value.filter((item) => {
            return item.label.toLowerCase().includes(query.toLowerCase())
          })
        }, 900)
      } else {
        options.value = await mockSyncRequest(mockRemoteList.value, 400)
        loading.value = false
      }
    }

    const mockRemoteListFunc = () => {
      const remoteSelect = [
        '1',
        '2',
        '11',
        '123',
        '222'
      ]
      mockRemoteList.value = remoteSelect.map((item) => {
        return { value: `value:${item}`, label: `label:${item}` }
      })
    }

    const mockSyncRequest = (data: any[], time = 1000): Promise<any[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, time)
      })
    }

    const getRequest = async () => {
      mockRemoteListFunc()
      options.value = await mockSyncRequest(mockRemoteList.value, 400)
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
