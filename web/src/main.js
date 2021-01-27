import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import { createProvider } from './vue-apollo'

import '../scss/style.scss'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
