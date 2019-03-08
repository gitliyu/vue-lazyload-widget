import {defaultOptions} from './config';
import {merge, isLazyImage, isEmptyObject} from './util';
import registerDirective from './directive';

export default (Vue, options = []) => {
  // 注册 IntersectionObserver
  const io = registerIo(options);
  // 注册v-lazy指令
  registerDirective(Vue, io);

  Vue.mixin({
    data () {
      return {
        lazyOptions: {}
      }
    },
    created () {
      if (!isEmptyObject(this.lazyOptions)) {
        const io = registerIo(this.lazyOptions);
        registerDirective(Vue, io);
      }
    }
  });
}

function registerIo (options) {
  // 按照优先级设置配置项，配置的options > 初始化传入的options > 默认options
  options = merge({}, defaultOptions, options);

  const io = new IntersectionObserver(entries => {
    entries.forEach((item) => {
      if (!item.isIntersecting) return false;
      let target = item.target;
      if (isLazyImage(target)) {
        target.src = target.dataset.src;
      }
      io.unobserve(target);
    })
  }, options);

  return io;
}
