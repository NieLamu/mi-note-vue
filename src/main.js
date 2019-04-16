import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Framework7 Library CSS Bundle
import 'framework7/css/framework7.bundle.min.css'
// Import Framework7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle.js'
// Import Framework7-Vue with all components
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'
// Init plugin and register all components
Framework7.use(Framework7Vue)

Vue.config.productionTip = true
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
