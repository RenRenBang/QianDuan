import * as types from '../mutationTypes'
// initial state
// shape: [{ id, quantity }]
const state = {
  alreadyInit: false,
  listMode: 'n',
  currentSort: '',
  needList: [],
  serviceList: []
}

// getters
const getters = {
  currentList: (state, getters) => {
    let list = state.listMode === 's' ? state.serviceList : state.needList
    return list
  }
}

// actions
const actions = {
  initList({ commit }) {
    commit(types.INIT_LIST)
  },
  changeListMode({ commit }, { newMode }) {
    commit(types.CHANGE_LISTMODE, newMode)
  },
  changeCurrentSort({ commit }, { currentSort }) {
    commit(types.CHANGE_CURRENT_SORT, currentSort)
  },
  updateList({ commit }, { newList, listType }) {
    if (listType === 's') {
      commit(types.UPDATE_SERVICE_LIST, newList)
    } else if (listType === 'n') {
      commit(types.UPDATE_NEED_LIST, newList)
    } else {
      console.log('BAD_IN_UPDATE_LIST')
    }
  }
}

// mutations
const mutations = {
  [types.INIT_LIST]: state => {
    state.alreadyInit = true
  },
  [types.CHANGE_LISTMODE]: (state, newMode) => {
    state.listMode = newMode
  },
  [types.CHANGE_CURRENT_SORT]: (state, currentSort) => {
    state.currentSort = currentSort
  },
  [types.UPDATE_NEED_LIST]: (state, list) => {
    state.needList = list
  },
  [types.UPDATE_SERVICE_LIST]: (state, list) => {
    state.serviceList = list
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
