<template>
  <div class="box">
    <el-button @click="handleRandom">
      生成随机数
    </el-button>
    <p>{{ random }}</p>
    <el-button @click="handleCustomRandom">
      自定义随机数的模板
    </el-button>
    <p>{{ customRandom }}</p>
  </div>
</template>

<script lang="ts" setup>
import { generateRandom } from '@pinos-ui/utils'
import { ref } from 'vue'

const random = ref('')
const customRandom = ref('')

const handleRandom = () => {
  random.value = generateRandom(100)
}

const handleCustomRandom = () => {
  customRandom.value = generateRandom(5, '只因你太美')
}
</script>
