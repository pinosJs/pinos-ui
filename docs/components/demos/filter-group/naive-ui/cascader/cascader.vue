<template>
  <n-space>
    <n-space>
      <n-switch v-model:value="checkStrategyIsChild" />Child Check Strategy
    </n-space>
    <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
    <n-space><n-switch v-model:value="hoverTrigger" />Hover Trigger</n-space>
    <n-space><n-switch v-model:value="filterable" />Filterable</n-space>
  </n-space>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  />
  <h5>query的值</h5>
  <p>{{ query }}</p>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import type { FilterGroupOption } from 'pinos-ui'

export default defineComponent({
  name: 'Fg',
  setup() {
    const checkStrategyIsChild = ref(true)
    const showPath = ref(true)
    const hoverTrigger = ref(false)
    const filterable = ref(false)

    const handleUpdateValue = (value: string, option: any) => {
      console.log(value, option)
    }

    const getOptions = (depth = 3, iterator = 1, prefix = '') => {
      const length = 12
      const options: any[] = []
      for (let i = 1; i <= length; ++i) {
        if (iterator === 1) {
          options.push({
            value: `v-${i}`,
            label: `l-${i}`,
            disabled: i % 5 === 0,
            children: getOptions(depth, iterator + 1, `${String(i)}`)
          })
        } else if (iterator === depth) {
          options.push({
            value: `v-${prefix}-${i}`,
            label: `l-${prefix}-${i}`,
            disabled: i % 5 === 0
          })
        } else {
          options.push({
            value: `v-${prefix}-${i}`,
            label: `l-${prefix}-${i}`,
            disabled: i % 5 === 0,
            children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
          })
        }
      }
      return options
    }

    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'n-cascader',
          modelKey: 'value',
          bindingArg: 'value',
          props: {
            'placeholder': '没啥用的值',
            'clearable': true,
            'expand-trigger': hoverTrigger.value ? 'hover' : 'click',
            'options': getOptions(),
            'check-strategy': checkStrategyIsChild.value ? 'child' : 'all',
            'show-path': showPath.value,
            'filterable': filterable.value,
            'style': {
              width: '200px'
            }
          },
          events: {
            'update:value': handleUpdateValue
          }
        }
      ]
    })

    const query = ref<Record<string, any>>({
      value: null
    })

    return {
      filterGroupOption,
      query,
      checkStrategyIsChild,
      showPath,
      hoverTrigger,
      filterable
    }
  }
})
</script>
