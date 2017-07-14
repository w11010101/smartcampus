$(function () {
  FastClick.attach(document.body);
});

var value;
var tap = "";

function contains(needle) {
  for (i in this) {
    if (this[i].indexOf(needle) > 0) return i;
  }
  return -1;
}

var device_type = navigator.userAgent;
var md = new MobileDetect(navigator.userAgent);
var phone = md.phone(); //获取系统  
var model = "";
if (phone == "UnknownPhone") { //位置手机型号处理
  model = md.mobile();
  tap = "touchstart";
} else {
  tap = "click";
}
// =======================================================================
//级联示例
var popupPicker = new mui.PopPicker({
	layer: 2
});
var data1=[{value:"1",text:"南区",children:[{value:"1001",text:"公寓楼01"},{value:"1001",text:"超级公寓楼02"},{value:"1001",text:"超超级公寓楼03"},{value:"1001",text:"超超超级公寓楼04"},{value:"1001",text:"超超超超级公寓楼05"},{value:"1001",text:"超超超超超级公寓楼06"},{value:"1001",text:"超超超超超超级公寓楼07"}]},{value:"2",text:"北区",children:[{value:"1001",text:"北区公寓楼01"},{value:"1001",text:"北区公寓楼02"},{value:"1001",text:"北区公寓楼03"},{value:"1001",text:"北区公寓楼04"},{value:"1001",text:"北区公寓楼05"},{value:"1001",text:"北区公寓楼06"},{value:"1001",text:"北区公寓楼07"},{value:"1001",text:"北区公寓楼08"}]},{value:"3",text:"东区",children:[{value:"1001",text:"东区公寓楼01"},{value:"1001",text:"东区公寓楼02"},{value:"1001",text:"东区公寓楼03"},{value:"1001",text:"东区公寓楼04"},{value:"1001",text:"东区公寓楼05"},{value:"1001",text:"东区公寓楼06"},{value:"1001",text:"东区公寓楼07"},{value:"1001",text:"东区公寓楼08"}]},{value:"3",text:"西区",children:[{value:"1001",text:"西区公寓楼01"},{value:"1001",text:"西区公寓楼02"},{value:"1001",text:"西区公寓楼03"},{value:"1001",text:"西区公寓楼04"},{value:"1001",text:"西区公寓楼05"},{value:"1001",text:"西区公寓楼06"},{value:"1001",text:"西区公寓楼07"},{value:"1001",text:"西区公寓楼08"}]}];
function gearPopup(data){
  popupPicker.setData(data);
  var floorButton = document.getElementById('picker1');
  var floorValuer = document.querySelector('h3');
  floorButton.addEventListener('tap', function(event) {
    popupPicker.show(function(items) {
      floorValuer.innerText = items[0].text + " " + items[1].text;
      //返回 false 可以阻止选择框的关闭
      // return false;
    });
  }, false);
}


// =======================================================================
// 获取页面传参
function getValue(url){  
	//首先获取地址  
	var url = url || window.location.href;  
	//获取传值  
	console.log(url);
	var arr = url.split("?");  
	//判断是否有传值  
	if(arr.length == 1){  
	    return null;  
	}  
	//获取get传值的个数  
	var value_arr = arr[1].split("&");  
	//循环生成返回的对象  
	var obj = {};  
	for(var i = 0; i < value_arr.length; i++){  
	    var key_val = value_arr[i].split("=");  
	    obj[key_val[0]]=key_val[1];  
	}  
	return obj;  
} 