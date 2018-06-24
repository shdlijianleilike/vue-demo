import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);
export default new vuex.Store({
  state:{
    header:{
      title:'首页',
      show:true
    },
    footer:{
      tabar:[{
        id:'0',
        name:'首页',
        icon:'',
        url:'/home',
        selected:true
      },{
        id:'1',
        name:'电影',
        icon:'',
        url:'/films',
        selected:false
      },{
        id:'2',
        name:'好友',
        icon:'',
        url:'/friends',
        selected:false
      },{
        id:'3',
        name:'我的',
        icon:'',
        url:'/my',
        selected:false
      }],
      show:true
    }
  },
  mutations:{
    hideNav(state) {
      state.header.show = false;
    },
    hideToolbar(state) {
      state.footer.show = false;
    },
    hideBar(state) {
      state.header.show = false;
      state.footer.show = false;
    },
    showNav(state) {
      state.header.show = true;
    },
    showToolbar(state) {
      state.footer.show = true;
    },
    showBar(state) {
      state.header.show = true;
      state.footer.show = true;
    },
    /*setBar(state,option) { //option --?path?index?
      if(typeof option == 'number') {
        state.footer.tabar.forEach((tab,index) => {
          if(index == option) {//0123
            tab.selected = true;
            state.header.title = tab.name;
          }else {
            tab.selected = false;
          }

        })
      }else {//path
        state.footer.tabar.forEach(tab => {
          if(tab.url == option) {
            tab.selected = true;
            state.header.title = tab.name;
          }else {
            tab.selected = false;
          }

        })
      }

    }*/
  },
  actions:{

  }
});
