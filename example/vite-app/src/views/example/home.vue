<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const text = ref('的基地就得就得到得劲儿的的的金额ID将诶的金额跌价叠加的额得的将诶德吉饿的的Jedi的的的二弟的记得记得记得接近底价得的将诶德吉饿的记得记得就得')
const lineClamp = ref(1)
onMounted(() => {
  setTimeout(() => {
    text.value = 'hello world ddehdiei 的话ID黑饿得慌IDhi额蝴蝶花的话ID黑饿得慌IDhi额蝴蝶花的话ID黑饿得慌IDhi额蝴蝶花'
    lineClamp.value = 2
    console.log('跟新后的: ', text.value)
  }, 2000)
})
// import { Button } from 'pinos-ui'
</script>

<script lang="ts">
export default {
  name: 'HomePage'
}
</script>

<template>
  <div class="full-page-container">
    <!-- 配置共有的属性，并重新命名样式的namespace -->
    <pin-config-provider
      :props="{Button: {text: '456'}}"
      namespace="po"
    >
      <pin-button />
    </pin-config-provider>

    <div
      v-ellipsis
      class="text2"
    >
      的基地就得就得到得劲儿的的的金额ID将诶的金额跌价叠加的额得的将诶德吉饿的的Jedi的的的二弟的记得记得记得接近底价得的将诶德吉饿的记得记得就得
    </div>

    <div
      v-ellipsis="{
        lineClamp: 2
      }"
      class="text2"
    >
      的基地就得就得到得劲儿的的的金额ID将诶的金额跌价叠加的额得的将诶德吉饿的的Jedi的的的二弟的记得记得记得接近底价得的将诶德吉饿的记得记得就得
    </div>

    <div
      v-ellipsis="{
        content: text,
        lineClamp: lineClamp
      }"
      class="text"
    >
      {{ text }}
    </div>

    <div class="flex">
      <div
        v-ellipsis="{
          lineClamp: 3,
        }"
        class="text3"
      >
        的基地就得就得到得劲儿的的的金额ID将诶的金额跌价叠加的额得的将诶德吉饿的的Jedi的的的二弟的记得记得记得接近底价得的将诶德吉饿的记得记得就得
        的基地就得就得到得劲儿的的的金额ID将诶的金额跌价叠加的额得的将诶德吉饿的的Jedi的的的二弟的记得记得记得接近底价得的将诶德吉饿的记得记得就得
      </div>
      <div class="r">
        我是固定的
      </div>
    </div>

    <div class="flex">
      <div
        v-ellipsis="{
          lineClamp: 2,
          fillText: '🔥🔥',
        }"
        class="text3"
      >
        的基地就得就得到得劲儿的的的金额ID将诶的金额跌价叠加的额得的将诶德吉饿的的Jedi的的的二弟的记得记得记得接近底价得的将诶德吉饿的记得记得就得
        的基地就得就得到得劲儿的的的金额ID将诶的金额跌价叠加的额得的将诶德吉饿的的Jedi的的的二弟的记得记得记得接近底价得的将诶德吉饿的记得记得就得
      </div>
      <div class="r">
        我是固定的
      </div>
    </div>

    <div class="flex">
      <div
        v-ellipsis="{
          lineClamp: 1,
          fillText: '🔥🔥',
        }"
        class="text3"
      >
        的基地就得就得到得劲儿的的的金额ID将诶的金额跌价叠加的额得的将诶德吉饿的的Jedi的的的二弟的记得记得记得接近底价得的将诶德吉饿的记得记得就得
        的基地就得就得到得劲儿的的的金额ID将诶的金额跌价叠加的额得的将诶德吉饿的的Jedi的的的二弟的记得记得记得接近底价得的将诶德吉饿的记得记得就得
      </div>
      <div class="r-longer">
        我是固定的
      </div>
    </div>
  </div>
</template>

<style scoped>
.text{
  margin: 10px;
  width: 200px;
  padding: 20px 0px;
  /* line-height: 1; */
}
.text2{
  margin: 10px;
  width: 200px;
  padding: 0  20px;
  line-height: 1.2;
}
.flex {
  width: 200px;
  display: flex;
}
.text3{
  margin: 10px;
  flex: 1;
  padding: 0 2px;
  line-height: 1.2;
}
.r {
  flex-shrink: 0;
  margin-left: 10px;
}
.r-longer {
  width: 120px;
  flex-shrink: 0;
  margin-left: 10px;
}
</style>
