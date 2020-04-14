<template>
  <header class="header">Header</header>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class Header extends Vue {

}
</script>

<style lang="less" scoped>
  .header {
    line-height: 60px;
    color: #ffffff;
    flex-shrink: 0;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>