<template>
  <div class="box">
    <div
      ref="target"
      class="wrapper red-box"
    />
    <h4>是否存在 red-box 该样式类</h4>
    <p>{{ hasRedBox }}</p>
    <h4>是否存在 wrapper1  样式类</h4>
    <p>{{ hasWrapper1 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { hasClassName } from '@pinos-ui/utils'
import { onMounted, ref } from 'vue'

const target = ref()
const hasRedBox = ref(false)
const hasWrapper1 = ref(false)

onMounted(() => {
  hasRedBox.value = hasClassName(target.value, 'red-box')
  hasWrapper1.value = hasClassName(target.value, 'wrapper1')
})
</script>

<style scoped>
.box {
  height: 300px;
}

.wrapper {
  width: 80px;
  height: 80px;
}

.red-box {
  background-color: red;
}
</style>
