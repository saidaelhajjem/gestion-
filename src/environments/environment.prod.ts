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
  production: true,
  apiUrl: API_URL
};
