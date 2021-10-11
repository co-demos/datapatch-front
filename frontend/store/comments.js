export const state = () => ({

  isLoading: false,
  showCommentsBox: false,

  currentItem: undefined,
  comments: []

})

export const getters = {

  getShowCommentsBox: (state) => {
    return state.showCommentsBox
  },

  getCurrentItem: (state) => {
    return state.currentItem
  },

  getComments: (state) => {
    return state.comments
  },

}

export const mutations = {

  setIsLoading (state, bool) {
    state.isLoading = bool
  },
  setShowCommentsbox (state, bool) {
    console.log('S-comments > setShowCommentsbox > bool : ', bool)
    state.showCommentsBox = bool
  },
  
  setCurrentItem (state, {item}) {
    console.log('S-comments > setItem > item : ', item)
    state.currentItem = item
  },

  setComments (state, {items}) {
    console.log('S-comments > setComments > item : ', items)
    state.comments = items
  },
  addComment (state, {item}) {
    console.log('S-comments > addComment > item : ', item)
    state.comments.push(item)
  },
}

export const actions = {

  togggleIsLoading({commit}, bool) {
    commit('setIsLoading', bool)
  },
  togggleShowCommentsBox({commit}, bool) {
    commit('setShowCommentsbox', bool)
  },

  populateCurrentItem ({ commit }, item) {
    commit('setCurrentItem', {item: item})
  },

  populateComments ({ commit }, items) {
    commit('setComments', {items: items})
  },
  appendComment ({ commit }, item) {
    commit('addComment', {item: item})
  },

}
