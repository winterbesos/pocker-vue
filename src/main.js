import Vue from 'vue'
import App from './App.vue'
import Global from './define/Global'
//import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.prototype.GLOBAL = Global

new Vue({
  render: h => h(App),
}).$mount('#app')

//app.use(VueRouter)
