// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment: Environment = {
  production: false,
  apiKey: 'AIzaSyDKV0DHwBMehOvA4gwpykDJ4_wW0tU0rfc',
  authDomain: 'angular-blog-329c0.firebaseapp.com',
  databaseURL: 'https://angular-blog-329c0.firebaseio.com',
  projectId: 'angular-blog-329c0',
  storageBucket: 'angular-blog-329c0.appspot.com',
  messagingSenderId: '892106360284',
  appId: '1:892106360284:web:f9e3149a8c1c1969b4bb19'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
