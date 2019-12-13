import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'

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
    component: Login
  }
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: 'history', // path後ろの#を消す
  routes
})

// app.jsでインポートするため
export default router
