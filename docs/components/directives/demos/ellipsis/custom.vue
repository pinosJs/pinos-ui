<template>
  <div class="flex">
    <div
      v-ellipsis="{
        lineClamp: 3,
        fillText: '🔥🔥',
      }"
      class="text"
    >
      {{ text }}
    </div>
    <div class="right">
      我是固定的
    </div>
  </div>
</template>

<script lang="ts" setup>
import { vEllipsis } from 'pinos-ui'
import { ref } from 'vue'

const text = ref('怒发冲冠，凭阑处，㴋㴋雨歇。抬望眼，仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲，白了少年头，空悲切。靖康耻，犹未雪；臣子恨，何时灭？驾长车，踏破贺兰山缺。壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头，收拾旧山河，朝天阙!')
</script>

<style scoped>
.flex {
  width: 200px;
  display: flex;
  margin: 10px 0;
}

.text {
  flex: 1;
  padding: 0 10px;
}

.right {
  flex-shrink: 0;
  margin-left: 10px;
}
</style>
