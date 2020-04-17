import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/components/Layout.vue';

Vue.use(VueRouter);

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/extendcomponent',
    name: 'ExtendComponent',
    component: () => import(/* webpackChunkName: "about" */ '@/components/ExtendComponent.vue')
  },
  {
    path: '/classcomponent',
    name: 'ClassComponent',
    component: () => import(/* webpackChunkName: "about" */ '@/components/ClassComponent.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
