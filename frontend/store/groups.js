import { Group } from '@/utils/utilsGroups.js' 

let emptyGroup = new Group()

export const state = () => ({
  uxGroups: {},

  isLoading: false,
  loadingItem: undefined,

  userGroups: [],
  sharedGroups: [],

  itemModel: {
    infos: emptyGroup.infos,
    auth: emptyGroup.auth,
    prefs: emptyGroup.prefs,
  },
  itemModelNew: {
    infos: emptyGroup.infos_new,
    auth: emptyGroup.auth,
    prefs: emptyGroup.prefs,
  },
  itemModelMeta: {
    infos: emptyGroup.infos,
    auth: emptyGroup.auth,
    prefs: emptyGroup.prefs,
    meta: emptyGroup.meta
  },

})


export const getters = {

  getUserUx: (state) => {
    return state.uxGroups
  },

  getUserItems: (state) => {
    return state.userGroups
  },
  getUserItemById: (state) => (id) => {
    return state.userGroups.find( group => group.id === id)
  },
  getSharedItems: (state) => {
    return state.sharedGroups
  },
  getSharedItemById: (state) => (id) => {
    return state.sharedGroups.find( group => group.id === id)
  },
}

export const mutations = {

  setIsLoading (state, bool) {
    state.isLoading = bool
  },
  setItemLoading (state, id) {
    state.loadingItem = id
  },

  setItems (state, {space, items}) {
    state[space] = items
  },
  addItem (state, {space, item}) {
    // console.log('S-groups > addUserItem > item : ', item)
    state[space].push(item)
  },
  updateItem (state, {space, item}) {
    // console.log('S-groups > updateItem > item : ', item)
    state[space] = [ ...state[space].map(obj => obj.id !== item.id ? obj : {...obj, ...item})]
  },
  removeItem (state, {space, item}) {
    // console.log('S-groups > removeItem > space : ', space)
    // console.log('S-groups > removeItem > item : ', item)
    let removeIndex = state[space].findIndex(group => group.id == item.id)
    // console.log('S-groups > removeItem > removeIndex : ', removeIndex)
    state[space].splice(removeIndex, 1)
    // console.log('S-groups > removeItem > state[space] : ', state[space])
  },
}

export const actions = {

  togggleIsLoading({commit}, bool) {
    commit('setIsLoading', bool)
  },

  populateUserUX ({ commit }, ux_prefs) {
    commit('setItems', {space: 'uxGroups', items: ux_prefs})
  },

  populateUserItems ({ commit }, groups) {
    commit('setItems', {space: 'userGroups', items: groups})
  },
  appendUserItem ({ commit }, group) {
    commit('addItem', {space: 'userGroups', item: group})
  },
  updateUserItem ({ commit }, group) {
    commit('updateItem', {space: 'userGroups', item: group})
  },
  removeUserItem ({ commit }, group) {
    commit('removeItem', {space: 'userGroups', item: group})
  },

  populateSharedItems ({ commit }, groups) {
    commit('setItems', {space: 'sharedGroups', items: groups})
  },
  appendSharedItem ({ commit }, group) {
    commit('addItem', {space: 'sharedGroups', item: group})
  },
  updateSharedItem ({ commit }, group) {
    commit('updateItem', {space: 'sharedGroups', item: group})
  },
  removeSharedItem ({ commit }, group) {
    commit('removeItem', {space: 'sharedGroups', item: group})
  },
}
