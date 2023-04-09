<template>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  >
    <template #suffix>
      <span>suffix</span>
    </template>

    <template #default="scope">
      <div class="value">
        {{ scope.data.slotScope.item.value }}
      </div>
      <span class="link">{{ scope.data.slotScope.item.link }}</span>
    </template>
  </pin-filter-group>
  <h5>query的值</h5>
  <p>{{ query }}</p>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue'
import type { FilterGroupOption } from 'pinos-ui'

interface RestaurantItem {
  value: string
  link: string
}

export default defineComponent({
  name: 'Fg',
  setup() {
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'el-autocomplete',
          modelKey: 'value',
          props: {
            'fetch-suggestions': querySearch,
            'clearable': true,
            'placeholder': '请输入'
          },
          events: {
            select: handleSelect
          },
          children: {
            element: 'slot',
            slotName: ['suffix', 'default']
          }
        }
      ]
    })

    const restaurants = ref<RestaurantItem[]>([])

    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
      // call callback function to return suggestions
      cb(results)
    }

    const createFilter = (queryString: string) => {
      return (restaurant: RestaurantItem) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }

    const query = ref<Record<string, any>>({
      value: ''
    })

    const loadAll = () => {
      return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' }
      ]
    }

    const handleSelect = (item: RestaurantItem) => {
      console.log(item)
    }

    onMounted(() => {
      restaurants.value = loadAll()
    })

    return {
      filterGroupOption,
      query
    }
  }
})
</script>
