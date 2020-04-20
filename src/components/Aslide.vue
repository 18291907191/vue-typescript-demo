/* eslint-disable vue/valid-v-for */
<template>
  <div class="aslide">
    <div class="logo" @click="handleChangeCollapse">Logo图标</div>
    <div class="menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <template v-for="item in menuList">
          <el-submenu class="hav-sub-item" v-if="item.itemGroup" :key="item.index" :index="item.index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="(subItem,subIndex) in item.itemGroup" :key="subIndex" :index="item.subIndex">
              {{subItem.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="version">v1.0.0</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import store from '@/store';
import GlobalModule from '@/store/module/global';
import menuList from '@/constans/menu.json';
const storeGlobalModule = getModule(GlobalModule, store);

@Component({
  name: 'Aslide',
})
export default class extends Vue {
  private menuList = menuList;

  get isCollapse() {
    return storeGlobalModule.isCollapse;
  }
  handleOpen(key: string, keyPath: string[]): void {
    console.log(key, keyPath);
  }
  handleClose(key: string, keyPath: string[]): void {
    console.log(key, keyPath);
  }
  handleChangeCollapse(): void {
    storeGlobalModule.SET_COLLAPSE();
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
    color: @font-white;
    cursor: pointer;
  }
  .menu {
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    /*滚动条样式*/
    &::-webkit-scrollbar {
      width: 0px;
      background-color: rgb(84, 92, 100);
    }
    /deep/.el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 140px;
    }
    .el-menu {
      height: 100%;
      border-right: none;
      border-right: none;
      text-align: left;
      .hav-sub-item {
        .el-submenu__title {
          text-align: left;
          i {
            font-size: 14px;
            color: #bebebe!important;
            margin-right: 8px;
          }
        }
        .el-menu-item {
          text-align: center;
          width: 140px;
          min-width: auto;
          font-size: 12px;
        }
      }
      .el-menu-item {
        i {
          font-size: 14px;
          color: #bebebe!important;
          margin-right: 8px;
        }
      }
    }
    .el-menu--collapse {
      width: auto;
    }
  }
}
.version {
  line-height: 30px;
  color: #ffffff;
  font-size: 14px;
}
</style>