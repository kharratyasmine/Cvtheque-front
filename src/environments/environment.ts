// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import {KeycloakConfig} from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'http://172.19.0.29:8180/auth/',
  realm: 'master',
  clientId: 'cv_theque',
  credentials: {
    secret: '68bb9b71-c9b9-4f4a-a6cd-1104544f2f43'
  },

};
export const environment = {
  production: false,
  keycloak: keycloakConfig,
  BASE_URL: 'http://172.19.0.29:8081/api/'
};
