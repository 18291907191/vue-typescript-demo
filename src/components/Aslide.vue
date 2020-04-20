/* eslint-disable vue/valid-v-for */
<template>
  <div class="aslide">
    <div class="logo" @click="handleChangeCollapse">Logo图标</div>
    <div class="menu">
      <el-menu
        ref="menuchild"
        class="el-menu-vertical-demo"
        :default-active="active"
        :unique-opened="true"
        :collapse="isCollapse"
        :router="true">
        <template v-for="item in menuList">
          <el-submenu class="hav-sub-item" v-if="item.itemGroup" :key="item.index" :index="item.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="(subItem,subIndex) in item.itemGroup" :key="subIndex" :index="subItem.path">
              {{subItem.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.path" :key="item.index">
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
import { Component, Watch, Vue, Ref } from 'vue-property-decorator';
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
  private active = '';
  private openeds: Array<string> = [];
  @Ref('menuchild') menuchild!: HTMLFormElement

  get isCollapse() {
    return storeGlobalModule.isCollapse;
  }
  @Watch("$route")
  routechange(to: any, from: any) {
    if(to.fullPath.split("?")[0] == '/article/detail') {
      this.active = from.fullPath;
    } else {
      this.setMenulist(to);
    }
  }
  handleOpen(key: string, keyPath: string[]): void {
    console.log(key, keyPath);
  }
  handleClose(key: string, keyPath: string[]): void {
    console.log(key, keyPath);
  }
  // 菜单收缩
  handleChangeCollapse(): void {
    storeGlobalModule.SET_COLLAPSE();
  }
  // 设置菜单栏
  setMenulist(route: any) {
    if (route.matched[0].path != "") {
      // 多页面菜单栏
      this.active = route.fullPath.split("?")[0]; //携带参数时，只匹配"?"前的路径
    } else if (route.matched[1].path != "") {
      // 单页面菜单栏
      console.log(route.fullPath.split("?")[0]);
      this.active = route.fullPath.split("?")[0]; //携带参数时，只匹配"?"前的路径
    } else {
      this.$nextTick(() => {
        this.active = "";
        this.openeds = [''];
        this.menuchild.close(this.active);
        console.log('88', this.$refs['menuchild']);
      });
    }
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
      background-color: #000000;
      color: #ffffff;
      .hav-sub-item {
        .el-submenu__title {
          text-align: left;
          i {
            font-size: 14px;
            // color: #bebebe!important;
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
          // color: #bebebe!important;
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