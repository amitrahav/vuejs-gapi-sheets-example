<template>
  <div id="app" style="text-align: center;">

    <div v-if="loading">loading...</div>

    <div v-if="!loading && !signedIn">
      <a href="#" v-on:click="signIn">Sign In</a>
    </div>

    <div v-if="!loading && signedIn">
      <div>{{ profile.google_id }}</div>
      <div>{{ profile.name }}</div>
      <div><img v-bind:src="profile.picture"></div>
      <div>{{ profile.email }}</div>
      <div>
        <a href="#" v-on:click="signOut">Sign out</a>
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import store from './store';

export default {
  name: 'app',
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState({
      signedIn: state => state.auth.signedIn,
      profile: state => state.auth.profile
    })
  },
  mounted: function() {
    var self = this;
    store.dispatch('auth/isSignedIn').then(() => {
      self.loading = false;
    });
  },
  methods: {
    ...mapActions('auth', [
      'signIn',
      'signOut'
    ])
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.g-signin2 .abcRioButton {
  margin: auto;
}
</style>
