export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    // console.log('PG-axios > Making request > config :', config)
    console.log(`PG-axios > Making ${config.method} request to ${config.url}`)
    store.dispatch('dialogs/commitIsLoading', true)
    store.dispatch('dialogs/resetAxiosReponse')
  })

  $axios.onResponse(resp => {
    // console.log(`PG-axios > resp : `, resp)
    store.dispatch('dialogs/commitIsLoading', false)
  })

  $axios.onError(error => {
    // console.log('PG-axios > onError > error.response :', error.response)
    store.dispatch('dialogs/commitIsLoading', false)
    store.dispatch('dialogs/commitAxiosReponse', {resp: error.response, type: 'error'})
  })
}
