<template>
  <div class="box">
    <h4>初始值：</h4>
    <p>{{ str }}</p>
    <h4>转化后</h4>
    <p>{{ transformPxToViewport(str) }}</p>
  </div>
</template>

<script lang="ts" setup>
import { transformPxToViewport } from '@pinos-ui/utils'
import { ref } from 'vue'

const str = ref('75px')
</script>
