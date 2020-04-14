import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import store from '@/store';

@Module({ name: 'Global', namespaced: true, stateFactory: true })
export default class Global extends VuexModule {
  public isCollapse = false;
  
  @Mutation
  public SET_COLLAPSE() {
    this.isCollapse = !this.isCollapse;
  }
}