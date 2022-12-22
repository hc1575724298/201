import axios from 'axios';
import {
  Message
} from 'element-ui';
import store from '@/store';

axios.defaults.timeout = 60000; //超时时间
axios.defaults.withCredentials = false;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
// create an axios instance
// const service = axios.create({
//   baseURL: 'http://127.0.0.1:28888/api', // url = base url + request url
//   // baseURL: 'http://192.168.50.152:28888/api', // url = base url + request url
//   timeout: 5000 // request timeout
// });
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://127.0.0.1:28888/api';
} else {
  axios.defaults.baseURL = '/api';
}
const service = axios.create({
  timeout: 60000 // request timeout
})
var urlEncode = function(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof(param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};

// request interceptor
service.interceptors.request.use(
  config => {
	  config.headers['Simulate'] = 1;
    // do something before request is sent
    if (store.getters.user.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = store.getters.user.token;
    }
    // config.data = JSON.parse(config.data);
    if (config.method && config.method.toLowerCase() == 'post') {
      config.data = urlEncode(config.data);
    }

    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response.data;

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 0) {
    //   Message({
    //     message: res.msg || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   return Promise.reject(new Error(res.msg || 'Error'));
    // } else {
    //   return res;
    // }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error);
  }
)

export default service;
