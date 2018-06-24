var MyPlugin={};

MyPlugin.install=function(Vue,options){
  Vue.prototype.httpGet=function (url) {
    return new Promise(function(resolve,reject){
      Vue.http.jsonp(url).then(response => {
        // get body data
        resolve(response);
      }, response => {
        //Vue.toast('服务器繁忙！');
        reject();
      });
    });
  }
}

/*function httpGet(url){

}*/






export default MyPlugin


