<template>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  >
    <template #default="scope">
      <span style="margin-right: 8px">{{ scope.data.slotScope.item.label }}</span>
      <span style="color: var(--el-text-color-secondary); font-size: 13px">
        {{ scope.data.slotScope.item.value }}
      </span>
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
    const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'el-select-v2',
          modelKey: 'value',
          props: {
            placeholder: '请选择',
            clearable: true,
            options: options.value,
            style: {
              width: '240px'
            }
          },
          children: {
            element: 'slot',
            slotName: ['default']
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
      const list = Array.from({ length: 1000 }).map((_, idx) => ({
        value: `Option ${idx + 1}`,
        label: `${initials[idx % 10]}${idx}`
      }))
      options.value = await mockSyncRequest(list, 200)
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
