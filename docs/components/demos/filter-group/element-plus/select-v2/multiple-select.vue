<template>
  <el-button @click="collapseTags = true">
    use collapse-tags
  </el-button>
  <el-button @click="collapseTags = false">
    close collapse-tags
  </el-button>
  <p style="margin: 10px;">
    collapse-tags: {{ collapseTags }}
  </p>
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
    const collapseTags = ref(false)
    const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'el-select-v2',
          modelKey: 'value',
          props: {
            'placeholder': '请选择',
            'clearable': true,
            'options': options.value,
            'multiple': true,
            'collapse-tags': collapseTags.value,
            'style': {
              width: '240px'
            }
          }
        }
      ]
    })

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
      query,
      collapseTags
    }
  }
})
</script>
