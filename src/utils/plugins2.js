import v from 'vue'

var showCover = false,
	coverExp;

var cover = function(o) {
  var o = o || {};
  if (o.type == 'close'){
    if (showload || toastArr.length) return; // 如果还有loading或者toast则不关闭cover
    coverExp.isCovering = showCover = false;
    return;
  }
  if (showCover) return;
  let cover = v.extend({
    data() {
      return {isCovering: false}
    },
    template: '<div v-if="isCovering" class="cover-box-container"></div>'
  });
  coverExp = new cover();
  let tpl = coverExp.$mount().$el;
  document.body.appendChild(tpl);
  coverExp.isCovering = showCover = true;

}
var closeCover = function(){
  cover({type: 'close'});
}

//遮罩
let showload = false,
  loadExp;
var LoadPlugin = {
  install(Vue,options) {
    Vue.prototype.loading = function(o) {
      var o = o || {};
      var tip = o.tip || 'loading';
      if(o.type == 'close'){
        loadExp.isLoading = showload = false;
        closeCover();//cover({type:'close'});
        return;
      }
      if(showload) return;
      let Loading = Vue.extend({
        data(){
          return {isLoading:showload}
        },
        template:'<div v-if="isLoading" class="load-box"><p>' + tip + '</p></div>',
      });
      loadExp = new Loading();
      var tpl = loadExp.$mount().$el;
      document.body.appendChild(tpl);
      loadExp.isLoading = showload = true;
      cover();
    }
    Vue.prototype.closeLoad = function(o) {
      this.loading({type: 'close'});
    }
  }
};

//Toast
let showToast = false;
let toastArr = [];
var ToastPlugin = {
  install(Vue,options) {
    Vue.prototype.toast = function (o) {
      var o = o || {};
      var tip = o.tip ||'message';
      //是否已经显示
      if (options && options.unique && showToast) return;
      let Toast = Vue.extend({
        data() {
          return {isToast:false}
        },
        template:'<div v-if="isToast" class="toast-box"><p>' + tip + '</p></div>',
      });

      let toastExp = new Toast();
      var tpl = toastExp.$mount().$el;
      document.body.appendChild(tpl);
      toastExp.isToast = showToast = true;
      toastArr.push(toastExp);
      cover();
      setTimeout(()=>{
        toastExp.isToast = showToast = false; toastArr.shift(); closeCover();
      }, o.time || 2000);
    };
  }
};

//Confirm
let showConfirm = false,
  confirmExp;
var ConfirmPlugin = {
  install(Vue,options){
    Vue.prototype.confirm = function(o) {
      var o = o || {};
      var tip = o.tip||'msg';
      if(typeof o == 'string') tip = o;
      if(showConfirm) return;
      return new Promise(function(resolve,reject) {
        let Confirm = Vue.extend({
          data(){
            return {isConfirming:showConfirm}
          },
          template:'<div v-if="isConfirming" class="confirm-box"><p>'+ tip +'</p><div class="btn-box"><button @click="OK_fn">OK</button><button @click="Cancel_fn">Cancel</button></div></div>',
          methods:{
            OK_fn(){
              closeCover();
              confirmExp.isConfirming = showConfirm = false;
              resolve(true);
            },
            Cancel_fn(){
              closeCover();
              confirmExp.isConfirming = showConfirm = false;
              resolve(false);
            }
          }
        });
        confirmExp = new Confirm();
        var tpl = confirmExp.$mount().$el;
        document.body.appendChild(tpl);
        confirmExp.isConfirming = showConfirm = true;
        cover();
      });
    }
  }
};

var delayPlugin = {
  install(Vue,options){
    Vue.prototype.delay = function(time) {
      return new Promise(function(resolve,reject) {
        setTimeout(resolve,time || 0);
      });
    }
  }
};

export {ToastPlugin}
export  {LoadPlugin}
export  {delayPlugin}
export {ConfirmPlugin}
