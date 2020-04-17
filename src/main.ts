import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/assets/styles/index.less';
// import '@/styles/element-variables.scss'
// import '@/styles/index.scss'
import './assets/styles/index.less';
import Utils from './utils';

Vue.use(Utils);
Vue.config.productionTip = false;
Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
