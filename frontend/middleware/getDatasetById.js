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
        log && console.log('MW-getDatasetById > B1 > resp.data : ', resp.data)
        store.dispatch('datasets/setCurrentItem', resp.data)

        // get data from first table in dataset's tables array
        const tablemetaId = resp.data.tables[0].id
        let initTableData = $axios
          .get(`${api.tables}/${tablemetaId}/data`, config.headers)
          .then( respTable => {
            log && console.log('MW-getDatasetById > B2 > respTable.data : ', respTable.data)
            let dataset = resp.data
            dataset.tables[0].table_data = respTable.data
            log && console.log('MW-getDatasetById > B2 > dataset : ', dataset)
            store.dispatch('tables/setCurrentTables', dataset.tables )
          })
          .catch(error => {
            log && console.log('MW-getDatasetById > B2 > error > error : ', error)
          })
        promisesArray.push(initTableData)

      })
      .catch(error => {
        log && console.log('MW-getDatasetById > B1 > error > error : ', error)
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
