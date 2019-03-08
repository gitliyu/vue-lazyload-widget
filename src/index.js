import Vue from 'vue';
import install from './assets/js/install';

export default {
  install
};

if (typeof window !== 'undefined' && window.Vue) {
  install(Vue)
}
