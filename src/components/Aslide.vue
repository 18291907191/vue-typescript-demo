<template>
  <div class="aslide">
    <div class="logo">Logo图标</div>
    <div class="menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="global.isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="version">v1.0.0</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { GlobalModule } from '@/store/module/global';
import { getModule } from 'vuex-module-decorators';
import store from '@/store';
import Global from '@/store/module/global';
const global = getModule(Global, store);
// import global from '@/store';
console.log(global);
@Component({})
export default class Aslide extends Vue {
  handleOpen(key: string, keyPath: string[]): void {
    console.log(key, keyPath);
  }
  handleClose(key: string, keyPath: string[]): void {
    console.log(key, keyPath);
  }  
}
</script>

<style lang="less" scoped>
.aslide {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 60px;
    font-size: 14px;
    box-sizing: border-box;
    padding: 0 4px;
  }
  .menu {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    .el-menu {
      height: 100%;
    }
    .el-menu--collapse {
      width: auto;
    }
  }
}
</style>