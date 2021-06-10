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
  const datasetId = route.params.dataset_id
  // console.log("MW-getDatasetById > datasetId : ", datasetId)

  const tableId = route.params.table_id
  // console.log("MW-getDatasetById > tableId : ", tableId)

  const api = store.state.api

  let tokenAccess = store.getters['user/isAuthenticated']
  // log && console.log("MW-getDatasetById > tokenAccess : ", tokenAccess)

  if (tokenAccess) {
    // log && console.log("MW-getDatasetById > HAS tokenAccess ... ")
    
    let config = new configHeaders(tokenAccess)
    store.dispatch('tables/resetCurrentTables', {temp: false})

    let initDataset = $axios
      .get(`${api.datasets}/${datasetId}/`, config.headers)
      .then(resp => {
        // log && console.log('MW-getDatasetById > B1 > resp.data : ', resp.data)
        store.dispatch('datasets/setCurrentItem', resp.data)
        let dataset = resp.data

        // get data from first table in dataset's tables array
        const tablemetaId = parseInt(tableId) || resp.data.tables[0].id
        // console.log("MW-getDatasetById > tablemetaId : ", tablemetaId)

        let initTableData = $axios
          .get(`${api.tables}/${tablemetaId}/data`, config.headers)
          .then( respTable => {
            // log && console.log('MW-getDatasetById > B2 > respTable.data : ', respTable.data)
            // log && console.log('MW-getDatasetById > B2 > dataset 1 : ', dataset)
            let table = dataset.tables.find(t => t.id === tablemetaId )
            // log && console.log('MW-getDatasetById > B2 > table : ', table)
            table.table_data = respTable.data
            // log && console.log('MW-getDatasetById > B2 > dataset.tables : ', dataset.tables )
            store.dispatch('tables/setCurrentTables', { tables: dataset.tables, tableId: tablemetaId } )
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
