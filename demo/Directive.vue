<template>
  <div class="directive-page">
    <div class="item-image" v-for="(img, index) in getImages()" :key="index">
      <img v-lazy-img="img">
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    methods: {
      getImages () {
        let images = [];
        for (let i = 1;i < 15;i++) {
          images.push(require(`../assets/images/pic${i}.jpg`));
        }
        return images;
      }
    }
  }
</script>

<style lang="scss">
  .directive-page{
    .item-image{
      margin-bottom: 20px;
      text-align: center;
      min-height: 500px;
      img{
        max-width: 800px;
      }
    }
  }
</style>