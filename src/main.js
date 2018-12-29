import Vue from 'vue'
import axios from 'axios'
// import 'normalize.css/normalize.css'// A modern alternative to CSS resets
/* cookie*/
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
/* cookie*/
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import ElementUI from 'element-ui'
import elTreeselect from 'el-tree-select'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import 'iview/dist/iview.min.js'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/assets/scss/index.scss' // global css
import App from './App'
// var routes = ajx...
// window.routesData = routes
import router from './router'
import store from './store'



import iView from 'iview'

import '@/icons' // icon
// import '@/permission' // permission control
//import 'babel-polyfill'
Vue.use(VueCookie)
Vue.use(ElementUI)
Vue.use(iView)
Vue.config.productionTip = false
// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
} else {
  require('@/mock')
}
// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
