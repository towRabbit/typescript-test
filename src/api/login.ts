import request from '@/utils/request'
import {LoginQuery, RegisterQuery, ForgetPasswordQuery, AlidayuQuery} from '@/types/api/login.interface';

// 登录 ----------------------------
export function login(query: LoginQuery) {
  return request({
    url: '/Api/Login/login',
    method: 'post',
    data: query
  })
}

// 注册 ----------------------------
export function register(query: RegisterQuery) {
  return request({
    url: '/Api/Login/userreg',
    method: 'post',
    data: query
  })
}

// 忘记密码 ----------------------------
export function forgetPassword(query: ForgetPasswordQuery) {
  return request({
    url: '/UserApi/forget_pwd',
    method: 'post',
    data: query
  })
}

// 手机验证码 ----------------------------
export function alidayu(query: AlidayuQuery) {
  return request({
    url: '/UserApi/alidayu',
    method: 'post',
    data: query
  })
}

// 图片验证码 ----------------------------
export function indentiCode() {
  return request({
    url: '/UserApi/identiCode ',
    method: 'post'
  })
}
