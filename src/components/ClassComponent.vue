<template>
  <div class="home">
    <h3>元数据</h3>
    <p>{{componentName}}<p>
    <h3>组件传值</h3>
    <p>父组件传值：{{msg}}</p>
    <p>父组件传值：{{msg3}}</p>
    <h3>过滤器</h3>
    <p>{{ 'bmw' | filt1 }}</p>
    <h3>指令</h3>
    <p v-direc1>direc1</p>
    <p v-direc1="'qq'">direc1</p>
    <h3>ref使用</h3>
    <p ref="test">ref测试数据</p>
    <h3>截图插件vue-cropper</h3>
    <button @click="handleCropper">cropper</button>

    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
      <div :style="previews.div">
        <img :src="option.img" :style="previews.img">
      </div>
    </div>
    <!-- <vueCropper
      ref="cropper"
      :img="option.img"
      :outputSize="option.size"
      :outputType="option.outputType"
      :info="true"
      :canScale="true"
      :full="option.full"
      :canMove="option.canMove"
      :canMoveBox="option.canMoveBox"
      :fixedBox="option.fixedBox"
      :original="option.original"
      @realTime="realTime"
    ></vueCropper> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
import { Person } from '@/types';

// import vueCropper from 'vue-cropper'

@Component({
  directives: {
    direc1: (el: HTMLElement, binding)=> console.log('direct1')
  },
  filters: {
    filt1: (data: string, arg = 2): string => {
      return data + arg;
    }
  },
  // components: {
    // vueCropper,
  // }
})
export default class Home extends Vue {
  @Prop() readonly msg!: string;
  @Prop({ default: "msg3默认值" }) readonly msg3: string|undefined;
  @Ref('test') test!: HTMLFormElement 
  @Ref('cropper') cropper!: HTMLFormElement

  // private option: object = {
  //   img: '',
  //   size: '1',
  //   outputType: 'png',
  //   full: true,
  //   canMove: true,
  //   canMoveBox: true,
  //   fixedBox: true,
  //   original: true,
  // }
  // private previews: object = {
  // }

  // 计算属性使用
  get getMsg() {
    return this.msg;
  }

  componentName =  '类式组件';
  msg2: Person = {name: '张三', age: 99, gender: 1};


  handleCropper() {
    console.log(this.cropper);
    this.cropper.startCrop();
  }
  // realTime(data) {
    // this.previews = data;
  // }
  mounted(): void {
    console.log('class-component mounted', this.msg2.name);
  }
}
</script>

<style lang="less" scoped>
h3 {
  height: 30px;
  font-size: 18px;
  font-weight: bold;
}
p {
  height: 30px;
}
</style>
