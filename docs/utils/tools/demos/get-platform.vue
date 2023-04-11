<template>
  <div class="box">
    所在平台：{{ platform }}
  </div>
</template>

<script lang="ts" setup>
import { getPlatform } from '@pinos-ui/utils'
import { ref, onMounted } from 'vue'

const platform = ref('')

onMounted(() => {
  platform.value = getPlatform()
})
</script>
