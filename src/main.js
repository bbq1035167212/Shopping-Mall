import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
