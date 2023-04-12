<template>
  <div class="box">
    <h4>中国China</h4>
    <p>校验结果：{{ mustBeChinese('中国China') }}</p>
    <h4>中国</h4>
    <p> 校验结果：{{ mustBeChinese('中国') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { mustBeChinese } from '@pinos-ui/utils'
</script>
