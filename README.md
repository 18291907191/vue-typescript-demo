[TOC]

# vue-typescript-demo

> 采用vue+typescripe从零搭建的一个管理平台，主要用于实践练习和记录。

## 项目搭建

### 下载依赖

```bash
npm install @vue/cli -g
mkdir vue-typescript-demo
cd vue-typescript-demo
vue create .
```

自定义安装选择typescript即可

### 运行

```bash
npm run serve
```

### 下载element-ui依赖

```bash
npm install element-ui -D
```

在main.ts文件中引入

```bash
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
```

### 安装vuex依赖模块

```bash
npm install vuex-module-decorators -D
```

[VuexModule官方文档](https://github.com/championswimmer/vuex-module-decorators)

### 安装预编译处理器

这里选用less

```bash
npm install less less-loader node-sass -D
```

下载完成后，即可使用less语法

### less全局变量配置

因此我们需要在根目录下新建vue.config.js文件

Vue.config.js:

```js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 9527 // TODO: get this variable from setting.ts
const mockServerPort = 9528 // TODO: get this variable from setting.ts
const name = 'Vue Typescript Admin' // TODO: get this variable from setting.ts

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${mockServerPort}/mock-api/v1`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  pwa: {
    name: name,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js')
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/_variables.less'),
      ]
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)

    // https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-eval-source-map')
      )

    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
    // replace with another progress output plugin to solve the this bug:
    // https://github.com/vuejs/vue-cli/issues/4557
    config.plugin('simple-progress-webpack-plugin')
      .use(require.resolve('simple-progress-webpack-plugin'), [{
        format: 'compact'
      }])

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: path.resolve(__dirname, 'src/components'),
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}

```

当然这里包含了其他的依赖模块及配置

需要注意的是less的配置

```bash
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/_variables.less'),
      ]
    }
```

如果是scss的话则需要配置preProcessor: scss

_variables.less:

```less
@bg-black: #000000;
@font-blue: #3576e0;
```

配置完成后则在全局使用即可。

## 目录结构

```bash
├── mock/                      # mock server & mock data
├── public                     # public static assets (directly copied)
│   │── favicon.ico            # favicon
│   │── manifest.json          # PWA config file
│   └── index.html             # index.html template
├── src                        # main source code
│   ├── api                    # api service
│   ├── assets                 # module assets like fonts, images (processed by webpack)
│   ├── components             # global components
│   ├── directives             # global directives
│   ├── filters                # global filter
│   ├── icons                  # svg icons
│   ├── lang                   # i18n language
│   ├── layout                 # global layout
│   ├── pwa                    # PWA service worker related files
│   ├── router                 # router
│   ├── store                  # store
│   ├── styles                 # global css
│   ├── utils                  # global utils
│   ├── views                  # views
│   ├── App.vue                # main app component
│   ├── main.ts                # app entry file
│   ├── permission.ts          # permission authentication
│   ├── settings.ts            # setting file
│   └── shims.d.ts             # type definition shims
├── tests/                     # tests
├── .circleci/                 # automated CI configuration
├── .browserslistrc            # browserslist config file (to support Autoprefixer)
├── .editorconfig              # editor code format consistency config
├── .env.xxx                   # env variable configuration
├── .eslintrc.js               # eslint config
├── babel.config.js            # babel config
├── cypress.json               # e2e test config
├── jest.config.js             # jest unit test config
├── package.json               # package.json
├── postcss.config.js          # postcss config
├── tsconfig.json              # typescript config
└── vue.config.js              # vue-cli config
```

## 元数据

```bash
export default class Home extends Vue {
	public msg: string = '123'
	private msg2: number = 222
}
```

## props

```bash
import { Prop } form 'vue-property-decorators';
@Prop({ default: '111' }) readonly msg1: string! = '000';
```

## components

```bash
<template>
	<div>
		<Child />
	</div>
</template>

import Child form '@/component/Child';
import { Component } from 'vue-property-decorators';
@Component({
	components: {
		Child,	
	}
})
```

## vuex-module-decorators || vuex-class
两者都可以使用相比较而言，vuex-class的使用能更加简洁一些

> 是什么？vuex-module-decorators是一个基于typescript的语法下对vuex的一层封装。
>
> 为什么？便于我们在typescript下更方便的使用与管理
>
> 官网：https://github.com/championswimmer/vuex-module-decorators

1. 安装依赖

```bash
npm install -D vuex-module-decorators
```

2. 使用

```bash
|-store
|---module
|------global.ts
|---index.ts
```

lobal.ts

```ts
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({ name: 'GlobalModule', namespaced: true })
export default class GlobalModule extends VuexModule {
  public isCollapse = false;
  
  @Mutation
  public SET_COLLAPSE() {
    this.isCollapse = !this.isCollapse;
  }
}
```

inex.ts

```ts
import Vue from 'vue';
import Vuex from 'vuex';

import GlobalModule from './module/global';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    GlobalModule,
  }
});
```

在页面中使用：

Aslide.vue

```vue
<template>
  <div class="aslide">
    <div class="logo">Logo图标</div>
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
import { getModule } from 'vuex-module-decorators';
import store from '@/store';
import GlobalModule from '@/store/module/global';
const storeGlobalModule = getModule(GlobalModule, store);

@Component({
  name: 'Aslide',
})
export default class extends Vue {
  public isCollapse = storeGlobalModule.isCollapse
  handleOpen(key: string, keyPath: string[]): void {
    console.log(key, keyPath);
  }
  handleClose(key: string, keyPath: string[]): void {
    console.log(key, keyPath);
  }
  mounted(): void {
    console.log(storeGlobalModule);
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
```

大家可以看到打印出来的storeGlobalModule

![image-20200417175818327](../../../Library/Application Support/typora-user-images/image-20200417175818327.png)

至此，我们可以通过storeGlobalModule.isCollapse来使用

另外一种方式是将store挂载在vue的原型链上

然后通过this.$store.state.GlobalModule.isCollapse来使用

![image-20200417180210562](../../../Library/Application Support/typora-user-images/image-20200417180210562.png)

## computed

```bash
get getMsg() {
	return this.msg;
}
```

在计算的方法前加上get即可

## watch

```bash
import { Watch } form 'vue-property-decorators'
@Watch('msg')
getMsg(newVal:any,oldVal:any) {
	// do something
	return newVal
}
```

## ref

```bash
<child ref="childComponent">子组件</child>
import { Ref } from 'vue-property-decorators'
@Ref('childComponent') childComponent!: HTMLFormElement
this.childComponent.func();
```

## filter

```bash
<div>{{ 'bmw' | filt1 }}</div>
import { Component } from 'vue-property-decorators';
@Component({
	filters: (data: string, arg = 2): string => {
		return data + arg;
	}
})
```

输出为bmw2

## directives

```bash
<div v-direc1></div>
import { Component } from 'vue-property-decorators'
@Component({
	directives: {
	direc1: (el: HTMLElement, binding) => console.log('directive的使用')
	}
})
```

## interface

一般的使用的话，会先建一个types

types/index.ts

```typescript
export interface Person{
  name: string;
  age: number;
  gender: number;
}
```

Test.vue

```bash
import { Person } from '@/types';
export default class Test extends Vue {
	msg2: Person = {name: '张三', age: 99, gender: 1};
	mounted(): void {
		console.log('test mounted', this.msg2.name);
	}
}
```



