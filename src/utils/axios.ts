import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import router from './router'
import { TUser } from '@/types';
import store from './vuex'

//请求拦截
axios.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig=>{

  //抓取token
  let user:TUser = window.localStorage.getItem('user')
  user = user ? JSON.parse(user) : '';
  config.headers={token:user?.token}// //携带到请求头
  // config.headers={token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoZW5naGFvIiwiX2lkIjoiNWUwOTVkNDQwNjE3YTczMzM4MjhjMGMzIiwiaWF0IjoxNTgyODA0ODEyLCJleHAiOjE1ODI4OTEyMTJ9.I1AbftE9iCf8uv1GUBuWx87yL4npS2rgRl6MRYIUj94"}// //携带到请求头
 
  //显示loading
  store.commit('UPDATE_LOADING',true)

  return config;
},(error)=>{
  return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use((response:AxiosResponse<any>):AxiosResponse<any>=>{

  //token 过期， 跳转login，保留当前地址
  if(response.data.err===2 && !router.currentRoute.fullPath.includes('/login')){
    router.push({
      path:'/login',
      query:{
        path:router.currentRoute.fullPath
      }
    })
  }

  //关闭loading
  store.commit('UPDATE_LOADING',false)
  
  return response;
},(error)=>{
  return Promise.reject(error)
})

//对外暴露
window.axios = axios;   //需要declare global
export default axios;
