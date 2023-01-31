import axios from 'axios'
import log from './logger'

import options from './store'

//import { CacheOptions, setupCache, type HeadersInterpreter } from 'axios-cache-interceptor';
//import {  CacheOptions, setupCache , type HeaderInterpreter} from 'axios-cache-interceptor/dev';


// const myHeaderInterpreter: HeadersInterpreter = (headers: any) => {

//   if (headers['cache-control']) {

//     try {
//       const headerMaxAge = headers['cache-control'].split('=')[1].split(',')[0]
//       const seconds = Number(headerMaxAge);
//       if (seconds < 1) {
//         return 'dont cache';
//       }
//       log(`CACHE FOR ${seconds.toString()} seconds`)
//       return seconds;
//     }
//     catch (e) {
//       return 'not enough headers';
//     }

//   }

//   return 'not enough headers';
// };

// const cacheOptions: CacheOptions = {
//   debug: log,//works only with -> import { setupCache } from 'axios-cache-interceptor/dev';
//   methods: ["get", "post"],
//   headerInterpreter: myHeaderInterpreter
// }
// const api = setupCache(axios, cacheOptions);

export const post = (callback: (data: any, error?: any) => void, params: URLSearchParams) => {

  log('DOING AJAX POST REQUEST')
  axios.post(options.ajaxUrl, params)
    .then(function (response) {
      // `response.request` will contain the origin `axios` request object
      // if (response.cached) {
      //   log('AXIOS REPONSE WAS CACHED')
      // }
      // else {
      //   log('AXIOS RESPONSE WAS NOT CACHED')
      // }
      log('AJAX POST RESPONSE:', response)
      callback(response.data)
    }).catch((error) => {
      console.warn(error)
      callback(error.response, error)
    })

}


