<template>
  <h3>普通分组</h3>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  />
  <h3>普通分组 + 自定义el-option</h3>
  <pin-filter-group
    v-model="query"
    :option="customFilterGroupOption"
  >
    <template #default="scope">
      <div> {{ scope.data.parentData }} </div>
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
          children: {
            element: 'el-option-group',
            renderList: options.value,
            props: (item: any) => {
              return {
                label: item.label,
                key: item.label
              }
            },
            children: {
              element: 'el-option',
              renderList: (item: any) => {
                return item.options || []
              },
              props: (item: any) => {
                return {
                  label: item.label,
                  value: item.value,
                  key: item.value
                }
              }
            }
          }
        }
      ]
    })
    const customFilterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'el-select',
          modelKey: 'value',
          props: {
            placeholder: '请选择',
            clearable: true
          },
          children: {
            element: 'el-option-group',
            renderList: options.value,
            props: (item: any) => {
              return {
                label: item.label,
                key: item.label
              }
            },
            children: {
              element: 'el-option',
              renderList: (item: any) => {
                return item.options || []
              },
              props: (item: any) => {
                return {
                  label: item.label,
                  value: item.value,
                  key: item.value
                }
              },
              children: {
                element: 'slot',
                slotName: ['default']
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
      const city = [
        {
          label: 'Popular cities',
          options: [
            {
              value: 'Shanghai',
              label: 'Shanghai'
            },
            {
              value: 'Beijing',
              label: 'Beijing'
            }
          ]
        },
        {
          label: 'City name',
          options: [
            {
              value: 'Chengdu',
              label: 'Chengdu'
            },
            {
              value: 'Shenzhen',
              label: 'Shenzhen'
            },
            {
              value: 'Guangzhou',
              label: 'Guangzhou'
            },
            {
              value: 'Dalian',
              label: 'Dalian'
            }
          ]
        }
      ]
      options.value = await mockSyncRequest(city, 600)
    }

    onMounted(() => {
      getRequest()
    })

    return {
      filterGroupOption,
      query,
      customFilterGroupOption
    }
  }
})
</script>

<style scoped>
h3 {
  margin: 5px 0;
}
</style>
