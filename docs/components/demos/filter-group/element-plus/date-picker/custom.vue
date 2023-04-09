<template>
  <pin-filter-group
    v-model="query"
    :option="filterGroupOption"
  >
    <template #default="scope">
      <div
        class="cell"
        :class="{ current: scope.data.slotScope.isCurrent }"
      >
        <span class="text">{{ scope.data.slotScope.text }}</span>
        <span
          v-if="isHoliday(scope.data.slotScope)"
          class="holiday"
        />
      </div>
    </template>
  </pin-filter-group>
  <h5>query的值</h5>
  <p>{{ query }}</p>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import type { FilterGroupOption } from 'pinos-ui'

export default defineComponent({
  name: 'Fg',
  setup() {
    const filterGroupOption = computed<FilterGroupOption[]>(() => {
      return [
        {
          element: 'el-date-picker',
          modelKey: 'value',
          props: {
            'type': 'date',
            'placeholder': '请选择',
            'format': 'YYYY/MM/DD',
            'value-format': 'YYYY-MM-DD'
          },
          children: {
            element: 'slot',
            slotName: ['default']
          }
        }
      ]
    })

    const isHoliday = ({ dayjs }) => {
      return holidays.has(dayjs.format('YYYY-MM-DD'))
    }

    const holidays = new Set([
      '2021-10-01',
      '2021-10-02',
      '2021-10-03',
      '2021-10-04',
      '2021-10-05',
      '2021-10-06',
      '2021-10-07'
    ])

    const query = ref<Record<string, any>>({
      value: '2021-10-01'
    })

    return {
      filterGroupOption,
      query,
      isHoliday
    }
  }
})
</script>

<style scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}

.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}

.cell.current .text {
  background: #626aef;
  color: #fff;
}

.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
