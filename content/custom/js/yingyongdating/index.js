var app = function () {
  this.myScroll = "";
  var sortableArr = [];


  var that = this;
  // 获取id
  this.byId = function (id) {
    return document.getElementById(id);
  };
  // 遍历
  this.boxEach = function () {
    $.each($(".box"), function (i, e) {
      sortableArr.push({
        name: $(e).find("ul").attr("name")
      })
    })
    return sortableArr;
  };
  // 调用拖动组件
  this.sortableStart = function (arr) {
      var that = Sortable.create(this.byId('advanced-1'));
      return that;
    }
    // 默认行为
  this.setDefault = function (e) {
    e.preventDefault();
  };
  // iscroll
  this.scrollStart = function scrollStart() {
    this.myScroll = new IScroll('#wrapper');
    document.addEventListener('touchmove', this.setDefault, that.isPassive() ? {
      capture: false,
      passive: false
    } : false);
  };
  this.isPassive = function () {
      var supportsPassiveOption = false;
      try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
          get: function () {
            supportsPassiveOption = true;
          }
        }));
      } catch (e) {}
      return supportsPassiveOption;
    }
    // 调用拖动组件
  this.sortableStart = function (arr) {
      var that = Sortable.create(this.byId('advanced-1'));
      return that;
    }
    // 设置top
  this.getTop = function (type) {
    return $("#advanced")[0].clientHeight + $(".smart-search")[0].clientHeight + 45;
    // return $("#box-1")[0].clientHeight + (!type?$(".smart-search")[0].clientHeight:0) + 45;
  }
  // scorllTop
  this.scrollTo = function(){
    $("#advanced-1").scrollTop($("#advanced-1")[0].scrollHeight);
  }
  // 重置iscroll
  this.refresh = function(type){

    $(".tool-box").css("top",this.getTop());
    type && true;
    if(type){
      setTimeout(function(){
        console.log(1);
        that.myScroll.refresh();
      },500);
    }
  }
}
var app = new app();
