import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import PhotoDetail from './pages/PhotoDetail.vue'
import SystemError from './pages/errors/System.vue'
import NotFound from './pages/errors/NotFound.vue'

import store from './store'

// VueRouterプラグインを使用する
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
  {
    path: '/',
    component: Home,
    props: route => {
      const page = route.query.page
      return { page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1 }
    }
  },
  {
    path: '/photos/:id',
    component: PhotoDetail,
    props: true // :idを受け取る事を許可
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
  },
  {
    path: '*',
    component: NotFound
  }
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: 'history', // path後ろの#を消す
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

// app.jsでインポートするため
export default router
