import Vue from 'vue';
import VueRouter, { RouteConfig, Route } from 'vue-router';
// import Home from '@/components/Layout.vue';
const _import = (file: string) => () => import('@/views/' + file + '.vue');
const _import_ = (file: string) => () => import('@/components/' + file + '.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: _import('login/index'),
  },
  {
    path: '/',
    name: 'classComponent',
    component: _import_('Layout'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: '总览',
        component: _import_('ClassComponent'),
        beforeEnter: (to: Route, from: Route, next: Function) => {
          console.log('独享前置守卫');
          next();
        },
        meta: {
          isAlive: false,
          auth: true,
          title: '类式组件'
        }
      }
    ]
  },
  {
    path: '/article',
    name: '文章',
    component: _import_('Layout'),
    redirect: '/article/publish',
    children: [
      {
        path: '/article/publish',
        name: '文章发布',
        component: _import('article/publish'),
        meta: {
          auth: true,
          isAlive: true,
          isFooter: false,
          title: '文章发布'
        }
      },
      {
        path: '/article/list',
        name: '列表',
        component: _import('article/list'),
        meta: {
          auth: true,
          isAlive: false,
          isFooter: true,
          title: '列表'
        }
      },
      {
        path: '/article/draft',
        name: '草稿箱',
        component: _import('article/draft'),
        meta: {
          auth: true,
          isAlive: false,
          isFooter: true,
          title: '草稿箱'
        }
      },
      {
        path: '/article/detail',
        name: '文章详情',
        component: _import('article/detail'),
        meta: {
          auth: true,
          isAlive: false,
          isFooter: false,
          title: '文章详情'
        }
      }
    ]
  },
  {
    path: '/tag',
    name: '标签',
    component: _import_('Layout'),
    redirect: '/tag/list',
    children: [
      {
        path: '/tag/list',
        name: '标签列表',
        component: _import('tag/list'),
        meta: {
          auth: true,
          isAlive: true,
          isFooter: false,
          title: '文章发布'
        }
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: _import('error/index'),
    meta: {
      title: "请求页面未找到",
      auth: false
    },
  },
  {
    path: '*',
    meta: {
      title: "请求页面未找到",
      auth: false
    },
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
