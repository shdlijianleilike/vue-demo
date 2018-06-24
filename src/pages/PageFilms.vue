<template>
  <div>
    <div class="film_tab">
      <router-link to="/films/listA">排行榜一</router-link>
      <router-link to="/films/listB">排行榜二</router-link>
      <router-link to="/films/listC">排行榜三</router-link>
    </div>
  <router-view ></router-view>

  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {}
    },
    mounted(){},
    methods:{}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.film_tab {

}
</style>
