import store from '@/store';

const install = (Vue: Function): void => {
  Vue.prototype.$store = store;
};
export default install;
