<template>
  <div class="box">
    <h4>合并对象：</h4>
    <el-button @click="handleClone">
      在控制台查看合并的对象
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { mergeObject } from '@pinos-ui/utils'
import { ref } from 'vue'

const source = ref({
  name: 'zhangshan',
  obj: {
    name: 'sourceName'
  },
  arr: [2, { name: 'source', age: 18 }],
  ref: ref([{
    kf: 'hello'
  }])
})
const target = {
  obj: {
    name: 'targetName'
  },
  tObj: {
    name: 'target'
  },
  tArr: [{
    age: {
      age: 18
    }
  }],
  arr: [2, { name: 'target', age: 20, desc: '我是target特有的' }],
  tFunc: () => {
    return 123
  }
}

const handleClone = () => {
  console.log(mergeObject(source.value, target))
}
</script>
