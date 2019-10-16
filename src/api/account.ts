import request from '@/utils/request'

// 登录 ----------------------------
interface LoginQuery {
  phone: string | number; // 手机号码
  pwd: string;            // 密码
}
export function login(query: LoginQuery ) {
  return request({
    url: '/Api/Login/login',
    method: 'post',
    data: query
  })
}