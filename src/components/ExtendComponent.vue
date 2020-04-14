<template>
  <div>{{componentName}}
    <div>父组件：{{msg}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['msg'],
  data() {
    return {
      componentName: '扩展式组件'
    }
  },
  mounted(): void {
    console.log('Extend-Component mounted');
  }
})
</script>

<style lang="less" scoped>

</style>