<template>
  <div class="box">
    <h4>初始值：helloWorld</h4>
    <h4>转化后</h4>
    <p>{{ toKebabCase('helloWorld') }}</p>
    <h4>初始值：HelloWorld</h4>
    <h4>转化后</h4>
    <p>{{ toKebabCase('HelloWorld') }}</p>
    <h4>初始值：hello-world</h4>
    <h4>转化后</h4>
    <p>{{ toKebabCase('hello-world') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { toKebabCase } from '@pinos-ui/utils'
</script>
