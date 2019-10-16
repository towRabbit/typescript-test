// account.Data 参数类型
export interface AccountData {
  pageName: string
}

// VUEX account.State 参数类型
export interface AccountState {
  token: string
  locale: string
  lan: string
  userinfo: object
  isLogin: boolean
  showLogin: boolean
}

export interface UserInfo {
  [propName: string]: any;
}

// GET_DATA_ASYN 接口参数类型
// export interface DataOptions {}
