import Vue from 'vue'
import App from './App.vue'
import vueLazyloadWidget from './index';

Vue.use(vueLazyloadWidget);

new Vue({
  el: '#app',
  render: h => h(App)
})
