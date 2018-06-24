<template>
  <div>
    <ul>
      <li v-for="(item,index) in films">
        <div @click="showDetail(item)">
          <img :data-src="item.images.small" src="@/assets/images/loading.gif" :alt="item.alt"/>
          <div>
            <h5>{{item.title}}</h5>
            <i v-for="type in item.genres">[{{type}}]</i>
            <p>年份:{{item.year}}</p>
            <span>总点击数：{{item.collect_count}}</span>
          </div>

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
        let self=this;
        this.loading();
        this.httpGet('https://api.douban.com/v2/movie/top250?count=50').then((response)=>{
          this.closeLoad();
          this.films=response.data.subjects;
          this.$nextTick(()=>{
            let imgs = document.querySelectorAll('img');
            self.lazyLoad(imgs);
            window.onscroll = function () {
              self.lazyLoad(imgs);
            }
          })
        });

      },
      methods:{
        //offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
        getTop(e) {
          var T = e.offsetTop;
          while(e = e.offsetParent) {
            T += e.offsetTop;
          }
          return T;
        },
        lazyLoad(imgs) {
            let self=this,
                S = document.documentElement.scrollTop || document.body.scrollTop,  //滚动条滚过高度
                H = window.innerHeight;  //浏览器视窗高度
            [].forEach.call(imgs, function (img) {
                if (!img.getAttribute('data-src')) {
                    return
                }  //已经替换过的跳过
                if (H + S > self.getTop(img)) {    //为达到演示效果，这里H+S减去200，延后加载时机
                    img.src = img.getAttribute("data-src");
                    img.removeAttribute("data-src");
                }
            });
            [].every.call(imgs, function (img) {
                return !img.getAttribute('data-src')
            }) && (window.removeEventListener("scroll", self.lazyLoad, false));   //完成所有替换后注销事件

        },
        showDetail(item) {
          this.$router.push({name:'detail',params:{film:JSON.stringify(item)}});
        }


      }

    }
</script>

<style scoped lang="less">

  div {
    ul{
      li{
        margin:10px;
        >div{
          display:flex;
          border:1px solid #ccc;
          box-shadow: 5px 5px 15px #e8dcdc;
          img {width:30%;height:30%;}
          div {
            width:70%;
            padding:10px;
            * {}
          }
        }
      }
    }
  }
</style>
