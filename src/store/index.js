import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [createPersistedState({
    paths: ['auth.profile']
  })]
})
