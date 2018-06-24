// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '!style-loader!css-loader!less-loader!./css/base.less';
import '!style-loader!css-loader!less-loader!./css/custom.less';

import vueResource from 'vue-resource';
Vue.use(vueResource);

import store from '@/store/index';


import {LoadPlugin , delayPlugin,ToastPlugin,ConfirmPlugin} from './utils/plugins'
Vue.use(LoadPlugin);
Vue.use(delayPlugin);
Vue.use(ToastPlugin);
//Vue.use(ToastPlugin,{unique:true});//唯一弹窗
Vue.use(ConfirmPlugin);

import MyPlugin from './utils/http'
Vue.use(MyPlugin);

import storage from './utils/dataStore'
Object.keys(storage).forEach(function(key) {
  Vue.use(storage[key]);
})

import filters from './utils/filters'
Object.keys(filters).forEach(v => {
  Vue.filter(v,filters[v]);
});



Vue.config.productionTip = false;

/* eslint-disable no-new */
var v = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  console.log('全局导航守卫beforeEach-检查登录状态');
  if(to.path != '/login' && !v.cookie.get('isLogin')) {//to.path == '/friends' &&
    console.log('全局导航守卫beforeEach--to.path='+to.path+'登录状态0');
    next('/login');
  }else {
    console.log('全局导航守卫beforeEach--to.path='+to.path+'登录状态1');
    v.$store.commit('showBar');
    next();
  }
});
router.afterEach((to, from) => {
  console.log('全局导航守卫afterEach');
  v.$store.state.footer.tabar.forEach(tab => {
    //console.log(tab.url+'=?'+to.path);
    if(to.path.indexOf(tab.url) > -1) {
      tab.selected = true;
      v.$store.state.header.title = tab.name;
    }else {
      tab.selected = false;
    }

  })

});

