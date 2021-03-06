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
  const user = store.state.user.userData

  let tokenAccess = store.getters['user/isAuthenticated']
  // log && console.log("MW-getUserInvitations > tokenAccess : ", tokenAccess)

  if (tokenAccess) {
    // log && console.log("MW-getUserInvitations > HAS tokenAccess ... ")
    
    let config = new configHeaders(tokenAccess)

    let initInvitations = $axios
      .get(`${api.users}/me/invitations`, config.headers)
      .then(resp => {
        log && console.log('MW-getUserInvitations > B1 > resp.data : ', resp.data)
        let invitations = resp.data

        // let invitSent = invitations.invitations_sent
        // let invitReceived = invitations.invitations_received
        let invitSent = invitations.filter( invit => invit.owner_id === user.id )
        let invitReceived = invitations.filter( invit => invit.invitee === user.email )

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
