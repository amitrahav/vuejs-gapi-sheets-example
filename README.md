# Vue.js - Google Sign-In example

This is an example project built with Vue.js (2.0) that utilizes google api to authenticate user.

- [Vuex](https://vuex.vuejs.org/) for state management
- [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) for persistence

### Back-end Server

This example verifies the `id_token` with a backend server and receives the user object. Though this verification is not required, it is a good practice if a backend server / database will be used to identify a user with the ID that google provides:

> Warning: Do not accept plain user IDs, such as those you can get with the GoogleUser.getId() method, on your backend server. A modified client application can send arbitrary user IDs to your server to impersonate users, so you must instead use verifiable ID tokens to securely get the user IDs of signed-in users on the server side.

More on this could be found [here](https://developers.google.com/identity/sign-in/web/backend-auth).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
