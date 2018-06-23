/* global gapi */
/* eslint-disable no-param-reassign */

export default {
  namespaced: true,
  state: {
    signedIn: false,
    profile: null,
    loading: false,
    clientId: process.env.GAPI_CLIENT_ID || '',
    apiKey: process.env.GAPI_API_KEY || '',
    spreadsheetId: process.env.SPREADSHEET_ID || '',
    scope: 'profile https://www.googleapis.com/auth/spreadsheets',
    GoogleAuth: false
  },
  getters: {
    loggedIn: state => state.signedIn,
    isLoading: state => state.loading,
    profileGet: state => state.profile
  },
  mutations: {
    signIn(state, profile) {
      state.signedIn = true;
      if (profile) {
        state.profile = profile;
      }
    },
    loading(state, loadingState) {
      state.logging = loadingState;
    },
    signOut(state) {
      state.signedIn = false;
      state.loading = false;
      state.profile = null;
    },
    getAuthInstance(state, authInstance) {
      if (!state.GoogleAuth) {
        state.GoogleAuth = authInstance;
      }
    }
  },
  actions: {
    initGapi({
      state
    }) {
      return new Promise((resolve) => {
        gapi.load('client:auth2', {
          callback: () => {
            gapi.auth2.init({
              client_id: state.clientId,
              api_key: state.apiKey,
              scope: state.scope,
              immediate: true
            }).then(() => {
              gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(() => {
                resolve();
              });
            });
          }
        });
      });
    },
    assignUser({
      commit,
      state
    }, userData) {
      const GoogleAuth = state.GoogleAuth;
      let user = GoogleAuth.currentUser.get();
      if (userData) {
        user = userData;
      }
      if (user.getBasicProfile()) {
        return commit('signIn', user.getBasicProfile());
      }
    },
    isSignedIn({
      dispatch,
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        dispatch('initGapi').then(() => {
          commit('getAuthInstance', gapi.auth2.getAuthInstance());
          const GoogleAuth = state.GoogleAuth;
          try {
            if (GoogleAuth.isSignedIn.get() && state.profile) {
              dispatch('assignUser').then(() => {
                commit('signIn');
              });
            }
            resolve(GoogleAuth.isSignedIn.get() && state.profile);
          } catch (e) {
            console.log(e);
            reject(e);
          }
        });
      });
    },
    signIn({
      dispatch,
      commit,
      state
    }) {
      console.log('signing in...');
      return new Promise((resolve, reject) => {
        dispatch('initGapi').then(async () => {
          await state.GoogleAuth.signIn({
            scope: 'profile email'
          }).then(async (userData) => {
            await dispatch('authorization/isAuthirized', {}, {
              root: true
            }).then((response) => {
              if (response) {
                dispatch('assignUser', userData).then(() => {
                  resolve(true);
                });
              } else {
                reject();
              }
            });
            resolve();
          }).catch((err) => {
            console.log(err);
            dispatch('signOut').then(() => {
              reject();
            });
          });
        });
      });
    },
    signOut({
      commit,
    }) {
      console.log('signing out...');
      return new Promise((resolve) => {
        if (gapi && gapi.auth2 && gapi.auth2.getAuthInstance()) {
          gapi.auth2.getAuthInstance().signOut().then(() => {
            commit('signOut');
            resolve();
          }, () => {
            commit('signOut');
            resolve();
          });
        } else {
          commit('signOut');
          resolve();
        }
      });
    },
  },
};
