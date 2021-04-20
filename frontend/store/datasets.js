import { dataset } from '@/utils/utilsDatasets.js' 


export const state = () => ({
  userDatasets: [],
  shareddatasets: []
})


export const getters = {
  getUserItems: (state) => {
    return state.userDatasets
  },
  getUserItemById: (state) => (id) => {
    return state.userDatasets.find( ds => ds.id === id)
  },
  getSharedItems: (state) => {
    return state.shareddatasets
  },
  getSharedItemById: (state) => (id) => {
    return state.shareddatasets.find( ds => ds.id === id)
  },
}

export const mutations = {
  setItems (state, {space, items}) {
    // console.log('S-datasets > setUserItems > items : ', items)
    // console.log('S-datasets > setUserItems > items : ', items)
    state[space] = items
  },
  addItem (state, {space, item}) {
    // console.log('S-datasets > addUserItem > item : ', item)
    state[space].push(item)
  },
  updateItem (state, {space, item}) {
    // console.log('S-datasets > updateItem > item : ', item)
    state[space] = [ ...state[space].map(obj => obj.id !== item.id ? obj : {...obj, ...item})]
  },
  removeItem (state, {space, item}) {
    // console.log('S-datasets > removeItem > space : ', space)
    // console.log('S-datasets > removeItem > item : ', item)
    let removeIndex = state[space].findIndex(ws => ws.id == item.id)
    // console.log('S-datasets > removeItem > removeIndex : ', removeIndex)
    state[space].splice(removeIndex, 1)
    // console.log('S-datasets > removeItem > state[space] : ', state[space])
  },
}

export const actions = {

  populateUserItems ({ commit }, datasets) {
    commit('setItems', {space: 'userDatasets', items: datasets})
  },
  appendUserItem ({ commit }, dataset) {
    commit('addItem', {space: 'userDatasets', item: dataset})
  },
  updateUserItem ({ commit }, dataset) {
    commit('updateItem', {space: 'userDatasets', item: dataset})
  },
  removeUserItem ({ commit }, dataset) {
    commit('removeItem', {space: 'userDatasets', item: dataset})
  },

  populateSharedItems ({ commit }, datasets) {
    commit('setItems', {space: 'shareddatasets', items: datasets})
  },
  appendSharedItem ({ commit }, dataset) {
    commit('addItem', {space: 'sharedDatasets', item: dataset})
  },
  updateSharedItem ({ commit }, dataset) {
    commit('updateItem', {space: 'sharedDatasets', item: dataset})
  },
  removeSharedItem ({ commit }, dataset) {
    commit('removeItem', {space: 'sharedDatasets', item: dataset})
  },
}
