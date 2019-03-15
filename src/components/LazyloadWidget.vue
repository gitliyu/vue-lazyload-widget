<template>
  <transition-group name="lazy-widget" tag="div" class="lazy-widget"
    @before-enter="emitEvent('before-enter')"
    @before-leave="emitEvent('before-leave')"
    @after-enter="emitEvent('after-enter')"
    @after-leave="emitEvent('after-enter')"
  >
    <div v-if="visible" key="content">
      <slot></slot>
    </div>
    <div v-else-if="$slots.skeleton" key="skeleton">
      <slot name="skeleton"></slot>
    </div>
    <div v-else key="loading">
      <img :src="defaultImg">
    </div>
  </transition-group>
</template>

<script type="text/javascript">
  import {defaultOptions, defaultImg} from '../assets/js/config';
  import {merge} from '../assets/js/util';

  export default {
    name: 'lazy-widget',
    data () {
      return {
        visible: false,
        io: null,
        defaultImg
      }
    },
    props: {
      options: {
        type: Object,
        default: () => {
          return defaultOptions;
        }
      }
    },
    mounted () {
      this.initObserver();
    },
    /*
    * 组件销毁前取消监听
    * */
    beforeDestroy () {
      if (this.io) {
        this.io.unobserve(this.$el)
      }
    },
    methods: {
      /*
      * 初始化IntersectionObserver
      * */
      initObserver () {
        // 合并options，优先级从高到低 组件options > 父级lazyOptions > 全局安装时options > 默认options
        const options = merge({}, defaultOptions, window.lazyOptions, this.$parent.lazyOptions, this.options);

        this.io = new IntersectionObserver(this.initHandle, options);
        this.io.observe(this.$el);
      },
      /*
      * 渲染组件内容
      * */
      initHandle (entries) {
        entries.forEach(item => {
          if (!item.isIntersecting) return false;
          let target = item.target;
          this.emitEvent('before-init', target);
          this.visible = true;
          this.$nextTick(() => {
            this.emitEvent('init', target);
            this.io.unobserve(target);
          });
        })
      },
      /*
      * 发送事件
      * */
      emitEvent (event, target) {
        this.$emit(event, target || this.$el)
      }
    }
  }
</script>

<style lang="scss">
  .lazy-widget-enter-active {
    transition: opacity .5s;
  }
  .lazy-widget-enter{
    opacity: 0;
  }
</style>