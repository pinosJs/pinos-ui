<template>
  <div class="box">
    <div
      ref="target"
      class="wrapper red-box"
    />
    <h4>添加一个blue-box的样式类</h4>
    <el-button @click="handleAddOne">
      添加
    </el-button>
    <h4>添加多个样式类</h4>
    <el-button @click="handleAddMore">
      添加
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { addClassName } from '@pinos-ui/utils'
import { ref } from 'vue'

const target = ref()

const handleAddOne = () => {
  addClassName(target.value, 'blue-box')
}

const handleAddMore = () => {
  addClassName(target.value, 'orange-box wrapper-small')
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
