import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import './styles/index.sass'

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
