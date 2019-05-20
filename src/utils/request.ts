import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '../store/index'
import router from '../router/index';

// create an axios instance
const service = axios.create({
  baseURL: '' // api的base_url
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  let data = qs.parse(config.data) || {}
  if (store.state.account.token) {
    data = Object.assign({token: store.state.account.token}, data)
  }

  data = Object.assign({lan: store.state.account.lan}, data)
 
  if (config.method === 'get') {
    config.params =  data
  }
  if (config.method === 'post') {
    config.data =  qs.stringify(data)
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const result = Number(response.data.result)
    response.data.result = result
    const isHome = (router as any).history.current.name === 'home'
    if (result !== 1 && !isHome) {
      Message.error(response.data.message)
    }
    return response.data
  },

  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
