import * as types from './mutationTypes'
export const login = ({ commit }, { newID }) => {
  commit(types.LOGIN, newID)
}
export const logout = ({ commit }) => {
  commit(types.LOGOUT)
}
