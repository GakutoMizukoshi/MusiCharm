import './bootstrap'

import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// awaitは非同期の中で記述
const createApp = async () => {
  await store.dispatch('auth/currentUser')

  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App />'
  })
}

createApp()
