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
        console.log("error = " ,data);
    });
    // post tabs
    app.postAjaxData({
        url:'http://172.16.15.99:3001/',
        data:{
          type:"tabs"
        }
    },function (data) {
        // console.log(data);
        app.tabs = data.data;
    },function(err) {
        console.log("error = " ,err);
    });
}
/**
 * [scrollComputed 横向滚动]
 * @param  {[String]} obj    [传#wrapper-new-apps]
 * @param  {[String]} scroll [传#scroller-new-apps]
 * @param  {[Number]} length [数据length]
 * @param  {[Number]} width  [width]
 * @return {[type]}        [description]
 */
function scrollComputed(obj,scroll,length,width) {
    // 计算左右滑动最大宽度
    document.querySelector(scroll).style.width = length * width + "px";
    var myScroll;
    myScroll = new IScroll(obj, {
        scrollX: true,
        scrollY: false,
        mouseWheel: true,
        preventDefault:false
    });
    var wrapper = document.querySelector(obj);
    wrapper.parentElement.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, {
        passive: false
    });
}
// ****************************** swiper start ******************************
function runTabSwiper(){
    // 加载第一个tab里的列表
    app.postTabList();
    // 启动swiper
    var tabsSwiper = new Swiper('.swiper-container', {
        speed: 500,
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
                // 加载列表
            }
        }
    });
    console.log($(".tabs a"));
    $(".tabs a").eq(0).addClass("active");
    // tab点击切换事件
    $(".tabs a").on('click', function(e) {
        e.preventDefault()
        $(".tabs .active").removeClass('active');
        $(this).addClass('active');

        tabsSwiper.swipeTo($(this).index());
        scrollState = true;
    });
}

// ****************************** scroll 事件 ******************************
var scrollObj = [];
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
                _this.find("li").remove();
                scrollObj[i].refresh();
            },
            pullUpAction: function() {
                if (scrollState) {
                    // var pages = parseInt(_this.attr("pages"));
                    // console.log($(".tabs a").eq(i).attr("tabname"));
                    scrollState = false;
                    setTimeout(function() {
                        console.log("加载...");
                        // 加载列表
                        scrollState = true;
                    }, 2000);
                }
            },
            preventDefault: false
        });
        scrollObj.push(scrolls);
    });
}