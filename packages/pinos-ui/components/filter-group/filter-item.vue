<template>
  <template v-if="props.option.modelKey && getRenderType(props.option) !== 'slot'">
    <component
      :is="props.option.element"
      v-if="getRenderType(props.option) === 'normal'"
      v-model="props.modelValue[props.option.modelKey]"
      v-bind="getProps(props.option)"
      v-on="getEvents(props.option)"
    />
    <component
      :is="props.option.element"
      v-if="getRenderType(props.option) === 'nested' && children && children.element !== 'slot'"
      v-model="props.modelValue[props.option.modelKey]"
      v-bind="getProps(props.option)"
      v-on="getEvents(props.option)"
    >
      <!--  fix: Prevent conflicts with default slots, eg: el-checkbox -->
      <template v-if="children.children">
        <component
          :is="children.element"
          v-for="(item, i) in getRenderList(children)"
          :key="`${children.element}_${i.toString()}`"
          v-bind="getProps(children, item)"
          v-on="getEvents(children)"
        >
          <filter-item
            :option="children.children"
            :parent-data="item"
            :parent-index="i"
          />
        </component>
      </template>
      <template v-else>
        <component
          :is="children.element"
          v-for="(item, i) in getRenderList(children)"
          :key="`${children.element}_${i.toString()}`"
          v-bind="getProps(children, item)"
          v-on="getEvents(children)"
        />
      </template>
    </component>
    <component
      :is="props.option.element"
      v-if="getRenderType(props.option) === 'nested' && children && children.element === 'slot' && children.slotName"
      v-model="props.modelValue[props.option.modelKey]"
      v-bind="getProps(props.option)"
      v-on="getEvents(props.option)"
    >
      <template
        v-for="name in children.slotName"
        :key="name"
        #[name]="slotScopeData"
      >
        <filter-item
          :slot-scope="slotScopeData"
          :option="children"
          :slot-name="name"
        />
      </template>
    </component>
  </template>

  <!-- nested -->

  <template v-if="!props.option.modelKey && getRenderType(props.option) !== 'slot' && props.option.renderList">
    <template v-if="children">
      <component
        :is="props.option.element"
        v-for="(item, i) in getRenderList(props.option)"
        :key="`${props.option.element}_${i.toString()}`"
        v-bind="getProps(props.option, item)"
        v-on="getEvents(props.option)"
      >
        <filter-item
          :option="children"
          :parent-data="item"
          :parent-index="i"
        />
      </component>
    </template>
    <template v-else>
      <component
        :is="props.option.element"
        v-for="(item, i) in getRenderList(props.option)"
        :key="`${props.option.element}_${i.toString()}`"
        v-bind="getProps(props.option, item)"
        v-on="getEvents(props.option)"
      />
    </template>
  </template>

  <!-- slot -->

  <template v-if="getRenderType(props.option) === 'slot' && props.option.slotName && !props.option.renderList">
    <template
      v-for="name in props.option.slotName"
      :key="name"
    >
      <render-slot
        v-if="!props.slotName || name === props.slotName"
        :slot-render="customSlot(name)"
        :scope-data="props"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
import { useProps } from '@utils/mixins'
import { watch, computed, inject } from 'vue'
import RenderSlot from '../common/render-slot'
import { filterItemProps } from './props'
import type { FilterGroupOption } from './props'
import type { Slots } from 'vue'

const _props = defineProps(filterItemProps)

const emit = defineEmits<{
  (e: 'updateValue', data: any, item: FilterGroupOption): void
}>()

const rootSlots = inject<Slots>('rootSlots')

const props = useProps('', _props, {
  option: {
    element: '',
    modelKey: ''
  },
  modelValue: {},
  parentData: null,
  parentIndex: 0,
  slotName: '',
  slotScope: null
})

const children = computed(() => {
  if (getRenderType(props.option) === 'nested')
    return props.option.children as FilterGroupOption
  else
    return null
})

const customSlot = (slotName: string) => {
  if (slotName && rootSlots)
    return rootSlots[slotName] || null
  else
    return null
}

const getRenderType = (option: FilterGroupOption) => {
  const { children, element } = option
  if (element === 'slot') {
    return 'slot'
  } else {
    if (children)
      return 'nested'
    else
      return 'normal'
  }
}

const getEvents = (option: FilterGroupOption | null) => {
  return option?.events || {}
}

const getProps = (option: FilterGroupOption, data?: any) => {
  const { props } = option
  let result = props || {}

  if (typeof props === 'function')
    result = props(data) || {}

  return result
}

const getRenderList = (option: FilterGroupOption) => {
  const { renderList } = option

  let res = renderList || []

  if (typeof renderList === 'function')
    res = renderList(props.parentData, props.parentIndex) || []

  return res as any[]
}

watch(() => {
  const modelKey = props.option.modelKey || ''
  return props.modelValue[modelKey]
}, (val: any) => {
  emit('updateValue', val, props.option)
})
</script>

<script lang="ts">
export default {
  name: 'FilterItem'
}
</script>
