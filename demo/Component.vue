<template>
  <div class="component-page">
    <div v-for="content in [1,2,3]" :key="content">
      <lazy-widget v-for="(item, index) in getContents()" :key="index" :height="item.height">
        <div class="item-content" :style="`background-color: ${item.color}`"></div>
      </lazy-widget>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    methods: {
      getContents () {
        let list = [];
        for (let i = 0;i < 100;i++) {
          list.push({
            color: this.randomColor(),
            height: 100 + Math.random() * 200
          });
        }
        return list;
      },
      randomColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
      }
    }
  }
</script>

<style lang="scss">
  .component-page{
    display: flex;
    >div{
      flex-grow: 1;
      .lazy-widget{
        box-sizing: border-box;
        padding: 10px;
        .item-content{
          height: 100%;
        }
      }
    }
    .lazy-widget-enter-active {
      transition: opacity 2s;
    }
    .lazy-widget-enter{
      opacity: 0;
    }
  }
</style>