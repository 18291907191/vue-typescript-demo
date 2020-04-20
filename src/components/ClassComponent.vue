<template>
  <div class="home">
    {{componentName}}
    <div>父组件：{{msg}}</div>
    <div>父组件3：{{msg3}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Person } from '@/types';
@Component({})
export default class Home extends Vue {
  @Prop() readonly msg!: string;
  @Prop({ default: "msg3默认值" }) readonly msg3: string|undefined;

  componentName =  '类式组件';
  msg2: Person = {name: '张三', age: 99, gender: 1};

  mounted(): void {
    console.log('class-component mounted', this.msg2.name);
  }
}
</script>
