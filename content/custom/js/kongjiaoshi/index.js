$(function () {
  FastClick.attach(document.body);
});

var value;
$(".smart-list-item div[set-type]").on("click", function () {
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

  campus.popup(newArr, function (data) {
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

$(".smart-container-sure-btn").on("click", function () {

})

// 滑动效果
var startX, startY, endX, endY;
$(window).on("touchstart", function (e) {

  startY = e.changedTouches[0].pageY;
  startX = e.changedTouches[0].pageX;
}).on("touchmove", function (e) {

  endY = e.changedTouches[0].pageY;
  endX = e.changedTouches[0].pageX;
}).on("touchend", function (e) {

  endY = e.changedTouches[0].pageY;
  endX = e.changedTouches[0].pageX;

  console.log(endY - startY);
  var Y = endY - startY;
  var X = endX - startX;
  if (X == 0) {
    // 点击无效果
    console.log("点击无效果");
  } else if (Y > 0 && Math.abs(Y) > 0) {
    // 向下
    console.log("向右");
  } else if (Y < 0 && Math.abs(Y) > 0) {
    // 向上
    console.log("向左");
  }

  if (Y == 0) {
    // 点击无效果
    console.log("点击无效果");
  } else if (Y > 0 && Math.abs(Y) > 0) {
    // 向下
    console.log("向下");
  } else if (Y < 0 && Math.abs(Y) > 0) {
    // 向上
    console.log("向上");
  }
})

$.fn.swipe = function (option) {
  // console.log(value);
  var defaults  = {
    swipeUp : function(){
      console.log("swipeUp");
    },
    swipeDown : function(){
      console.log("swipeDown");
    },
    swipeLeft : function(){
      console.log("swipeLeft");
    },
    swipeRight : function(){
      console.log("swipeRight");
    }

  }

  var obj = $.extend(defaults,option);
  // this.swipeUp = function(){
  //   console.log("swipeUp");
  // }

  // this.swipeDown = function(){
  //   console.log("swipeDown");
  // }

  // this.swipeLeft = function(){
  //   console.log("swipeLeft");
  // }

  // this.swipeRight = function(){
  //   console.log("swipeRight");
  // }
  // callback(obj);
  return obj;
}
// console.log($(window).swipe({
//   swipeUp:function(){
//     console.log(0)
//   }
// }))
$(window).swipe({
  swipeUp: function () {
    console.log("swipeDown");
  },
  swipeDown: function () {
    console.log("swipeDown");
  }
})

