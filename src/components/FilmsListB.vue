<template>
  <div>
    <ul>
      <li v-for="(item,index) in films">
        <div @click="showDetail(item)">
          <div class="img_cover">
            <img :data-src="item.images.small" src="@/assets/images/loading.gif" :alt="item.alt"/>
          </div>
          <h5>{{item.title}}</h5>
          <i v-for="type in item.genres">[{{type}}]</i>
          <p>年份:{{item.year}}</p>
          <span>总点击数：{{item.collect_count}}</span>
        </div>

      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        films:[]
      }
    },
    mounted(){
      this.loading();
      this.httpGet('https://api.douban.com/v2/movie/top250?count=50').then((response)=>{
        this.closeLoad();
        this.films=response.data.subjects;
        this.$nextTick(()=>{
          let self=this;
          let imgs=document.querySelectorAll('img');
          this.lazyLoad(imgs);
          window.onscroll=function(){
            self.lazyLoad(imgs);
          };
        });
      });
    },
    methods:{
      lazyLoad(imgs){
        let self=this,
          S=document.documentElement.scrollTop||document.body.scrollTop,
          H=window.innerHeight;
        imgs.forEach(function(img){
          if(!img.getAttribute('data-src')) return;
          if(S+H > self.getTop(img)){
            img.src=img.getAttribute('data-src');
            img.removeAttribute('data-src');
          }

        });
        [].every.call(imgs,function(img){
          return !img.getAttribute('data-src');
        }) && document.removeEventListener('scroll',self.lazyLoad,false);
//        imgs.every(function(img){//imgs是nodeList类型。没有数组的原型方法every(),所以用call
//          return !img.getAttribute('data-src');
//        })&&document.removeEventListener('scroll',self.lazyLoad,false);

      },
      getTop(el){
        let T=el.offsetTop;
        //console.log('el='+el+'\n'+'T1='+T);
        while (el = el.offsetParent){
          //console.log('offsetParent='+el.offsetParent);
          T+=el.offsetTop;
        }
        //console.log('T2='+T);
        return T;
      },
      showDetail(item) {
        this.$router.push({name:'detail',params:{film:JSON.stringify(item)}});
      }
    }

  }
</script>

<style scoped lang="less">
 ul {
   li {
     margin:10px 0;
     .img_cover {
       position:relative;
       padding-top:150%;
       height:0;
       overflow: hidden;
       img {
         position:absolute;
         top:0;
         left:0;
         width:100%;
       }
     }
   }
 }
</style>
