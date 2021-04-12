export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    // console.log('PG-axios > Making request to ' + config.url)
    store.dispatch('dialogs/commitIsLoading', true)
    store.dispatch('dialogs/resetAxiosReponse')
  })

  $axios.onResponse(config => {
    store.dispatch('dialogs/commitIsLoading', false)
  })

  $axios.onError(error => {
    // console.log('PG-axios > onError > error.response :', error.response)
    store.dispatch('dialogs/commitIsLoading', false)
    store.dispatch('dialogs/commitAxiosReponse', {resp: error.response, type: 'error'})
  })
}
