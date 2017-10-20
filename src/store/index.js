import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    uID: '',
    listMode: ''
  },
  mutations: {
    login: (state, newID) => {
      state.uID = newID
    },
    logout: (state) => {
      state.uID = ''
    },
    changeListMode: (state, newMode) => {
      state.listMode = newMode
    }
  }
})
