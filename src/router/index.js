import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/pages/PageHome'
import PageFilms from '@/pages/PageFilms'
import PageFriends from '@/pages/PageFriends'
import PageMy from '@/pages/PageMy'
import FilmsListA from '@/components/FilmsListA'
import PageLogin from '@/pages/PageLogin'
import FilmDetail from '@/components/FilmDetail'

Vue.use(Router);

/*function load(componentName,path){
  return new Promise(function(resolve,reject){
    var script=document.createElement('script');
    script.src=path;
    script.async=true;
    script.onload=function(){
      var component=Vue.component(componentName);
      if(component){
        resolve(component);
      }else{
        reject();
      }
    };
    script.onerror=reject;
    document.body.appendChild(script);

  });

}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: function (resolve, reject) {
        load('cmd','../components/cmd.js').then(resolve,reject);
      }
    },
    {
      path: '/Films',
      name: 'Films',
      component: Films
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends
    },
    {
      path: '/my',
      name: 'my',
      component: my
    }
  ]
})*/

export default new Router({
  //mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: PageHome,
      children:[
        {
          path:'',
          redirect:'A'
        },
        {
          path:'A',
          component:function(resolve){
            require(['@/components/AsyncA'],resolve);
          }
        },
        {
          path:'B',
          component:function(resolve){
            require(['@/components/AsyncB'],resolve);
          }
        },
        {
          path:'C',
          components:{
            default:function(resolve){
              require(['@/components/AsyncC'],resolve);
            },
            v1:function(resolve){
              require(['@/components/AsyncC2'],resolve);
            }
          }
        }
      ]
    },
    {
      path: '/films',
      name: 'films',
      component: PageFilms,
      children:[
        {
          path:'',
          redirect:'listA'
        },
        {
          path:'listA',
          component:FilmsListA
        },
        {
          path:'listB',
          component:function(resolve){
            require(['@/components/FilmsListB'],resolve);
          }
        },
        {
          path:'listC',
          component:function(resolve){
            require(['@/components/FilmsListC'],resolve);
          }
        },
        {
          path:'detail/:film',
          name:'detail',
          component:FilmDetail
        }
      ]
    },
    {
      path: '/friends',
      name: 'friends',
      component: PageFriends,
      beforeEnter (to, from, next){
        console.log('路由内导航首位：'+to.path);
        next();
      }

    },
    {
      path: '/my',
      name: 'my',
      component: PageMy
    },
    {
      path:'/login',
      name:'pageLogin',
      component:PageLogin
    }
  ]
})

