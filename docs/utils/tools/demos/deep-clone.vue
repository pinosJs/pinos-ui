<template>
  <div class="box">
    <h4>原始对象：</h4>
    {{
      source
    }}
    <h4>克隆对象：</h4>
    {{ cloneData }}
    <div>
      <el-button @click="changeCloneData">
        修改克隆对象的arr属性
      </el-button>
      <el-button @click="call">
        调用克隆函数的func
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { deepClone } from '@pinos-ui/utils'
import { ref, onMounted } from 'vue'

const source = ref({
  date: new Date(),
  set: new Set([1]),
  map: new Map(),
  arr: [{
    list: [1, 2, 3]
  }],
  func: () => {
    return 123
  }
})

const cloneData = ref<any>(null)

const changeCloneData = () => {
  cloneData.value.arr[0].list[0] = Date.now()
}

const call = () => {
  alert(`返回值为：${cloneData.value.func()}`)
}

onMounted(() => {
  cloneData.value = deepClone(source.value)
})
</script>

<style scoped>
.box {
  overflow: auto;
}
</style>
