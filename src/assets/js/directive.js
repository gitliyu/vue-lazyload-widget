import {defaultImg} from './config';

// 注册 v-lazy-img 指令
export default  (Vue, io) => {
  Vue.directive('lazy-img', {
    inserted: function (el, {value}) {
      let path = value || el.dataset.src;
      if (el.tagName !== 'IMG') {
        console.warn('Invalid Tag! The directive is used on img only.');
      }
      if (!path) {
        console.warn('No Path! Please set your image url.');
      }
      el.src = defaultImg;
      el.dataset.src = path;
      io.observe(el);
    }
  });
}
