import { configHeaders } from '@/utils/utilsAxios'

export default function ({ 
    store,
    env,
    context,
    route,
    redirect,
    $axios,
  }) {
  // console.log("MW-getDatasetById > app : ", app)
  const promisesArray = []
  const log = store.state.log
  
  // console.log("MW-getDatasetById > route : ", route)
  const datasetId = route.params.id
  // console.log("MW-getDatasetById > datasetId : ", datasetId)

  const api = store.state.api

  let tokenAccess = store.getters['user/isAuthenticated']
  // log && console.log("MW-getDatasetById > tokenAccess : ", tokenAccess)

  if (tokenAccess) {
    // log && console.log("MW-getDatasetById > HAS tokenAccess ... ")

    let config = new configHeaders(tokenAccess)

    let initDataset = $axios
      .get(`${api.datasets}/${datasetId}/`, config.headers)
      .then(resp => {
        // log && console.log('MW-getDatasetById > B > me > resp.data : ', resp.data)
        store.dispatch('datasets/setCurrentItem', resp.data)
      })
      .catch(error => {
        // 2. refresh access_token if refresh_token is still valid
        log && console.log('MW-getDatasetById > C > error > error : ', error)
      })

    promisesArray.push(initDataset)

    // WAIT FOR ALL PROMISES TO RETURN
    // log && console.log('\n')
    return Promise.all(promisesArray)
  }

  else {
    // log && console.log("MW-getDatasetById > NO accessTokenCookie but need login ... ")
    return
  }

  
  
}
