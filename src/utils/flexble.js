//动态调整rem值,除以50
function setsize() {

  //var scale = 1 / devicePixelRatio;
  //document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  //document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';

 var winW = document.documentElement.clientWidth,
  	  winH = document.documentElement.clientHeight,
    baseWidth = 750,
	  baseFontSize = baseWidth/10,//1rem = 75px
	  deviceWith = Math.min(winW, winH);
  if (deviceWith > 560) {
	deviceWith = 560;
  }
  if (deviceWith < 270) {
	deviceWith = 270;
  }
  var _html = document.getElementsByTagName('html')[0];
  _html.style.fontSize =deviceWith * baseFontSize / baseWidth  + 'px';
  console.log('***项目初始设置font-size='+deviceWith * baseFontSize / baseWidth +'px\ndevice-width='+document.documentElement.clientWidth);
}
setsize();
