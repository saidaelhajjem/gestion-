// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Webservice Ports configurations
 */
const PORTS_CONFIG = {
  localApiPort: ':8000',
  distantApiPort: '',
};

/**
 * Used to specify if the app is running on local environnment or prod env.
 */
const GLOBAL_CONFIG = {
  isLocal: false,
  localApiUrl: `http://localhost${PORTS_CONFIG.localApiPort}/api`,
  distantApiUrl: `https://rh.rdmc.dev${PORTS_CONFIG.distantApiPort}/api`
};

const API_URL = GLOBAL_CONFIG.isLocal ? GLOBAL_CONFIG.localApiUrl : GLOBAL_CONFIG.distantApiUrl;

export const environment = {
  production: false,
  apiUrl: API_URL
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
