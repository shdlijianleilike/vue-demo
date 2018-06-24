<template>
  <div>
    <h1>登录</h1>
    <button @click="login">点击登录</button>
  </div>
</template>

<script>
    export default {
      data() {
        return {

        }
      },
      methods:{
        login() {
          this.cookie.set('isLogin','1',new Date((new Date()).getTime()+1000*60*60));//登录状态失效60min
          this.$router.back() ? this.$router.back() : this.$router.push('/home');
        },
      },
      beforeRouteEnter(to, from, next){
        console.log('Login-beforeRouteEnter');
        let v = this;
        next(v=>{
          v.$store.commit('hideBar');
          console.log('Login-beforeRouteEnter回调');
        });
      },
      beforeRouteUpdate(to, from, next){
        this.$store.commit('hideBar');
        console.log('Login-beforeRouteUpdate');
        next();
      },
      beforeRouteLeave(to, from, next){
        console.log('Login-beforeRouteLeave');
        next();
      }

    }
</script>

<style scoped lang="less">

</style>
