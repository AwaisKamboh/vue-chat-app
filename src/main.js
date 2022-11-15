import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  "./assets/dist-assets/css/themes/lite-purple.min.css"
import  "./assets/dist-assets/css/plugins/perfect-scrollbar.min.css"

import Pusher from "pusher-js";
import VueEcho from "vue-echo-laravel";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

Vue.use(VueEcho, {
  broadcaster: "pusher",
  key: "f721bb4f0938deeebf74",
  cluster: "ap2",
  forceTLS: true,
  authEndpoint: "https://127.0.0.1:8000/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
