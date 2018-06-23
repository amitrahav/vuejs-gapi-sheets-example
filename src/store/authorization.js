/* global gapi */
/* eslint-disable no-param-reassign */

export default {
  namespaced: true,
  state: {
    apiKey: process.env.GAPI_API_KEY || '',
    spreadsheetId: process.env.SPREADSHEET_ID || '',
    mainTableData: null,
    loading: false,
    mainRangeData: null
  },
  getters: {
    tableData: state => state.mainTableData,
    rangeData: state => state.mainRangeData,
  },
  mutations: {
    assignTableData(state, tableData) {
      state.mainTableData = tableData;
    },
    assignRangeData(state, rangeData) {
      state.mainRangeData = rangeData;
    },
    loading(state, loadingState) {
      state.logging = loadingState;
    },
  },
  actions: {
    async isAuthirized({
      dispatch
    }) {
      const auth = await dispatch('querySheet');
      return auth;
    },
    async querySheet({
      state,
      commit
    }) {
      await gapi.client.sheets.spreadsheets.get({
        spreadsheetId: state.spreadsheetId,
        ranges: [],
      }).then((response) => {
        if (response.status !== 200) {
          return false;
        }
        commit('assignTableData', response.result);
      });
    },
    async queryRange({
      commit,
      state
    }, range) {
      console.log(gapi.client.sheets);
      await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: state.spreadsheetId,
        range,
      }).then((response) => {
        console.log(response.result);
        if (response.status !== 200) {
          return (false);
        }
        commit('assignRangeData', response.result);
        return (true);
      });
    }
  }
};
