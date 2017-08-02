$(function () {
  FastClick.attach(document.body);
});

var value;
var tap = "";
// popupPicker 配置
var popupPicker;
popupPicker1 = new mui.PopPicker({
  layer: 1
});
popupPicker2 = new mui.PopPicker({
  layer: 2
});
//
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


function gearPopup(data,id,colNum){
  if(data == null) {
    campus.tips("暂无数据，请稍后再试！");
  }else{
    var col = colNum || 2;
    // popupPicker = new mui.PopPicker({
    //   layer: col
    // });
    picker = col == 2?popupPicker2 : popupPicker1;

    picker.setData(data);
    var floorButton = document.getElementById(id);
    var floorValuer = floorButton.querySelector('h3');

    picker.show(function(items) {
      // 判断，如果点击确定时过快而导致无法正确选择到值，会返回undefined；
      // 重新赋值；
      var t1 = items[0].text || " ";
      var t2 = (col == 2?items[col-1].text:"") || " ";
      floorValuer.innerText = t1 + " " + t2;
      
      //返回 false 可以阻止选择框的关闭
      // return false;
      // 改变确认按钮颜色
      if (t1){
        $(floorValuer).attr("select", true);
      }
      if ($("*[select=true]").length == $(".smart-list-item").length) {
        $(".smart-btn").removeAttr("disabled").addClass("smart-btn-active");
      }
    });
  }
}

$(".smart-list-item").on("click",function(){  var type = $(".smart-list-end-icon",this).attr("set-type");
  var id = $(".smart-list-end-icon",this).attr("id");
  var colNum = 1;
  var data;
  switch (type){
    case "floor":
      data = [{value:"1",text:"南区",children:[{value:"1001",text:"公寓楼01"},{value:"1001",text:"超级公寓楼02"},{value:"1001",text:"超超级公寓楼03"},{value:"1001",text:"超超超级公寓楼04"},{value:"1001",text:"超超超超级公寓楼05"},{value:"1001",text:"超超超超超级公寓楼06"},{value:"1001",text:"超超超超超超级公寓楼07"}]},{value:"2",text:"北区",children:[{value:"1001",text:"北区公寓楼01"},{value:"1001",text:"北区公寓楼02"},{value:"1001",text:"北区公寓楼03"},{value:"1001",text:"北区公寓楼04"},{value:"1001",text:"北区公寓楼05"},{value:"1001",text:"北区公寓楼06"},{value:"1001",text:"北区公寓楼07"},{value:"1001",text:"北区公寓楼08"}]},{value:"3",text:"东区",children:[{value:"1001",text:"东区公寓楼01"},{value:"1001",text:"东区公寓楼02"},{value:"1001",text:"东区公寓楼03"},{value:"1001",text:"东区公寓楼04"},{value:"1001",text:"东区公寓楼05"},{value:"1001",text:"东区公寓楼06"},{value:"1001",text:"东区公寓楼07"},{value:"1001",text:"东区公寓楼08"}]},{value:"3",text:"西区",children:[{value:"1001",text:"西区公寓楼01"},{value:"1001",text:"西区公寓楼02"},{value:"1001",text:"西区公寓楼03"},{value:"1001",text:"西区公寓楼04"},{value:"1001",text:"西区公寓楼05"},{value:"1001",text:"西区公寓楼06"},{value:"1001",text:"西区公寓楼07"},{value:"1001",text:"西区公寓楼08"}]}];
      colNum = 2;
    break;
    case "layer":
      data = [{value:"1",text:"1楼"},{value:"2",text:"2楼"},{value:"3",text:"3楼"},{value:"4",text:"4楼"},{value:"5",text:"5楼"},{value:"6",text:"6楼"}];
    break;
    case "room":
      data = [{value:"001",text:"001房间"},{value:"002",text:"002房间"},{value:"003",text:"003房间"},{value:"004",text:"004房间"},{value:"005",text:"005房间"},{value:"006",text:"006房间"}];
    break;
    case "bed":
      data=[{value:"1",text:"1床位"},{value:"2",text:"2床位"},{value:"3",text:"3床位"},{value:"4",text:"4床位"},{value:"5",text:"5床位"},{value:"6",text:"6床位"}];
    break;
  }
  gearPopup(data,id,colNum);
})

// =======================================================================
// 点击确认按钮 跳转页面并传值
$(".campus-index button").on("click",function(){
  if($(this).hasClass("smart-btn-active")){
    var value = [];
    $.each($(".smart-list-end-icon"),function(i,e){     
      value[value.length] = $(e).attr("set-type") + "=" + $("h3",e).text();
    });
    window.location.href = "edit.html?" + encodeURI(value.join("&"));
  }
})
// 获取页面传参
function getValue(url){  
	//首先获取地址  
	var url = url || window.location.href;  
	//获取传值  
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