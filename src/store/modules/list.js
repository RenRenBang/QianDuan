import * as types from '../mutationTypes'

// initial state
// shape: [{ id, quantity }]
const state = {
  listMode: ''
}

// getters
const getters = {}

// actions
const actions = {
  changeListMode({ commit }, { newMode }) {
    commit(types.CHANGE_LISTMODE, newMode)
  }
}

// mutations
const mutations = {
  [types.CHANGE_LISTMODE]: (state, newMode) => {
    state.listMode = newMode
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
