<template>
  <div id="app">
    <appHeader v-show="$store.state.header.show"></appHeader>

    <router-view/>

    <appFooter v-show="$store.state.footer.show"></appFooter>
  </div>
</template>

<script>
  import appHeader from './components/AppHeader';
  import appFooter from './components/AppFooter';
  export default {
    name: 'App',
    components:{appHeader,appFooter},
    data(){
      return {}
    },
    created(){

    }

  }
</script>

<style lang="less">

</style>
