export const state = () => ({

  needReload: false,
  isLoading: false,
  showCommentsBox: false,

  currentItem: undefined,
  activeCommentId: undefined,
  comments: []

})

export const getters = {

  getNeedReload: (state) => {
    return state.needReload
  },

  getShowCommentsBox: (state) => {
    return state.showCommentsBox
  },

  getCurrentItem: (state) => {
    return state.currentItem
  },

  getComments: (state) => {
    return state.comments
  },

  getActiveCommentId: (state) => {
    return state.activeCommentId
  },

  getCommentsSortedByDate: (state) => {
    let comments = [ ...state.comments ]
    let commentsSorted = comments.sort((a, b) => {
      let dateA = new Date(a.created_date)
      let dateB = new Date(b.created_date)
      return dateB - dateA
      }
    )
    return commentsSorted
  },

  getCommentById: (state) => (id) => {
    return state.comments.find( comment => comment.id === id)
  },
}

export const mutations = {

  setNeedReload (state, bool) {
    state.needReload = bool
  },
  setIsLoading (state, bool) {
    state.isLoading = bool
  },
  setShowCommentsbox (state, bool) {
    // console.log('S-comments > setShowCommentsbox > bool : ', bool)
    state.showCommentsBox = bool
  },
  
  setCurrentItem (state, {item}) {
    // console.log('S-comments > setItem > item : ', item)
    state.currentItem = item
  },

  setActiveCurrentComment (state, id) {
    state.activeCommentId = id
  },

  setComments (state, {items}) {
    // console.log('S-comments > setComments > item : ', items)
    state.comments = items
  },
  addComment (state, {item}) {
    // console.log('S-comments > addComment > item : ', item)
    state.comments.push(item)
  },
}

export const actions = {

  togggleNeedReload({commit}, bool) {
    commit('setNeedReload', bool)
  },
  togggleIsLoading({commit}, bool) {
    commit('setIsLoading', bool)
  },
  togggleShowCommentsBox({commit}, bool) {
    commit('setShowCommentsbox', bool)
  },

  populateActiveCommentId({commit}, id) {
    commit('setActiveCurrentComment', id)
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
