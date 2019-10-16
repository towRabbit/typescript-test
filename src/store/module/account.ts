import { AccountState, UserInfo } from '@/types/store/account.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'

const state: AccountState = {
  token: '',
  locale: '',
  lan: '',
  userinfo: {},
  isLogin: false,
  showLogin: false
}

// 强制使用getter获取state
const getters: GetterTree<AccountState, any> = {
  username({userinfo}: UserInfo) {
    return userinfo.nickname || userinfo.telphone || '';
  }
}

// 更改state
const mutations: MutationTree<AccountState> = {
  setLocale(state: AccountState, lang: string) {
    state.locale = lang
    state.lan = lang === 'en' ? 'en' : ''
  },
  setUserInfo(state: AccountState, userinfo: UserInfo) {
    if (userinfo) {
      state.userinfo = userinfo
      state.isLogin = true
      state.token = userinfo.token
    } else {
      state.userinfo = {}
      state.isLogin = false
      state.token = ''
    }

  },
  changeLoginStatus(state: AccountState, status: boolean) {
    state.showLogin = status
  }
}

const actions: ActionTree<AccountState, any> = {}

export default {
  state,
  getters,
  mutations,
  actions
}
