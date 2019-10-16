/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 * @param {boolean} requiresAuth 是否有权限
 */
export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      requiresAuth: false
    }
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('./views/home.vue'),
  //   meta: {
  //     requiresAuth: false
  //   }
  // },
  // {
  //   path: '/submission',
  //   name: 'submission',
  //   component: () => import('./views/Submission.vue'),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/myApplication',
  //   name: 'myApplication',
  //   component: () => import('./views/MyApplication.vue'),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/uploadPackage',
  //   name: 'uploadPackage',
  //   component: () => import('./views/uploadPackage.vue'),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
]
