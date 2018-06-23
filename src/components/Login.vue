<template>
  <div class="login">
    <div v-if="loading">loading...</div>

    <div v-if="!loading && !loggedIn">
      <a href="#" v-on:click="login">Sign In</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'login',
  data() {
    return {};
  },
  props: ['loading'],
  computed: {
    ...mapGetters('authentication', [
      'loggedIn'
    ]),
  },

  methods: {
    ...mapActions('authentication', [
      'signIn',
      'signOut',
      'isSignedIn'
    ]),
    login() {
      this.signIn().then((res) => {
        this.$router.push('Home');
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
