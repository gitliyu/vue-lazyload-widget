import Vue from 'vue';
import {merge, isLazyImage} from './assets/js/util';

// 默认图片路径
const defaultImg = 'https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif';

// 默认配置
const defaultOptions = {
  root: null,
  threshold: [0, 1],
  rootMargin: '0'
};

const install = (Vue, options = []) => {
  // 按照优先级设置配置项，配置的options > 初始化传入的options > 默认options 
  options = merge({}, defaultOptions, options, Vue.$lazyOptions);
  Vue.prototype.lazyOptions = options;

  const io = new IntersectionObserver(entries => {
    entries.forEach((item) => {
      if (!item.isIntersecting) return false;
      let target = item.target;
      if (isLazyImage(target)) {
        target.src = target.dataset.src;
      }
      io.unobserve(target);
    })
  });

  Vue.directive('lazy-img', {
    inserted: function (el, {value}) {
      if (el.tagName !== 'IMG') {
        console.warn('Invalid Tag! The directive is used on img only.');
      }
      if (!value) {
        console.warn('No Path! Please set your image url.');
      }
      el.src = defaultImg;
      el.dataset.src = value;
      io.observe(el);
    }
  });

  Vue.prototype.io = io;
};

export default {
  install
};

if (typeof window !== 'undefined' && window.Vue) {
  install(Vue)
}