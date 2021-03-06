// import { Invitation } from '@/utils/utilsInvitations.js' 

// let emptyInvitation = new Invitation()

export const state = () => ({
  // uxInvitations: {},

  isLoading: false,
  loadingItem: undefined,

  userInvitations: [],
  sharedInvitations: [],

  // itemModel: {
  //   infos: emptyInvitation.infos,
  // },
  // itemModelMeta: {
  //   infos: emptyInvitation.infos,
  //   meta: emptyInvitation.meta
  // },

})


export const getters = {

  // getUserUx: (state) => {
  //   return state.uxInvitations
  // },

  getUserItems: (state) => {
    return state.userInvitations
  },
  getUserItemById: (state) => (id) => {
    return state.userInvitations.find( invitation => invitation.id === id)
  },
  getSharedItems: (state) => {
    return state.sharedInvitations
  },
  getSharedItemById: (state) => (id) => {
    return state.sharedInvitations.find( invitation => invitation.id === id)
  },
  getSharedItemsPending: (state) => {
    console.log('S-invitations > populateSharedItems > state.sharedInvitations : ', state.sharedInvitations)
    if ( state.sharedInvitations.length > 0 ) {
      return state.sharedInvitations.filter( item => item.invitation_status === 'pending' )
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
    console.log('S-invitations > setItems > items : ', items)
    state[space] = items
  },
  addItem (state, {space, item}) {
    // console.log('S-invitations > addUserItem > item : ', item)
    state[space].push(item)
  },
  updateItem (state, {space, item}) {
    // console.log('S-invitations > updateItem > item : ', item)
    state[space] = [ ...state[space].map(obj => obj.id !== item.id ? obj : {...obj, ...item})]
  },
  removeItem (state, {space, item}) {
    console.log('S-invitations > removeItem > space : ', space)
    console.log('S-invitations > removeItem > item : ', item)
    let removeIndex = state[space].findIndex(invitation => invitation.id == item.id)
    console.log('S-invitations > removeItem > removeIndex : ', removeIndex)
    state[space].splice(removeIndex, 1)
    // console.log('S-invitations > removeItem > state[space] : ', state[space])
  },
}

export const actions = {

  togggleIsLoading({commit}, bool) {
    commit('setIsLoading', bool)
  },

  populateUserItems ({ commit }, invitations) {
    commit('setItems', {space: 'userInvitations', items: invitations})
  },
  appendUserItem ({ commit }, invitation) {
    commit('addItem', {space: 'userInvitations', item: invitation})
  },
  updateUserItem ({ commit }, {data}) {
    commit('updateItem', {space: 'userInvitations', item: data})
  },
  removeUserItem ({ commit }, {data}) {
    commit('removeItem', {space: 'userInvitations', item: data})
  },

  populateSharedItems ({ commit }, invitations) {
    console.log('S-invitations > populateSharedItems > invitations : ', invitations)
    commit('setItems', {space: 'sharedInvitations', items: invitations})
  },
  appendSharedItem ({ commit }, invitation) {
    commit('addItem', {space: 'sharedInvitations', item: invitation})
  },
  updateSharedItem ({ commit }, {data}) {
    console.log('S-invitations > populateSharedItems > data : ', data)
    commit('updateItem', {space: 'sharedInvitations', item: data})
  },
  removeSharedItem ({ commit }, {data}) {
    commit('removeItem', {space: 'sharedInvitations', item: data})
  },
}
