import '@babel/polyfill'
import '@Plugins/vuetify'
import App from '@Layouts/app/index'
import router from '@Router/index'
import store from '@Store/index'
import Vue from 'vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
