import colors from 'vuetify/es5/util/colors'

import { 
  buildLocales,
  defaultLoc,
  choosePort,
  logAllowed,
  configApp
} from './utils/utilsConfig'

const dotenv = require('dotenv')

// loads .env file(s)
dotenv.config()
// dotenv.config({ path: 'production.env' })

const RUN_MODE = process.env.NUXT_ENV_RUN_MODE || process.env.NUXT_ENV_RUN_MODE_OVERIDE


const config = new configApp(RUN_MODE, process.env)
// console.log('>>> nuxt.config.js (start) / config : ', config)
console.log('>>> nuxt.config.js (start) / config.backendApi : ', config.backendApi)


// - - - - - - - - - - - - - - - - - - - - - - - -
// NUXT CONFIG

export default {
  // mode: 'spa',
  ssr: false,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: process.env.NUXT_ENV_APP_TITLE || 'DATA PATCH',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // for build or dev
  // https://nuxtjs.org/faq/host-port/
  server: {
    port: config.port, // 3000
    host: config.host // XXX.XX.XX.XX
  },

  // custom env variables for nuxt
  // cf : https://github.com/nuxt/nuxt.js/issues/1789
  env: {
    MODE_APP: config.mode,
    LOG: logAllowed.includes(config.mode),
    CONFIG_APP: config,
    CONFIG_APP_BACKEND: config.backendApi,
  },

  /*
   ** Routes and middlewares to load before loading routes
   */
   router: {
    prefetchLinks: false,
    middleware: [
      'resetDialogs',
      'checkUserToken'
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: config.loadingColor,
    height: config.loadingHeight,
    continuous: config.loadingContinuous
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/fonts/Marianne.css',
    '~/assets/css/main.scss',
    '~/assets/css/style.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/globalComponents',
    { src: '~/plugins/axios', mode: 'client' },
    { src: '~/plugins/draggable.js', mode: 'client' }
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  /*
  ** i18n
  ** cf : https://phrase.com/blog/posts/nuxt-js-tutorial-i18n/
  ** cf : 
  */
  i18n: {
    defaultLocale: config.defaultLocale || defaultLoc, // 'fr',
    locales: config.localesBuild,
    vueI18n: {
      fallbackLocale: config.defaultLocale || defaultLoc // 'fr',
    },
    lazy: true,
    langDir: 'locales/'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', {
      alias: 'cookies'
    }],
    ['nuxt-i18n', {
      strategy: 'no_prefix',
      defaultLocale: 'en'
    }],
  ],

  
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    // defaultAssets: false,
    theme: {
      dark: false,
      themes: config.vuetifyThemes
    }
  },
  /*
  ** Build configuration
  */
  build: {
    // transpile: ['gsap'],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
