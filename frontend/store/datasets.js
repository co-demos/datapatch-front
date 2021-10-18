import { Dataset } from '@/utils/utilsDatasets.js' 

let emptyDataset = new Dataset()

export const state = () => ({
  currentDataset: undefined,

  isLoading: false,
  loadingItem: undefined,
  // loadingItems: [],

  userDatasets: [],
  sharedDatasets: [],

  itemModel: {
    infos: emptyDataset.infos,
    auth: emptyDataset.auth,
    prefs: emptyDataset.prefs,
  },

  itemModelMeta: {
    infos: emptyDataset.infos,
    auth: emptyDataset.auth,
    prefs: emptyDataset.prefs,
    meta: emptyDataset.meta,
  },
  itemModelShare: {
    share: emptyDataset.share,
  },
})


export const getters = {
  // getLoadingById: (state) => (id) => {
  //   console.log('\nS-datasets > getLoadingById > id : ', id)
  //   let itemLoading = state.loadingItems.find(item => item.id === id )
  //   console.log('S-datasets > getLoadingById > itemLoading : ', itemLoading)
  //   return itemLoading && itemLoading.isLoading
  // },

  getCurrentItem: (state) => {
    // console.log('S-datasets > getCurrentItem > state.currentDataset : ', state.currentDataset)
    return state.currentDataset
  },
  getUserItems: (state) => {
    return state.userDatasets
  },
  getUserItemById: (state) => (id) => {
    return state.userDatasets.find( ds => ds.id === id)
  },
  getSharedItems: (state) => {
    return state.sharedDatasets
  },
  getSharedItemById: (state) => (id) => {
    return state.sharedDatasets.find( ds => ds.id === id)
  },
}

export const mutations = {

  setIsLoading (state, bool) {
    state.isLoading = bool
  },
  setItemLoading (state, id) {
    state.loadingItem = id
  },
  // setItemsLoading (state, itemLoading ) {
  //   // console.log('S-datasets > setItemsLoading > state.loadingItems A : ', state.loadingItems)
  //   // console.log('S-datasets > setItemsLoading > itemLoading : ', itemLoading)
  //   let itemLoadingIdx = state.loadingItems.findIndex( it => it.id === itemLoading.id )
  //   itemLoadingIdx === -1 ? state.loadingItems.push(itemLoading) : state.loadingItems[itemLoadingIdx] = itemLoading
  //   // console.log('S-datasets > setItemsLoading > state.loadingItems B : ', state.loadingItems)
  // },

  setItems (state, {space, items}) {
    // console.log('S-datasets > setItems > items : ', items)
    state[space] = items
  },
  addItem (state, {space, item}) {
    // console.log('S-datasets > addItem > item : ', item)
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

  togggleIsLoading({commit}, bool) {
    commit('setIsLoading', bool)
  },

  setCurrentItem ({ commit }, dataset) {
    commit('setItems', {space: 'currentDataset', items: dataset})
  },

  populateUserItems ({ commit }, datasets) {
    commit('setItems', {space: 'userDatasets', items: datasets})
  },
  appendUserItem ({ commit }, dataset) {
    commit('addItem', {space: 'userDatasets', item: dataset})
  },
  updateUserItem ({ commit }, { data }) {
    commit('updateItem', {space: 'userDatasets', item: data})
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
