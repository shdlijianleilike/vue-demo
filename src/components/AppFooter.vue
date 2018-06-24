<template>
  <footer>
    <ul class="footer">
      <li v-for="(item,index) in $store.state.footer.tabar" :class="{current:item.selected}">
        <router-link :to="item.url">
          <div>
            <i></i>
            <span>{{item.name}}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
    export default {
      name:'',
      data() {
        return {}
      },
      methods:{

      }

    }
</script>

<style scoped lang="less">
  @import "../css/calc.less";

  footer {
    ul {
      position:fixed;
      left:0;
      bottom:0;
      width: 100%;
      .px2rem(height,98px);
      background-color:@nice-blue;
      display: flex;
      justify-content: space-around;
      align-items: center;
      list-style: none;
      z-index:9994;
      li {
        span {}
      }
      li.current {
        span {color:#fff;}
      }
    }
  }
</style>
