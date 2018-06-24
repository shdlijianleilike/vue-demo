<template>
  <div class="page">
  <h1>Frineds+cookie测试</h1>
    <h5>超长数字测试：id1 == id2 结果...haha</h5>
    id1={{id1}}
    <hr/>
    id2={{id2}}
    <hr/>
    cId1={{cId1}}
    <hr>
    千分位{{id1 | separator}}元
    <ul>
      <li v-for="film in films">
        <span>消费:</span>
        <span class="money">{{film.collect_count | separator}}</span>
        <span class="unit">RMB</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    created(){
      console.log('created');
      //this.$store.state.header.show = false;
      this.localStore.set('friends','lijianlei');
      this.sessionStore.set('friends','liuchaoyun');
      this.cookie.set('friends','jianjian',new Date((new Date().getTime()+1000*50)));//50s之后时间
      this.cookie.set('friends2','jianjian2');
    },
    data () {
      return {
        id1: 12345678901234567890,
        id2:'12345678901234567890',//String
        films:[]
      }
    },
    computed:{
      cId1(){
        let id=this.id1;
        return parseFloat(id).toPrecision(15);
      }
    },
    mounted(){
      console.log('mounted');
      this.loading();
      /*this.httpGet('https://api.douban.com/v2/movie/top250?count=30').then(response=>{
        this.closeLoad();
        this.films=response.data.subjects;
      });*/
      this.$http.get('api/v2/movie/top250?count=30').then(response => {
        this.closeLoad();
        this.films=response.data.subjects;
      });
    },
    methods:{},
    beforeDestroy(){
      console.log('beforeDestroy');
    },
    beforeRouteEnter(to, from, next){
      console.log('beforeRouteEnter');
      let v = this;
      next(v=>{
        v.$store.commit('hideNav');
        console.log('beforeRouteEnter回调');
      });
    },
    beforeRouteUpdate(to, from, next){
      this.$store.commit('hideNav');
      console.log('beforeRouteUpdate');
      next();
    },
    beforeRouteLeave(to, from, next){
      console.log('beforeRouteLeave');
      next();
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page {margin-top:-50px;}
ul {
  overflow: hidden;
  li {
    text-align: right;
    overflow: hidden;
    span {float:left;}
    & :first-child {
      width:20%;
      text-align: right;
      font-size:16px;
    }
    span.money {
      width:60%;
      text-align: right;
      padding-right:5px;
    }
    span.unit {
      width:20%;
      text-align: left;
      padding-left:5px;
    }

  }
}

</style>
