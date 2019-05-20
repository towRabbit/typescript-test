import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// modules
import account from './module/account'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: {
      getItem: key => sessionStorage.getItem(key),
      setItem: (key, value) => sessionStorage.setItem(key, value),
      removeItem: key => sessionStorage.removeItem(key)
    }
  })],
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    account
  }
})
