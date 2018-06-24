<template>
  <header>
    <div class="header-container">
      <div @click="back">&lt;</div>
      <p>{{$store.state.header.title}}</p>
    </div>
  </header>
</template>

<script>
    export default {
      name:'',
      data() {
        return {}
      },
      methods:{
        back() {
          this.$router.back() ? this.$router.back() : this.$router.push('/home');
        }
      }

    }
</script>

<style scoped lang="less">
  @import "../css/calc.less";

  header{
    .header-container {
      position:fixed;
      left:0;top:0;
      width: 100%;
      .px2rem(height,88px);
      .px2rem(line-height,88px);
      background-color:@nice-blue;
      z-index:9993;
      div{
        position: absolute;
        color:#fff;
        left:15px;
      }
      p{
        color:#fff;
      }
    }
  }
</style>
