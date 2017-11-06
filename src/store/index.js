import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutationTypes'
import * as actions from './actions'
import list from './modules/list'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    MAP_KEY: 'bd94f49741fa7aa8090ebace2e7cc3fe',
    uID: ''
  },
  mutations: {
    [types.LOGIN]: (state, newID) => {
      state.uID = newID
    },
    [types.LOGOUT]: state => {
      state.uID = ''
      state.list.alreadyInit = false
    }
  },
  modules: {
    list
  },
  actions
})
