import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// Framework7 Library CSS Bundle
import 'framework7/css/framework7.bundle.min.css'
// Import Framework7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle'
// // Import Framework7-Vue with all components
// import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle'
// Import Framework7-Vue, import components you need in your components
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle'
// Init plugin and register all components
Framework7.use(Framework7Vue)

Vue.config.productionTip = true
Vue.use(VueAxios, axios)
Vue.use(mavonEditor)

Vue.prototype.$moment = moment
moment.locale('zh-cn', {
  monthsShort: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split(
    '_'
  ),
  weekdays: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    lll: 'YYYY年M月D日 HH:mm'
  },
  calendar: {
    sameDay: 'LT',
    nextDay: '[明天] LT',
    nextWeek: '[下]dddd LT',
    lastDay: '[昨天] LT',
    lastWeek: '[上]dddd LT',
    sameElse: 'lll'
  }
})

// Init Vue App
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
