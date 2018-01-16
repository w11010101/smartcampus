
var app = new Vue({
    el: '#app',
    data: {
        active:"active",
        wrapper:'wrapper_page_',
        scroller:'scroller_page_',
        _defualtImg: "../../content/style/white/yingyongqingdan/images/defualt.png",
        newApps: "",
        tabs: "",
        slides:{},
        tabActive:0,
    },
    watch: {
        // 监听
        newApps: function(val) {
            scrollComputed('wrapper-new-apps', '#scroller-new-apps', app.newApps.length,170);
        },
        tabs:function(val) {
          scrollComputed('wrapper-tabs', '#scroller-tabs', app.tabs.length,$(document).width()/4);
          setTimeout(function(){
              $(".tabs a").css("width",$(document).width()/4);
              runTabSwiper();
              runWrapperPages();
          },100);
        },
        slides:function (val) {
          setTimeout(function(){
            $(".foot-tips").eq(app.tabActive).fadeIn(200,function(){
              scrollObjArr[app.tabActive].refresh();
            });
          },200);
        }
    },
    computed: {
        // 计算
    },
    methods: {
        // 绑定事件的方法
        // post ajax
        postAjaxData: function(option, successCB, failCB) {
            $.ajax({
                type: "POST",
                url: option.url,
                data: option.data,
                dataType: "json",
                success: function(data) {
                    successCB(data);
                },
                error: function(err) {
                    failCB(err);
                }
            })
        },
        // // tab 滑动触发加载列表
        postTabList:function(data){
          // post slides
          this.postAjaxData({
              url:'http://172.16.15.99:3001/',
              data:data
          },function (data) {
              $(".smart-loading").hide(0);
              console.log("success")

          },function(err) {
              $(".smart-loading").hide(0);
              console.log("error");
              var list = data.type =="slides"?slides:slides1;
              if(tabsSwiperObjArr["tab"+app.tabActive]){
                // 加载第N页
                console.log("加载下一页");
              }else{
                tabsSwiperObjArr["tab"+app.tabActive] = list.data;
              }
              // 用data.js 中的数据对象；
              app.$set(app.slides,"tab"+app.tabActive,tabsSwiperObjArr["tab"+app.tabActive]);
              
          });
        }
    }
});

// $(function(){
//   // 页面传值判断 tab标签位置
//   function getQueryString(name) {
//     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) {
//         return unescape(r[2]);
//     }
//     return null;
//   }
//   for(var e of $(".tabs a")){
//     if(getQueryString("index") == $(e).attr("tabName")){
//       $(".tabs .active").removeClass('active');
//       $(e).addClass('active');
//       tabsSwiper.swipeTo($(e).index(),0);
//     }
//   }
// })