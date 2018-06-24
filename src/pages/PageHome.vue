<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <ul>
      <li v-for="(item,index) in films">{{index}}-{{item.title}}</li>
    </ul>
    <ul>
      <li v-for="(item,index) in films2">{{index}}-{{item.title}}</li>
    </ul>
    <ul>
      <li v-for="(item,index) in films3">{{index}}-{{item.title}}</li>
    </ul>

    <ul>
      <li ><a @click="showConfirm">
       confirm??
      </a></li>
    </ul>
    <hr/>
    <router-link to="/home/A">A</router-link>
    <router-link to="/home/B">B</router-link>
    <br>
    <router-link to="/home/C">C1C2双view展示</router-link>
    <router-view name="default"></router-view>
    <router-view name="v1"></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      films:[],
      films2:[],
      films3:[]
    }
  },
  mounted(){
    let self=this;
    self.loading();
    let url='https://api.douban.com/v2/movie/top250?count=3';
    let url2='https://api.douban.com/v2/movie/top250?count=3';
    let url3='https://api.douban.com/v2/movie/top250?count=3';
    Promise.all([self.httpGet(url),self.httpGet(url2),self.delay(5000)]).then(([response,response2,response3])=>{
      self.closeLoad();
      self.films=response.data.subjects;
      self.films2=response2.data.subjects;
      //self.toast({tip:'11111'});//default 2s close
      self.toast({tip:'获取后台数据成功！',time:3000});
      self.delay(5000).then(()=>{
        self.confirm('我是自动出来的!</br>点击一下就能看到点击的结果了！</br>这个宽度到底是谁决定的呢？').then((result)=>{
          console.log(result);
          if(result) {
            self.toast('你点击了确定！');
          }else {
            self.toast('你点击了取消！');
          }
        });
      });
    }).catch();

   /* let url=['https://api.douban.com/v2/movie/top250?count=3','https://api.douban.com/v2/movie/top250?count=3','https://api.douban.com/v2/movie/top250?count=3'];
    Promise.all(url.map((url)=>{return self.httpGet(url)})).then(([response,response2,response3])=>{
      self.loading({tip:'完毕...',type:'close'});
      self.films=response.data.subjects;
      self.films2=response2.data.subjects;
      self.films3=response3.data.subjects;
    }).catch();*/


  },
  methods:{
    showConfirm(){
      this.confirm('马上就能看到点击的结果了！你确定吗?').then((result)=>{
        console.log(result);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
