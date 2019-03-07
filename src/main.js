import Vue from 'vue'
import App from './App.vue'
import vueLazyloadWidget from '../dist/vue-lazyload-widget';

Vue.use(vueLazyloadWidget);

new Vue({
  el: '#app',
  render: h => h(App)
})
