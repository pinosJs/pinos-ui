<script lang="ts" setup>
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
  </div>
</template>
