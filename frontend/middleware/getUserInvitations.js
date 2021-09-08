import { configHeaders } from '@/utils/utilsAxios'

export default function ({ 
    store,
    env,
    context,
    route,
    redirect,
    $axios,
  }) {
  // console.log("MW-getUserInvitations > app : ", app)
  const promisesArray = []
  const log = store.state.log
  
  // console.log("MW-getUserInvitations > route : ", route)

  const api = store.state.api

  let tokenAccess = store.getters['user/isAuthenticated']
  // log && console.log("MW-getUserInvitations > tokenAccess : ", tokenAccess)

  if (tokenAccess) {
    // log && console.log("MW-getUserInvitations > HAS tokenAccess ... ")
    
    let config = new configHeaders(tokenAccess)
    // store.dispatch('tables/resetCurrentTables', {temp: false})

    let initInvitations = $axios
      .get(`${api.users}/me/invitations`, config.headers)
      .then(resp => {
        log && console.log('MW-getUserInvitations > B1 > resp.data : ', resp.data)
        let invitations = resp.data

        let invitSent = invitations.invitations_sent
        let invitReceived = invitations.invitations_received
        console.log("MW-getUserInvitations > invitSent : ", invitSent)
        console.log("MW-getUserInvitations > invitReceived : ", invitReceived)

        store.dispatch('invitations/populateUserItems', invitSent)
        store.dispatch('invitations/populateSharedItems', invitReceived)
        return

      })
      .catch(error => {
        log && console.log('MW-getUserInvitations > B1 > error > error : ', error)
      })

    promisesArray.push(initInvitations)

    // WAIT FOR ALL PROMISES TO RETURN
    // log && console.log('\n')
    return Promise.all(promisesArray)
  }

  else {
    // log && console.log("MW-getUserInvitations > NO accessTokenCookie but need login ... ")
    return
  }

  
  
}
