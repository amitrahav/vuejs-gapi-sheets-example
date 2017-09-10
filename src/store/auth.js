import api from '../api'

const state = {
  signedIn: false,
  profile: null
}

const actions = {
  initGapi({ commit }) {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', {
        callback: () => {
          gapi.auth2.init().then(() => {
            resolve();
          });
        }
      });
    })
  },
  isSignedIn({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      dispatch('initGapi').then(() => {
        var currentUser = null;
        try { currentUser = gapi.auth2.getAuthInstance().currentUser.get(); }
        catch (e) { reject(); }

        // not signed in - delete persisted user
        if (!currentUser) {
          commit('signOut');
          resolve(false);
        }
        // persisted user id same with signed in google user's id
        if (state.profile && state.profile.google_id === currentUser.getId()) {
          commit('signIn');
          resolve(true);
        }
        // persisted user id different with signed in google user's id
        else {
          dispatch('signOut').then(() => {
            resolve(false);
          })
        }
      })
    })
  },
  signIn({ dispatch, commit }) {
    console.log('signing in...');
    return new Promise((resolve, reject) => {
      dispatch('initGapi').then(() => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          // verify token with a backend server (identify user)
          dispatch('verifyToken').then((profile) => {
            commit('signIn', profile);
            resolve();
          }).catch((err) => {
            dispatch('signOut').then(() => {
              reject();
            });
          });
        });
      });
    })
  },
  signOut({ commit }) {
    console.log('signing out...');
    return new Promise((resolve, reject) => {
      if (gapi && gapi.auth2 && gapi.auth2.getAuthInstance()) {
        gapi.auth2.getAuthInstance().signOut().then(() => {
          commit('signOut');
          resolve();
        }, () => {
          commit('signOut');
          resolve();
        });
      }
      else {
        commit('signOut');
        resolve();
      }
    })
  },
  // This action verifies the id_token parameter with a backend
  // server and receives the user profile as response
  verifyToken({ commit }) {
    console.log('verifying token...');
    return new Promise((resolve, reject) => {
      var token = null;
      try { token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token }
      catch (e) { reject(); }
      if (!token) { reject(); }
      else {
        api.verify(token).then(res => {
          console.log('token verified', res);
          if (res && res.data && res.data.token_valid) { resolve(res.data.profile); }
          else { reject(); }
        }).catch(err => {
          console.log(err);
          reject(err);
        })
      }
    });
  }
}

const mutations = {
  signIn(state, profile) {
    state.signedIn = true;
    if (profile) { state.profile = profile; }
  },
  signOut(state) {
    state.signedIn = false;
    state.profile = null;
  }
}

const getters = {
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
