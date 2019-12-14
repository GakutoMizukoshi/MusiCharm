import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'

import store from './store'

// VueRouterプラグインを使用する
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login,
    // ページが切り替わる直前に呼ばれる
    beforeEnter (to, from, next) {
      if (store.getters['auth/check']) {
        next('/') // ページの切り替わり先を指定
      } else {
        next()
      }
    }
  },
  {
    path: '/500',
    computed: SystemError
  }
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: 'history', // path後ろの#を消す
  routes
})

// app.jsでインポートするため
export default router
