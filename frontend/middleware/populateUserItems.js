import { configHeaders } from '@/utils/utilsAxios'

export default function ({ 
    store, 
    env, 
    context, 
    route,
    redirect,
    $axios,
    $cookies,
    i18n 
  }) {
  // console.log("MW-populateUserItems > app : ", app)
  const promisesArray = []
  const log = store.state.log
  const exceptionPaths = [
    // '/',
    '/login',
    '/sign',
    '/logout',
    '/recover-password',
    '/verify-email',
    '/reset-password'
  ]
  
  const currentPath = route.path

  let pathNeedsAuth = !exceptionPaths.includes(currentPath) /// && !accessToken
  // log && console.log("\nMW-populateUserItems > pathNeedsAuth : ", pathNeedsAuth)
  
  if ( !pathNeedsAuth ) {
    // 1. no need for further validation
    return
  }
  
  else {
    const api = store.state.api
    const promisesArray = []

    let accessTokenCookie = $cookies.get('access_token')
    let accessTokenStore = store.getters['user/isAuthenticated']
    let tokenAccess = accessTokenStore || accessTokenCookie
    // log && console.log("MW-populateUserItems > tokenAccess : ", tokenAccess)
    
    if (tokenAccess) {
      // log && console.log("MW-populateUserItems > HAS accessTokenCookie ... ")

      let config = new configHeaders(accessTokenCookie)
      let isUserPopulated = store.getters['user/isUserPopulated']
      // log && console.log('MW-populateUserItems > B > me > isUserPopulated: ', isUserPopulated)
      
      // store.dispatch('workspaces/togggleIsLoading', true)

      // 1. check if access_token is still valid + get user data if isUserPopulated is empty
      const initUserRequest = $axios
        // .get(`${api.users}/${isUserPopulated ? 'verify-acces-token' : 'me'}/`, config.headers)
        .get(`${api.users}/me/`, config.headers)
        .then(resp => {
          // log && console.log('MW-populateUserItems > B > me > resp.data : ', resp.data)
          // 1bis. set user data if necessary
          store.dispatch('user/authenticateUser', { access_token: accessTokenCookie, token_type: 'Bearer' })
          
          const userData = resp.data
          store.dispatch('user/populateUser', userData)

          store.dispatch('groups/populateUserItems', userData.my_groups)
          store.dispatch('workspaces/populateUserItems', userData.my_workspaces)
          // store.dispatch('datasets/populateUserItems', userData.my_datasets)

          store.dispatch('workspaces/populateUserUX', userData.ux_workspaces)
          i18n.setLocale(userData.locale)
          return

        })
        .catch(error => {
          // 2. refresh access_token if refresh_token is still valid
          log && console.log('MW-populateUserItems > me > error : ', error)
          // let refreshTokenCookie = $cookies.get('refresh_token')
          // // log && console.log("MW-populateUserItems > C > refreshTokenCookie : ", refreshTokenCookie)
          // let configRefresh = new configHeaders(refreshTokenCookie)
          // // log && console.log("MW-populateUserItems > C > configRefresh.headers : ", configRefresh.headers)
          // const newAccessTokenRequest = $axios
          //   .get(`${api.users}/new-access-token/`, configRefresh.headers)
          //   .then(resp => {
          //    // 3. set cookie with new access_token so next middleware will use this one
          //    // log && console.log('MW-populateUserItems > C > resp.data : ', resp.data)
          //     const newAccessToken = resp.data.access_token
          //     store.dispatch('user/authenticateUser', {access_token: newAccessToken, token_type: 'Bearer'})
          //     $cookies.set('access_token', newAccessToken)
          //     promisesArray.push(initUserRequest)
          //     // return
          //   })
          //   .catch(error => {
          //     // 3. redirect to login page if refresh token is also expired
          //     // log && console.log('MW-populateUserItems > C > error : ', error)
          //     return redirect('/login')
          //   })
          //   promisesArray.push(newAccessTokenRequest)
          return
        })
      promisesArray.push(initUserRequest)
      
      // get data shared with user
      const initSharedRequest = $axios
        .get(`${api.users}/me/shared`, config.headers)
        .then(resp => {
          log && console.log('MW-populateUserItems > me/shared > resp.data : ', resp.data)
          // 1bis. set user data if necessary
          const sharedData = resp.data
          store.dispatch('groups/populateSharedItems', sharedData.shared_groups)
          store.dispatch('workspaces/populateSharedItems', sharedData.shared_workspaces)
          // store.dispatch('datasets/populateSharedItems', sharedData.shared_datasets)
          return
        })
        .catch(error => {
          log && console.log('MW-populateUserItems > > me/shared > error > error : ', error)
          return
        })
      promisesArray.push(initSharedRequest)
    
      // WAIT FOR ALL PROMISES TO RETURN
      // log && console.log('\n')
      return Promise.all(promisesArray)
    }

    else {
      if (currentPath === '/' ) {
        return
      } else {
        // log && console.log("MW-populateUserItems > NO accessTokenCookie but need login ... ")
        return redirect('/login')
      }
    }

  }
  
}
