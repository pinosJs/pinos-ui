<template>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  />
  <h5>query的值</h5>
  <p>{{ query }}</p>
</template>

<script lang="ts">
import { ref, defineComponent, computed, h } from 'vue'
import type { FilterGroupOption } from 'pinos-ui'

export default defineComponent({
  name: 'Fg',
  setup() {
    const options = computed(() => {
      return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
        const prefix = query.value.value.split('@')[0]
        return {
          label: prefix + suffix,
          value: prefix + suffix
        }
      })
    })
    const renderLabel = (option: any) => [
      option.label as string,
      ' ',
      h('div', null, { default: () => 'Email' })
    ]
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'n-auto-complete',
          modelKey: 'value',
          bindingArg: 'value',
          props: {
            'render-label': renderLabel,
            'options': options.value,
            'clearable': true,
            'placeholder': '邮箱'
          }
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
