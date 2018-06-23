<template>
  <div id="app" style="text-align: center;">
    <div v-if="!loading && loggedIn && profileGet.getId()">
      <div>{{ profileGet.getId() }}</div>
      <div>{{ profileGet.getName() }} {{profileGet.getFamilyName()}}</div>
      <div>
        <img v-bind:src="profileGet.getImageUrl()">
      </div>
      <div>{{ profileGet.getEmail() }}</div>
      <a href="#" v-on:click="signOutAndRout">Sign out</a>
    </div>
    <transition :name="transitionName">
      <router-view :loading=loading></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      loading: true,
      transitionName: 'slide-right',
    };
  },
  computed: {
    ...mapGetters('authentication', [
      'loggedIn',
      'profileGet'
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'signOut',
      'isSignedIn'
    ]),
    signOutAndRout() {
      this.signOut().then(() => {
        this.$router.push('/');
      });
    }
  },
  mounted() {
    this.isSignedIn().then(() => {
      this.loading = false;
    });
  },
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
