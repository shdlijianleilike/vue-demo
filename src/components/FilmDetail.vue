<template>
  <div>
    <img :src="item.images.small" :alt="item.alt"/>
    <h5>{{item.title}}</h5>
    <i v-for="type in item.genres">[{{type}}]</i>
    <p>年份:{{item.year}}</p>
    <span>总点击数：{{item.collect_count}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item:{}
      }
    },
    created(){
      this.item = JSON.parse(this.$route.params.film);
    },
    /*beforeRouteUpdate(to, from, next) {
      this.item = JSON.parse(this.$route.params.film);
      next();
    }*/
  }
</script>

<style scoped lang="less">

</style>
