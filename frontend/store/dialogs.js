class AxiosResponse {
  constructor () {
    this.status = undefined;
    this.statusText = undefined;
    this.msg = undefined;
    this.type = '';
  }
  get data () {
    return {
      status: this.status,
      statusText: this.statusText,
      msg: this.msg,
      type: this.type
    }
  }
}

export const state = () => ({

  isLoading: false,

  axiosResponse: {
    status: undefined,
    statusText: undefined,
    msg: undefined,
    type: '',
  }

})

export const getters = {
  isAxiosResponse: (state) => {
    return state.axiosResponse.type !== ''
  },
  getAxiosResponse: (state) => {
    return state.axiosResponse
  },
}

export const mutations = {
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setAxiosResponse (state, {resp, type}) {
    // console.log('S-dialogs > setAxiosResponse > resp : ', resp)
    // console.log('S-dialogs > setAxiosResponse > type : ', type)
    state.axiosResponse.status = parseInt(resp && resp.status) || 418
    state.axiosResponse.statusText = resp && resp.statusText || 'something went wrong...'
    state.axiosResponse.msg = resp && resp.data && resp.data.detail || 'oups'
    state.axiosResponse.type = type || 'error'
  },
  resetAxiosResponse (state) {
    let empty = new AxiosResponse
    state.axiosResponse = empty.data
  }
}

export const actions = {
  commitIsLoading ({commit}, isLoading) {
    commit('setIsLoading', isLoading)
  },
  commitAxiosReponse ({ commit }, {resp, type}) {
    commit('setAxiosResponse', {resp, type})
  },
  resetAxiosReponse ({ commit }) {
    commit('resetAxiosResponse')
  },
}
