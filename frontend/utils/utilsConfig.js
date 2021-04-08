// - - - - - - - - - - - - - - - - - - - //
// FUNCTIONS RELATED TO ENV VAR
// - - - - - - - - - - - - - - - - - - - //

const trueStrings = [
  'y',
  'yes',
  'Yes',
  'YES',
  'Y',
  'o',
  'oui',
  'Oui',
  'OUI',
  'O',
  't',
  'true',
  'True',
  'TRUE',
  'T'
]
// const falseStrings = [
//   'no',
//   'No',
//   'NO',
//   'NON',
//   'Non',
//   'non',
//   'n',
//   'N',
//   'false',
//   'False',
//   'FALSE',
//   'f',
//   'F'
// ]
export const chooseBooleanMode = (ARG) => {
  if (trueStrings.includes(ARG)) {
    return true
  } else {
    return false
  }
}

export const defaultLoc = 'fr'
export const defaultLocs = [
  {
    code: 'fr',
    name: 'Français',
    file: 'fr-FR.js'
  }
]

export const buildLocales = (localesString) => {
  if (localesString) {
    const locales = []
    const tempLocales = localesString.split(',')
    for (const loc of tempLocales) {
      const loc_ = loc.split(':')
      const obj = {
        code: loc_[0],
        name: loc_[1],
        iso: loc_[2],
        file: `${loc_[2]}.js`
      }
      locales.push(obj)
    }
    return locales
  }
}


export const logAllowed = ['preprod', 'dev', 'mockup']

export const choosePort = (ENVPROD, env) => {
  const NUXT_ENV_PORT_DEV = parseInt(env.NUXT_ENV_PORT_DEV) || 50050
  const NUXT_ENV_PORT_PREPROD =
    parseInt(env.NUXT_ENV_PORT_PREPROD) || 50051
  const NUXT_ENV_PORT_PROD = parseInt(env.NUXT_ENV_PORT_PROD) || 50052
  if (ENVPROD === 'dev') {
    return NUXT_ENV_PORT_DEV
  } else if (ENVPROD === 'preprod') {
    return NUXT_ENV_PORT_PREPROD
  } else if (ENVPROD === 'prod') {
    return NUXT_ENV_PORT_PROD
  }
}

export const chooseApiBackend = (ENVPROD, env) => {
  if (ENVPROD === 'dev') {
    return env.NUXT_API_ROOT_BACKEND_DEV
  }
  else if (ENVPROD === 'prod') {
    return env.NUXT_API_ROOT_BACKEND_PROD
  }
}

export class configApp  {
  constructor (RUN_MODE, env) {
    this.appVersion = env.npm_package_version;
    this.appTitle = env.NUXT_ENV_APP_TITLE;
  
    // DEV MODE - PORT - HOST ...
    this.mode = RUN_MODE;
    this.host = env.NUXT_ENV_HOST;
    this.port = choosePort(RUN_MODE, env);

    // LOADING
    this.loadingColor = env.NUXT_ENV_LOADING_COLOR || '#fff';
    this.loadingHeight = `${ env.NUXT_ENV_LOADING_HEIGHT || 3 }px`;
    this.loadingContinuous = env.NUXT_ENV_APP_LOADING_CONTINUOUS || true;

    // INTERNATIONALIZATION
    this.defaultLocale = env.NUXT_ENV_LANG_DEFAULT_LOCALE || defaultLoc;
    this.localesBuild =
      buildLocales(env.NUXT_ENV_LANG_DEFAULT_LOCALES) || defaultLocs;

    // API BACKEND
    this.apiUrlBackend = chooseApiBackend(RUN_MODE, env);
    this.apiUrlBackendPrefix = `${this.apiUrlBackend}${env.NUXT_API_ROOT_PREFIX}`;
    this.apiUrlBackendDocs = `${this.apiUrlBackend}${env.NUXT_API_ROOT_DOCUMENTATION}`;

    this.apiUrlUsers = `${this.apiUrlBackendPrefix}${env.NUXT_API_USERS}`;
    this.apiUrlGroups = `${this.apiUrlBackendPrefix}${env.NUXT_API_GROUPS}`;
    this.apiUrlWorkspaces = `${this.apiUrlBackendPrefix}${env.NUXT_API_WORKSPACES}`;
    this.apiUrlDatasets = `${this.apiUrlBackendPrefix}${env.NUXT_API_DATASETS}`;
    this.apiUrlTables = `${this.apiUrlBackendPrefix}${env.NUXT_API_TABLES}`;
    this.apiUrlTableData = `${this.apiUrlBackendPrefix}${env.NUXT_API_TABLE_DATA}`;
    this.apiUrlSchemas = `${this.apiUrlBackendPrefix}${env.NUXT_API_SCHEMAS}`;
    this.apiUrlFields = `${this.apiUrlBackendPrefix}${env.NUXT_API_FIELDS}`;
    this.apiUrlComments = `${this.apiUrlBackendPrefix}${env.NUXT_API_COMMENTS}`;
    this.apiUrlNotifications = `${this.apiUrlBackendPrefix}${env.NUXT_API_NOTIFICATIONS}`;
    
    this.vuetifyThemes = {
      light : {
        primary: env.NUXT_ENV_THEME_LIGHT_primary,
        accent: env.NUXT_ENV_THEME_LIGHT_accent,
        secondary: env.NUXT_ENV_THEME_LIGHT_secondary,
        info: env.NUXT_ENV_THEME_LIGHT_info,
        warning: env.NUXT_ENV_THEME_LIGHT_warning,
        error: env.NUXT_ENV_THEME_LIGHT_error,
        success: env.NUXT_ENV_THEME_LIGHT_success
      },
      dark : {
        primary: env.NUXT_ENV_THEME_DARK_primary,
        accent: env.NUXT_ENV_THEME_DARK_accent,
        secondary: env.NUXT_ENV_THEME_DARK_secondary,
        info: env.NUXT_ENV_THEME_DARK_info,
        warning: env.NUXT_ENV_THEME_DARK_warning,
        error: env.NUXT_ENV_THEME_DARK_error,
        success: env.NUXT_ENV_THEME_DARK_success
      }
    }
  }

  get backendApi () {
    return {
      docs: this.apiUrlBackendDocs,

      users: this.apiUrlUsers,
      groups: this.apiUrlGroups,
      workspaces: this.apiUrlWorkspaces,
      datasets: this.apiUrlDatasets,
      tables: this.apiUrlTables,
      tableData: this.apiUrlTableData,
      schemas: this.apiUrlSchemas,
      fields: this.apiUrlFields,
      comments: this.apiUrlComments,
      notifications: this.apiUrlNotifications,
    }
  }

}
