// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import {
  sync
} from 'vuex-router-sync';

import axios from 'axios';
import VueAxios from 'vue-axios';


sync(store, router);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

/* eslint-disable no-new */
store.dispatch('authentication/isSignedIn').then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
      App
    },
  }).$mount('#app');
});
