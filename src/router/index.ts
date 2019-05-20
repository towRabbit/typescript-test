import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

// 登陆页面路由 name
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {  // 判断该路由是否需要登录权限
    if (store.state.account.isLogin) {  // 通过vuex 如果当前有登录
      next();
    } else {
      next({path: '/'})
      if (from.name === 'home') {
        store.commit('changeLoginStatus', true)
      }
    }
  } else {
    next();
  }
});

// 跳转之后
router.afterEach(to => {
  //
})

export default router