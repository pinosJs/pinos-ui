<template>
  <div class="box">
    <div
      ref="target"
      class="wrapper red-box"
      :style="targetStyle"
    >
      hello
    </div>
    <h4>获取内联样式</h4>
    <el-button @click="handleInline">
      获取
    </el-button>
    <p>color: {{ inlineText }}</p>
    <h4>获取内部样式</h4>
    <el-button @click="handleStyle">
      获取
    </el-button>
    <p>height: {{ styleText }}</p>
  </div>
</template>

<script lang="ts" setup>
import { getStyle } from '@pinos-ui/utils'
import { ref } from 'vue'

const target = ref()
const targetStyle = ref({
  color: '#fff'
})
const inlineText = ref<any>('')
const styleText = ref<any>('')
const handleInline = () => {
  inlineText.value = getStyle(target.value, 'color')
}

const handleStyle = () => {
  styleText.value = getStyle(target.value, 'height')
}
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

.blue-box {
  background-color: blue;
}

.orange-box {
  background-color: orange;
}

.wrapper-small {
  width: 40px;
  height: 40px;
}
</style>
