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
