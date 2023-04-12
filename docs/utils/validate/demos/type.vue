<template>
  <div class="box">
    <h4>校验字符串</h4>
    <p>{{ validateType('', 'String') }}</p>
    <h4>校验数字</h4>
    <p>{{ validateType(1, 'Number') }}</p>
    <h4>校验null</h4>
    <p>{{ validateType(null, 'Null') }}</p>
    <h4>校验undefined</h4>
    <p>{{ validateType(undefined, 'Undefined') }}</p>
    <h4>校验NaN</h4>
    <p>{{ validateType(NaN, 'NaN') }}</p>
    <h4>校验object</h4>
    <p>{{ validateType({}, 'Object') }}</p>
    <h4>校验Array</h4>
    <p>{{ validateType([], 'Array') }}</p>
    <h4>校验function</h4>
    <p>{{ validateType(() => { }, 'Function') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { validateType } from '@pinos-ui/utils'
</script>
