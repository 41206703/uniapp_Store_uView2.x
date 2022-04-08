import App from './App'

// #ifndef VUE3


import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import store from '@/store';
const app = new Vue({
	store,
    ...App
})



require('@/config/request')(app)


app.$mount()


// #endif






// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif