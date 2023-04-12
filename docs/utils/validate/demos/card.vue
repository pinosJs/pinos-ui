<template>
  <div class="box">
    <h4>36010219990708300X</h4>
    <p>
      校验结果：
      {{ validateIdCard('36010219990708300X') }}
    </p>
    <h4>36010219990708300X后六位</h4>
    <p> 校验结果：{{ validateIdCard('08300X', true) }}</p>
  </div>
</template>

<script lang="ts" setup>
import { validateIdCard } from '@pinos-ui/utils'
</script>
