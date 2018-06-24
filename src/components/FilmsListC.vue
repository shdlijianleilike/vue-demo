<template>
  <div class="page">
    <div class="outerScroller">
      <ul class="scroll">
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
        this.loadData();
        this.touchRefresh();
      },
      methods:{
        loadData(){
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

        touchRefresh(){
          let self=this,
            S = document.documentElement.scrollTop || document.body.scrollTop,  //滚动条滚过高度
            H = window.innerHeight;  //浏览器视窗高度
          let imgs = document.querySelectorAll('img');
          var scroll = document.querySelector('.scroll');
          var outerScroller = document.querySelector('.outerScroller');
          var touchStart = 0;
          var touchDis = 0;
          outerScroller.addEventListener('touchstart', function(event) {
            var touch = event.targetTouches[0];
            // 把元素放在手指所在的位置
            touchStart = touch.pageY;
            console.log('touchStart='+touchStart);
          }, false);
          outerScroller.addEventListener('touchmove', function(event) {
            var touch = event.targetTouches[0];
            console.log('touchmove='+touch.pageY + 'px');
            scroll.style.top = scroll.offsetTop + touch.pageY-touchStart + 'px';
            console.log('scroll.style.top='+scroll.style.top);
            touchStart = touch.pageY;
            touchDis = touch.pageY-touchStart;
            self.lazyLoad(imgs);
          }, false);
          outerScroller.addEventListener('touchend', function(event) {
            touchStart = 0;
            var top = scroll.offsetTop;
            console.log('最终top='+top);
            if(top>70)self.loadData();
            if(top>0){
              var time = setInterval(function(){
                scroll.style.top = scroll.offsetTop -2+'px';
                if(scroll.offsetTop<=0)clearInterval(time);
              },1)
            }
            if(top < 0) {
              if(Math.abs(top-H) > parseInt(scroll.style.height)) {
                alert('done');
              }
            }
          }, false);
        },

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
  @import "../css/calc.less";

  div.page {
    position:relative;
    top:0;
    .outerScroller {
      position: absolute;
      //.px2rem(top,112px);
      bottom:0px;
      width:100%;
      left:0px;

      ul.scroll{
        width:100%;
        margin-top:0px;
        position: absolute;
        left:0px;
        padding:0px;
        top:0px;
        /*::-webkit-scrollbar {
          width: 5px;
          height: 5px;
          background-color: #F5F5F5;
        }

        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 2.5px rgba(0, 0, 0, 0.3);
          box-shadow: inset 0 0 2.5px rgba(0, 0, 0, 0.3);
          border-radius: 2.5px;
          background-color: #f5f5f5;
        }

        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 2.5px rgba(0, 0, 0, .3);
          box-shadow: inset 0 0 2.5px rgba(0, 0, 0, .3);
          border-radius: 2.5px;
          background-color: #6e8029;
          opacity: .7;
          transition: opacity ease-in-out 200ms;
        }

        ::-webkit-scrollbar-thumb:hover {
          opacity: 1;
        }*/

        li{
          margin:10px;
          >div{
            display:flex;
            border:1px solid #ccc;
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
  }



</style>
