import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

import App from '@/App.vue'


// WE USE COOKIES
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('7d') // set default config

// ICONS
import 'vue-awesome/icons'  
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

// ROUTER
Vue.use(VueRouter)
import router from '@/router'

// Vuex STORE
import store from '@/store/store.js'

// PAGE META
Vue.use(VueMeta)

// INSTANCE
new Vue({
  router,
  store,
  metaInfo: {
      title: 'Mapquill Beta',
      htmlAttrs: {
        lang: 'en',
        amp: true
      },
      meta: [
        {name: "viewport", 
         content:"width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        }
      ]
    },
  created: function() {
    window.addEventListener('online', () => this.$store.commit('setLoadingState', ''));
    window.addEventListener('offline', () => this.$store.commit('setLoadingState', 'no internet'));
  },
  render: h => h(App),
}).$mount('#app')
