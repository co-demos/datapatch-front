
export const state = () => ({
  // uxMessages: {},

  isLoading: false,
  loadingItem: undefined,

  userMessages: [],
  sharedMessages: [],

  // itemModel: {
  //   infos: emptyMessage.infos,
  // },
  // itemModelMeta: {
  //   infos: emptyMessage.infos,
  //   meta: emptyMessage.meta
  // },

})


export const getters = {

  // getUserUx: (state) => {
  //   return state.uxMessages
  // },

  getUserItems: (state) => {
    return state.userMessages
  },
  getUserItemById: (state) => (id) => {
    return state.userMessages.find( message => message.id === id)
  },
  getSharedItems: (state) => {
    return state.sharedMessages
  },
  getSharedItemById: (state) => (id) => {
    return state.sharedMessages.find( message => message.id === id)
  },
  getSharedItemsPending: (state) => {
    console.log('S-messages > populateSharedItems > state.sharedMessages : ', state.sharedMessages)
    if ( state.sharedMessages.length > 0 ) {
      return state.sharedMessages.filter( item => item.message_status === 'pending' )
    } else {
      return []
    } 
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
    console.log('S-messages > setItems > items : ', items)
    state[space] = items
  },
  addItem (state, {space, item}) {
    // console.log('S-messages > addUserItem > item : ', item)
    state[space].push(item)
  },
  updateItem (state, {space, item}) {
    // console.log('S-messages > updateItem > item : ', item)
    state[space] = [ ...state[space].map(obj => obj.id !== item.id ? obj : {...obj, ...item})]
  },
  removeItem (state, {space, item}) {
    console.log('S-messages > removeItem > space : ', space)
    console.log('S-messages > removeItem > item : ', item)
    let removeIndex = state[space].findIndex(message => message.id == item.id)
    console.log('S-messages > removeItem > removeIndex : ', removeIndex)
    state[space].splice(removeIndex, 1)
    // console.log('S-messages > removeItem > state[space] : ', state[space])
  },
}

export const actions = {

  togggleIsLoading({commit}, bool) {
    commit('setIsLoading', bool)
  },

  populateUserItems ({ commit }, messages) {
    commit('setItems', {space: 'userMessages', items: messages})
  },
  appendUserItem ({ commit }, message) {
    commit('addItem', {space: 'userMessages', item: message})
  },
  updateUserItem ({ commit }, {data}) {
    commit('updateItem', {space: 'userMessages', item: data})
  },
  removeUserItem ({ commit }, {data}) {
    commit('removeItem', {space: 'userMessages', item: data})
  },

  populateSharedItems ({ commit }, messages) {
    console.log('S-messages > populateSharedItems > messages : ', messages)
    commit('setItems', {space: 'sharedMessages', items: messages})
  },
  appendSharedItem ({ commit }, message) {
    commit('addItem', {space: 'sharedMessages', item: message})
  },
  updateSharedItem ({ commit }, {data}) {
    console.log('S-messages > populateSharedItems > data : ', data)
    commit('updateItem', {space: 'sharedMessages', item: data})
  },
  removeSharedItem ({ commit }, {data}) {
    commit('removeItem', {space: 'sharedMessages', item: data})
  },
}
