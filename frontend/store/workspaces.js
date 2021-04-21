import { Workspace } from '@/utils/utilsWorkspaces.js' 


export const state = () => ({
  uxWorkspaces: {},

  userWorkspaces: [],
  sharedWorkspaces: [],

})


export const getters = {
  getUserUx: (state) => {
    return state.uxWorkspaces
  },

  getUserItems: (state) => {
    return state.userWorkspaces
  },
  getUserItemById: (state) => (id) => {
    return state.userWorkspaces.find( ws => ws.id === id)
  },
  getSharedItems: (state) => {
    return state.sharedWorkspaces
  },
  getSharedItemById: (state) => (id) => {
    return state.sharedWorkspaces.find( ws => ws.id === id)
  },
}

export const mutations = {
  setItems (state, {space, items}) {
    // console.log('S-workspaces > setUserItems > items : ', items)
    // console.log('S-workspaces > setUserItems > items : ', items)
    state[space] = items
  },
  addItem (state, {space, item}) {
    // console.log('S-workspaces > addUserItem > item : ', item)
    state[space].push(item)
  },
  updateItem (state, {space, item}) {
    // console.log('S-workspaces > updateItem > item : ', item)
    state[space] = [ ...state[space].map(obj => obj.id !== item.id ? obj : {...obj, ...item})]
  },
  removeItem (state, {space, item}) {
    // console.log('S-workspaces > removeItem > space : ', space)
    // console.log('S-workspaces > removeItem > item : ', item)
    let removeIndex = state[space].findIndex(ws => ws.id == item.id)
    // console.log('S-workspaces > removeItem > removeIndex : ', removeIndex)
    state[space].splice(removeIndex, 1)
    // console.log('S-workspaces > removeItem > state[space] : ', state[space])
  },
}

export const actions = {

  populateUserUX ({ commit }, ux_prefs) {
    commit('setItems', {space: 'uxWorkspaces', items: ux_prefs})
  },

  populateUserItems ({ commit }, workspaces) {
    commit('setItems', {space: 'userWorkspaces', items: workspaces})
  },
  appendUserItem ({ commit }, workspace) {
    commit('addItem', {space: 'userWorkspaces', item: workspace})
  },
  updateUserItem ({ commit }, workspace) {
    commit('updateItem', {space: 'userWorkspaces', item: workspace})
  },
  removeUserItem ({ commit }, workspace) {
    commit('removeItem', {space: 'userWorkspaces', item: workspace})
  },

  populateSharedItems ({ commit }, workspaces) {
    commit('setItems', {space: 'sharedWorkspaces', items: workspaces})
  },
  appendSharedItem ({ commit }, workspace) {
    commit('addItem', {space: 'sharedWorkspaces', item: workspace})
  },
  updateSharedItem ({ commit }, workspace) {
    commit('updateItem', {space: 'sharedWorkspaces', item: workspace})
  },
  removeSharedItem ({ commit }, workspace) {
    commit('removeItem', {space: 'sharedWorkspaces', item: workspace})
  },
}
