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
  // console.log("MW-checkUserAccessToken > app : ", app)
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
  // log && console.log("\nMW-checkUserAccessToken > pathNeedsAuth : ", pathNeedsAuth)
  
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
    // log && console.log("MW-checkUserAccessToken > tokenAccess : ", tokenAccess)
    
    if (tokenAccess) {
      // log && console.log("MW-checkUserAccessToken > HAS accessTokenCookie ... ")

      let config = new configHeaders(accessTokenCookie)

      // 1. check if access_token is still valid + get user data if isUserPopulated is empty
      const initUserRequest = $axios
        .get(`${api.users}/verify-acces-token/`, config.headers)
        .then(resp => {
          // log && console.log('MW-checkUserAccessToken > B > me > resp.data : ', resp.data)
          return
        })
        .catch(error => {
          // 2. refresh access_token if refresh_token is still valid
          // log && console.log('MW-checkUserAccessToken > C > error > error : ', error)
          let refreshTokenCookie = $cookies.get('refresh_token')
          // log && console.log("MW-checkUserAccessToken > C > refreshTokenCookie : ", refreshTokenCookie)
          let configRefresh = new configHeaders(refreshTokenCookie)
          // log && console.log("MW-checkUserAccessToken > C > configRefresh.headers : ", configRefresh.headers)
          const newAccessTokenRequest = $axios
            .get(`${api.users}/new-access-token/`, configRefresh.headers)
            .then(resp => {
             // 3. set cookie with new access_token so next middleware will use this one
             // log && console.log('MW-checkUserAccessToken > C > resp.data : ', resp.data)
              const newAccessToken = resp.data.access_token
              store.dispatch('user/authenticateUser', {access_token: newAccessToken, token_type: 'Bearer'})
              $cookies.set('access_token', newAccessToken)
              promisesArray.push(initUserRequest)
              // return
            })
            .catch(error => {
              // 3. redirect to login page if refresh token is also expired
              // log && console.log('MW-checkUserAccessToken > C > error : ', error)
              return redirect('/login')
            })
            promisesArray.push(newAccessTokenRequest)
        })
      promisesArray.push(initUserRequest)

      // WAIT FOR ALL PROMISES TO RETURN
      // log && console.log('\n')
      return Promise.all(promisesArray)
    }

    else {
      if (currentPath === '/' ) {
        return
      } else {
        // log && console.log("MW-checkUserAccessToken > NO accessTokenCookie but need login ... ")
        return redirect('/login')
      }
    }

  }
  
}
