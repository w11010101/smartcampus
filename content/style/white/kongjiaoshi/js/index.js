$(function () {
  FastClick.attach(document.body);
});

var value;
var tap="";

function contains (needle) {  
	for (i in this) {  
	  if (this[i].indexOf(needle) > 0)  return i;  
	}  	
	return -1;  
}  

var device_type = navigator.userAgent;

var md = new MobileDetect(navigator.userAgent);  
var phone = md.phone();//获取系统  
var model = "";  
// alert(phone);
if (phone == "UnknownPhone") {//位置手机型号处理
    model = md.mobile();  
    tap = "touchstart";
} else {
    tap = "click";
}  

$(".smart-list-end-icon").on(tap,function () {
console.log(this);
var that = $(this);
var type = $(this).attr("set-type");
var setArr = [];
var newArr = [];
switch (type) {
case "time":
    // 选择时间
    setArr = ["1小时后", "2小时后", "3小时后", "4小时后", "8小时后"];
    newArr = setArr;
    break;
case "campus":
    // 选择校区
    // setArr = [{name:"东校区",id:"123"},{name:"南校区",id:"12"},{name:"西校区",id:"12"},"北校区"];
    setArr = [{
      "campusid": "1",
      "campusname": "东校区"
    }, {
      "campusid": "2",
      "campusname": "西校区"
    }, {
      "campusid": "3",
      "campusname": "南校区"
    }, {
      "campusid": "4",
      "campusname": "北校区"
    }];
    for (var i in setArr) {
      newArr.push({
        key: setArr[i].campusid || setArr[i].buildid,
        name: setArr[i].campusname || setArr[i].buildname
      })
    }

    break;
case "floor":
    // 选择楼栋
    setArr = [{
      "campusid": "1",
      "buildid": "11",
      "buildname": "东区1号楼"
    }, {
      "campusid": "1",
      "buildid": "12",
      "buildname": "东区2号楼"
    }, {
      "campusid": "1",
      "buildid": "13",
      "buildname": "东区3号楼"
    }, {
      "campusid": "1",
      "buildid": "14",
      "buildname": "东区4号楼"
    }];
    for (var i in setArr) {
      newArr.push({
        key: setArr[i].campusid || setArr[i].buildid,
        name: setArr[i].campusname || setArr[i].buildname
      })
    }
    break;
}

var option = {
    value:newArr,
    type:$(this).attr("popupType"),cancel:true
}
campus.popup(option, function (data) {
    console.log(data);
    // 添加自定义属性
    that.find(".mart-list-layer-2").html('<h3 key="' + data.key + '">' + data.name + '</h3>');
    that.attr("select", true);
    // 删除重复的蓝色标签
    $.each($(".campus-index-screen-title em"), function (i, e) {
        if ($(e).attr("label-type") == type) {
          $(e).remove();
        }
      })
      // 添加蓝色标签
    $(".campus-index-screen-title").prepend('<em class="campus-index-screen-label" label-type="' + type + '">' + data.name + '</em>');
    // 改变确认按钮颜色
    if ($("*[select=true]").length == 3) {
      $(".smart-container-sure-btn").addClass("smart-btn-active");
    }
});
})

