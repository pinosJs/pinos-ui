<template>
  <div class="box">
    <h4>13980001001</h4>
    <p>校验结果：{{ validatePhone('13980001001') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { validatePhone } from '@pinos-ui/utils'
</script>
