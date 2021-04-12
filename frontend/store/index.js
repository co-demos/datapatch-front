
export const state = () => ({

  // GLOABAL APP ENV
  appVersion: process.env.CONFIG_APP.appVersion,
  appTitle: process.env.CONFIG_APP.appTitle,
  appRunMode: process.env.MODE_APP,
  log: process.env.LOG,

  // LOCALES FOR i18n
  locale: undefined,
  locales: undefined,

  api: process.env.CONFIG_APP_BACKEND,
  
  crumbsPath: []
})

export const getters = {
  getCrumbs: (state) => {
    return state.crumbsPath
  }
}

export const mutations = {
  setPathList (state, pathList) {
    state.crumbsPath = [
      { 
        text: 'pages.home',
        to: '/',
      },
      ...pathList
    ]
  },
  resetPathList (state, pathList) {
    state.crumbsPath = [
      { 
        text: 'pages.home',
        to: '/',
      }
    ]
  }
}

export const actions = {
  updateCrumbsPath ({commit}, pathList) {
    commit ('setPathList', pathList)
  },
  resetPathList({commit}) {
    commit ('resetPathList')
  }
}
