<template>
  <div class="box">
    <h4>初始值：helloWorld</h4>
    <h4>转化后</h4>
    <p>{{ toCamelCase('helloWorld') }}</p>
    <h4>初始值：hello-world</h4>
    <h4>转化后</h4>
    <p>{{ toCamelCase('hello-world') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { toCamelCase } from '@pinos-ui/utils'
</script>
