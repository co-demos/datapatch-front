import { Field } from '@/utils/utilsFields'

let emptyField = new Field()

export const state = () => ({

  isLoading: false,
  loadingItem: undefined,

  itemModel: {
    infos: emptyField.infos,
    auth: emptyField.auth,
    meta: emptyField.meta,
  },

})

export const getters = {}

export const mutations = {

  setIsLoading (state, bool) {
    state.isLoading = bool
  },
  setItemLoading (state, id) {
    state.loadingItem = id
  },

}

export const actions = {}
