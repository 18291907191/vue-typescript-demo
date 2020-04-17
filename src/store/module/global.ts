/**
 * @description: 全局变量模块
 * @since 20200416
 * @author 狗尾草
 */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({ name: 'GlobalModule', namespaced: true })
export default class GlobalModule extends VuexModule {
  public isCollapse = false;
  
  @Mutation
  public SET_COLLAPSE() {
    this.isCollapse = !this.isCollapse;
  }
}
