import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    uID: ''
  },
  mutations: {
    login: (state, newID) => {
      state.uID = newID
    },
    logout: (state) => {
      state.uID = ''
    }
  }
})
