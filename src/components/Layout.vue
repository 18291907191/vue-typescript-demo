<template>
  <el-container class="wraper">
    <Aslide />
    <el-container class="is-vertical">
      <Header />
      <el-main class="el-content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
          </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Aslide from '@/components/Aslide.vue';
import ClassComponent from '@/components/ClassComponent.vue';
import ExtendComponent from '@/components/ExtendComponent.vue';

@Component({
  components: {
    ClassComponent,
    ExtendComponent,
    Header,
    Aslide,
  }
})
export default class Home extends Vue {
  ComponentName = 'Home Component'
  mounted(): void {
    console.log('Home-Component mounted');
  }
} 
</script>

<style lang="less" scoped>
@bg-black: #000000;
@font-black: #333333;
.wraper {
  height: 100%;
}
// .el-header, .el-footer {
//   background-color: @bg-black;
//   color: @font-black;
//   text-align: center;
//   line-height: 60px;
// }

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>