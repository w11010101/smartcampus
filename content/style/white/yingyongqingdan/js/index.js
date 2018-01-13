/**
 * [postNewApps 页面onload，运行ajax]
 * @return {[type]} [description]
 */
function postList(){
    // post newApp
    app.postAjaxData({
        url:'http://172.16.15.99:3001/',
        data:{
          type:"newapp"
        }
    },function (data) {
        // console.log(data)
        app.newApps = data.data
    },function(err) {
        // 用data.js 中的数据对象；
        app.newApps = newapps.data;
        console.log("error = " ,err);
    });
    // post tabs
    app.postAjaxData({
        url:'http://172.16.15.99:3001/',
        data:{
          type:"tabs"
        }
    },function (data) {
        app.tabs = data.data;
    },function(err) {
        // 用data.js 中的数据对象；k
        app.tabs = tabs.data;
        console.log("error = " ,tabs.data);
    });
    // 加载第一个tab里的列表
    app.postTabList({type:"slides"});wa
}
/**
 * [scrollComputed 横向滚动]
 * @param  {[String]} obj    [传#wrapper-new-apps]
 * @param  {[String]} scroll [传#scroller-new-apps]
 * @param  {[Number]} length [数据length]
 * @param  {[Number]} width  [width]
 * @return {[type]}        [description]
 */
var scrollComputedObjArr = [];
function scrollComputed(obj,scroll,length,width) {
    // 计算左右滑动最大宽度
    document.querySelector(scroll).style.width = length * width + "px";
    var myScroll;
    myScroll = new iScroll(obj,{
        hScrollbar:false,
        onBeforeScrollStart:function(event){
            console.log(event.target)
        }
    });
    scrollComputedObjArr.push(myScroll);
    var wrapper = document.querySelector("#"+obj);
    wrapper.parentElement.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, {
        passive: false
    });
}
// ****************************** swiper start ******************************
// tabsSwiperObjArr 选项卡数据集合
var tabsSwiperObjArr = [];
function runTabSwiper(){
    // 启动swiper
    var beforeIndex = 0;
    var tabsSwiper = new Swiper('.swiper-container', {
        speed: 500,
        moveStartThreshold: 100,
        onSlideChangeStart: function(event) {
            // 切换tab后触发事件
            // 设置tab切换后样式
            
            var index = tabsSwiper.activeIndex;
            var thisWrapper = $("[id*='wrapper_page_']").eq(index);
            $(".tabs .active").removeClass('active');
            $(".tabs a").eq(index).addClass('active');
            scrollState = true;
            // 判断当前tab内的li 长度，如果没有，则加载；
            if(thisWrapper.find("li").length <=0){
                $(".smart-loading").show(0);
                // 加载列表
                
                if(tabsSwiperObjArr[index]){
                    console.log("tabsSwiperObjArr里 有了");
                    app.tabActive = index;
                    app.slides = tabsSwiperObjArr;
                }else{
                    // 如果集合不存在，就请求
                    console.log("tabsSwiperObjArr里 没有了");
                    app.tabActive = index;
                    app.postTabList({type:"slides1"});
                }
            }
            scrollObjArr[index].refresh();
            // console.log('$(".tabs .active").offset().left = ', $(".tabs .active").offset().left);
            if($(".tabs .active").offset().left >= $(document).width()){
                // console.log(`当前是第${index}页`);
                scrollComputedObjArr[1].scrollTo(-$(".tabs a").width()*(index-3),0,500);
            }else if($(".tabs .active").offset().left < 0){
                // console.log(`!当前是第${index}页`);
                scrollComputedObjArr[1].scrollTo(-$(".tabs a").width()*index,0,500);

            }
        }
    });
    $(".tabs a").eq(0).addClass("active");
    // tab点击切换事件
    $(".tabs a").on('click',function(e) {
        e.preventDefault();
        $(".tabs .active").removeClass('active');
        $(this).addClass('active');
        tabsSwiper.swipeTo($(this).index());
        scrollState = true;
    });
}

// ****************************** scroll 事件 ******************************
var scrollObjArr = [];
var scrollState = true;
function runWrapperPages(){
    $.each($('[id*="wrapper_page_"]'), function(i, e) {
        var _this = $("#" + e.id);
        // 初始化为每个tab添加滑动的页数
        _this.attr("pages", 1);
        // 初始化为每个tab添加滑动加载事件
        var scrolls = refresher.init({
            id: e.id,
            pullDownAction: function() {
                _this.attr("pages", 1);
                // _this.find("li").remove();
                scrollObjArr[i].refresh();
                console.log("slides = " , slides);
                console.log("slides1 = " , slides1);
            },
            pullUpAction: function() {
                if (scrollState) {
                    // var pages = parseInt(_this.attr("pages"));
                    // console.log($(".tabs a").eq(i).attr("tabname"));
                    scrollState = false;
                    setTimeout(function() {
                        console.log("加载...");
                        app.postTabList({type:"slides"});
                        
                        scrollState = true;
                    }, 2000);
                }
            },
            preventDefault: false
        });
        //
        scrolls.options.onBeforeScrollStart = function(event){
        }
        scrollObjArr.push(scrolls);
    });
}
// ****************************** 列表点击事件 ******************************
$("body").on("click",".smart-list-item-info",function(){
    if(!$(this).next().hasClass('active')){
        $(".smart-list-item-sub-info").removeClass("active");
    }
    $(this).next().toggleClass("active").siblings().removeClass("active");
    var tabIndex = $("#wrapper-tabs a.active").index();
    scrollObjArr[tabIndex].refresh();
});
