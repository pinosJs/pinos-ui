<template>
  <div class="box">
    <h4>🔥1</h4>
    <p>校验结果：{{ existEmoji('🔥1') }}</p>
    <h4>🔥</h4>
    <p> 校验结果：{{ existEmoji('🔥') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { existEmoji } from '@pinos-ui/utils'
</script>
