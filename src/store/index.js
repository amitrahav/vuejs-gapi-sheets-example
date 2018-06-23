import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import authentication from './authentication';
import authorization from './authorization';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    authorization
  },
  plugins: [createPersistedState({
    paths: ['authentication.profile']
  })]
});
