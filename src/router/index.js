import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';
import store from '../store';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }

  }],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    store.dispatch('authentication/isSignedIn').then((isSignedIn) => {
      if (!isSignedIn) {
        next('/');
      } else {
        next();
      }
    });
  } else {
    next();
  }
});


export default router;
