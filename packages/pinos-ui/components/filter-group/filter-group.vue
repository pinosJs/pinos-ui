<template>
  <div :class="nh.b()">
    <div
      v-for="(item, index) in props.option"
      :key="index"
      :class="nh.bs('item')"
    >
      <template v-if="!item.hidden">
        <filter-item
          v-model="itemModelValue"
          :option="item"
          @update-value="handleUpdateValue"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProps, useNameHelper } from '@utils/mixins'
import { watch, ref, onMounted, useSlots, provide } from 'vue'
import FilterItem from './filter-item.vue'
import { filterGroupProps } from './props'
import type { FilterGroupOption } from './props'

const _props = defineProps(filterGroupProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
}>()
const props = useProps('filterGroup', _props, {
  modelValue: {},
  option: []
})

const nh = useNameHelper('filter-group')
const slots = useSlots()

const modelValue = ref<Record<string, any>>({})
const itemModelValue = ref<Record<string, any>>({})

provide('rootSlots', slots)

const validateProps = () => {
  for (const opt of props.option) {
    const { element, slotName, modelKey } = opt
    if (!element.trim())
      throw new Error('filterGroup error: invalid element attribute')

    if (element === 'slot') {
      if (!slotName)
        throw new Error('filterGroup error: please set the slotName property')
    } else {
      if (modelKey === undefined) {
        throw new Error('filterGroup error: modelKey cannot be undefined')
      } else {
        if (!modelKey.trim())
          throw new Error('filterGroup error: modelKey must be a character that cannot be empty')
      }
    }
  }
}

const handleUpdateValue = (val: any, item: FilterGroupOption) => {
  transformItemModelValue(val, item)
  emit('update:modelValue', modelValue.value)
}

// Convert the v-model bound by filter-item to the v-model of the filterGroup component
const transformItemModelValue = (val: any, item: FilterGroupOption) => {
  const { alias, modelKey } = item
  if (!modelKey)
    throw new Error('modelKey cannot be undefined')

  if (alias) {
    for (const [key, value] of Object.entries(alias)) {
      if (typeof val === 'object' && val !== null)
        modelValue.value[key] = val[value]
      else
        modelValue.value[key] = ''
    }
  } else {
    modelValue.value[modelKey] = val
  }
  // console.log('transformItemModelValue: ', modelValue.value)
}

// Update the v-model bound to the filter-item component
const updateItemModelValue = (value: Record<string, any>) => {
  const option = props.option

  modelValue.value = value

  if (!option.length || !Object.keys(value).length)
    return

  for (const item of option) {
    const { modelKey, alias, element } = item
    if (element === 'slot')
      continue

    if (!modelKey)
      continue

    const val: any = modelValue.value[modelKey]

    if (alias) {
      const res: any[] = []
      for (const key of Object.keys(alias))
        res.push(modelValue.value[key])

      itemModelValue.value[modelKey] = res
    } else {
      itemModelValue.value[modelKey] = val
    }
  }

  // console.log('updateItemModelValue：', itemModelValue.value)
}

watch(() => props.modelValue, (val: Record<string, any>) => {
  updateItemModelValue(val)
}, { immediate: true, deep: true })

onMounted(() => {
  validateProps()
})
</script>

<script lang="ts">
export default {
  name: 'FilterGroup'
}
</script>
