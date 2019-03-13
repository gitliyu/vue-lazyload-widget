<template>
  <div class="lazy-widget">
    <div v-if="visible">
      <slot></slot>
    </div>
    <div v-else>
      <!-- default content -->
    </div>
  </div>
</template>

<script type="text/javascript">
  import {defaultOptions} from '../assets/js/config';
  import {merge} from '../assets/js/util';

  export default {
    data () {
      return {
        visible: false,
        io: null
      }
    },
    props: {
      options: {
        type: Object,
        default: defaultOptions
      }
    },
    mounted () {
      this.initObserver();
    },
    beforeDestroy () {
      if (this.io) {
        this.io.unobserve(this.$el)
      }
    },
    methods: {
      initObserver () {
        // 合并options，优先级从高到低 组件options > 父级lazyOptions > 全局安装时options > 默认options
        const options = merge({}, defaultOptions, window.lazyOptions, this.$parent.lazyOptions, this.options);

        this.io = new IntersectionObserver(entries => {
          entries.forEach((item) => {
            if (!item.isIntersecting) return false;
            this.visible = true;
            io.unobserve(target);
          })
        }, options);
        this.io.observe(this.$el);
      }
    }
  }
</script>

<style lang="scss">

</style>