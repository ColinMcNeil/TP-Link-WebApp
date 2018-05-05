import Auth from './auth'

import './middleware'

// Active chemes
import scheme_3e2123be from './schemes/local.js'
import scheme_6ce4fcca from './schemes/oauth2.js'

export default function (ctx, inject) {
  // Options
  const options = {"resetOnError":false,"scopeKey":"scope","rewriteRedirects":true,"fullPathRedirect":false,"redirect":{"login":"/login","logout":"/","home":"/","callback":"/login"},"vuex":{"namespace":"auth"},"cookie":{"prefix":"auth.","options":{"path":"/"}},"localStorage":{"prefix":"auth."},"token":{"prefix":"_token."},"refresh_token":{"prefix":"_refresh_token."},"defaultStrategy":"local"}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Inject it to nuxt context as $auth
  inject('auth', $auth)

  // Register strategies

  // local
  $auth.registerStrategy('local', new scheme_3e2123be($auth, {"endpoints":{"login":{"url":"/api/auth/login","method":"post","propertyName":"token"},"logout":{"url":"/api/auth/logout","method":"post"},"user":{"url":"/api/auth/user","method":"get","propertyName":"user"}},"_name":"local"}))

  // google
  $auth.registerStrategy('google', new scheme_6ce4fcca($auth, {"client_id":"811800195268-dcspgc96q1rt4kdp1sgk7nmemsg745fv.apps.googleusercontent.com","_name":"google","authorization_endpoint":"https://accounts.google.com/o/oauth2/auth","userinfo_endpoint":"https://www.googleapis.com/oauth2/v3/userinfo","scope":["openid","profile","email"]}))

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.browser) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
