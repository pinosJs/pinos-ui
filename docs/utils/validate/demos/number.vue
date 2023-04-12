<template>
  <div class="box">
    <h4>校验是否为数字</h4>
    <p
      v-for="(item, index) in p1"
      :key="index"
    >
      {{ item }}是否为数字：{{ validateNumber(item) }}
    </p>

    <h4>正整数</h4>
    <p
      v-for="(item, index) in p2"
      :key="index"
    >
      {{ item }}是否为正整数：{{ validateNumber(item, { fixed: 0 }) }}
    </p>
    <h4>负整数</h4>
    <p
      v-for="(item, index) in p2"
      :key="index"
    >
      {{ item }}是否为负整数：{{ validateNumber(item, { fixed: 0, negative: true }) }}
    </p>
    <h4>小数位不超过2位的正小数</h4>
    <p
      v-for="(item, index) in p3"
      :key="index"
    >
      {{ item }}是否为小数位不超过2位的正小数：{{ validateNumber(item, { fixed: 2}) }}
    </p>
    <h4>小数位不超过2位的负小数</h4>
    <p
      v-for="(item, index) in p3"
      :key="index"
    >
      {{ item }}是否为小数位不超过2位的负小数：{{ validateNumber(item, { fixed: 2, negative: true }) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { validateNumber } from '@pinos-ui/utils'
import { ref } from 'vue'

const p1 = ref(['36', '36A', '36e3', '36.', 'a36', 3.6, '3..6', -3.6, '--3.6', '-3.6.0', '3.6.0', 0.0001, '-0.0', '-0.000', '-0.001'])
const p2 = ref([36, 0, 36.1, -36.0])
const p3 = ref([1.1, -1.1, -1.11, 1.101])
</script>
