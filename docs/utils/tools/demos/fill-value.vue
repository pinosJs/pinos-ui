<template>
  <div class="box">
    <h4>初始值：</h4>
    <p>{{ str }}</p>
    <h4>只保留第一位和最后一位</h4>
    <p>{{ fillValue(str, 1, 4) }}</p>
    <h4>除了前两位全部隐藏</h4>
    <p>{{ fillValue(str, 2, str.length-1, '*') }}</p>
    <h4>除了前两位,其他替换为空字符</h4>
    <p>{{ fillValue(str, 2, str.length-1, '') }}</p>
    <h4>全部替换为🔥</h4>
    <p>{{ fillValue(str, 0, str.length-1, new Array(str.length).fill('🔥').join('')) }}</p>
  </div>
</template>

<script lang="ts" setup>
import { fillValue } from '@pinos-ui/utils'
import { ref } from 'vue'

const str = ref('123456')
</script>
