import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Vuelidate from "vuelidate"
import VueSimpleAlert from 'vue-simple-alert'
import notification from 'vue-notification-ui'
import VueConfirmDialog from 'vue-confirm-dialog'
 
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.use(notification, {
  position: 'notification-top-right', // top, bottom, left, right
  duration: 5000, // default
  left: 20, // default
  bottom: 20, // default
  top: 20, // default
  right: 40 // default
})


Vue.use(VueSimpleAlert);

Vue.use(Vuelidate);
Vue.use(BootstrapVue)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
