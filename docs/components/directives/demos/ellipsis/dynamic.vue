<template>
  <el-button @click="handleChange">
    change
  </el-button>
  <div
    v-ellipsis="{
      lineClamp,
      content: text
    }"
    class="text"
  >
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { vEllipsis } from 'pinos-ui'
import { ref } from 'vue'

const lineClamp = ref(2)

const text1 = '-怒发冲冠，凭阑处，㴋㴋雨歇。抬望眼，仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲，白了少年头，空悲切。靖康耻，犹未雪；臣子恨，何时灭？驾长车，踏破贺兰山缺。壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头，收拾旧山河，朝天阙!'
const text2 = '我改变后的内容--怒发冲冠，凭阑处，㴋㴋雨歇。抬望眼，仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲，白了少年头，空悲切。靖康耻，犹未雪；臣子恨，何时灭？驾长车，踏破贺兰山缺。壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头，收拾旧山河，朝天阙!'

const text = ref(text1)

const handleChange = () => {
  lineClamp.value = lineClamp.value === 2 ? 1 : 2
  text.value = text.value === text1 ? text2 : text1
}
</script>

<style scoped>
.text {
  margin: 10px;
  width: 300px;
  padding: 0 20px;
  line-height: 1.2;
}
</style>
