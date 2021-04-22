import { configHeaders } from '@//utils/utilsAxios.js' 

class User {
  constructor () {
    this.id = undefined
    this.username = undefined
    this.name = undefined
    this.surname = undefined
    this.email = undefined
    this.description = undefined
    this.locale = undefined
    this.avatar = undefined
    this.groups = []
  }
  get data () {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      surname: this.surname,
      email: this.email,
      description: this.description,
      locale: this.locale,
      avatar: this.avatar,
      groups: this.groups,
    }
  }
}
class Auth {
  constructor () {
    this.isSuperUser = false
    this.accessToken = undefined
    this.tokenType = undefined
  }
  get data () {
    return {
      isSuperUser: this.isSuperUser,
      accessToken: this.accessToken,
      tokenType: this.tokenType,
    }
  }
}

export const state = () => ({
  
  userData: {
    id: undefined,
    username: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    description: undefined,
    locale: undefined,
    avatar: undefined,
    groups: [],
  },
  auth: {
    accessToken: undefined,
    refreshToken: undefined,
    tokenType: undefined,
    isSuperUser: false,
  },
})

export const getters = {
  userId: (state) => {
    return state.userData.id
  },
  isUserPopulated: (state) => {
    return state.userData.email
  },
  isAuthenticated: (state) => {
    return state.auth.accessToken
  },
  headerUser: (state) => {
    let config = new configHeaders(state.auth.accessToken)
    return config.headers
  },
  userBasicInfos: (state) => {
    let basicInfos = {
      username: state.userData.username,
      name: state.userData.name,
      surname: state.userData.surname,
      description: state.userData.description,
      locale: state.userData.locale,
      avatar: state.userData.avatar,
    }
    return basicInfos
  }
}

export const mutations = {
  setAccessToken (state, token) {
    // console.log('S-user > setUserData > token : ', token)
    state.auth.accessToken = token.access_token
    state.auth.tokenType = token.token_type
    // console.log('S-user > setAccessToken > state.auth : ', state.auth)
  },
  setUserLocale (state, userData) {
    state.userData.locale = userData.locale
  },
  setUserData (state, userData) {
    // console.log('S-user > setUserData > userData : ', userData)
    state.userData.id = userData.id
    state.userData.email = userData.email
    state.userData.locale = userData.locale
    state.userData.groups = userData.groups
  },
  setUserBasicInfos (state, userData) {
    state.userData.username = userData.username
    state.userData.name = userData.name
    state.userData.surname = userData.surname
    state.userData.description = userData.description
    state.userData.locale = userData.locale
    state.userData.avatar = userData.avatar
  },
  
}

export const actions = {
  authenticateUser ({ commit }, token) {
    commit('setAccessToken', token)
  },
  populateUser ({ commit }, userData) {
    commit('setUserLocale', userData)
    commit('setUserBasicInfos', userData)
    commit('setUserData', userData)
  },
  populateUserLocale ({ commit }, userData) {
    commit('setUserLocale', userData)
  },
  populateUserBasicInfos ({ commit }, userData) {
    commit('setUserBasicInfos', userData)
  },
  resetUser ({ commit }) {
    let emptyUser = new User
    let emptyAuth = new Auth
    commit('setUserData', emptyUser.data)
    commit('setAccessToken', emptyAuth.data)
  }
}
