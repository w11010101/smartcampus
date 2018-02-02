/**
 * [postNewApps 页面onload，运行ajax]
 * @return {[type]} [description]
 */
function postList() {
    // 用data.js 中的数据对象；
    // post newApp
    console.log(app);
    app.newApps = newapps.data;
    // post tabs
    app.tabs = tabs.data;
    // 加载第一个tab里的列表
    // app.postTabList({ type: "slides" });
}
// function postList() {
//     // post newApp
//     app.postAjaxData({
//         url: 'http://172.16.15.99:3001/',
//         data: {
//             type: "newapp"
//         }
//     }, function(data) {
//         // console.log(data)
//         app.newApps = data.data
//     }, function(err) {
//         // 用data.js 中的数据对象；
//         app.newApps = newapps.data;
//         console.log("error = ", err);
//     });
//     // post tabs
//     app.postAjaxData({
//         url: 'http://172.16.15.99:3001/',
//         data: {
//             type: "tabs"
//         }
//     }, function(data) {
//         app.tabs = data.data;
//     }, function(err) {
//         // 用data.js 中的数据对象；k
//         app.tabs = tabs.data;
//         console.log("error = ", tabs.data);
//     });
//     // 加载第一个tab里的列表
//     app.postTabList({ type: "slides" });
// }
/**
 * [scrollComputed 横向滚动]
 * @param  {[String]} obj    [传#wrapper-new-apps]
 * @param  {[String]} scroll [传#scroller-new-apps]
 * @param  {[Number]} length [数据length]
 * @param  {[Number]} width  [width]
 * @return {[type]}        [description]
 */
var scrollComputedObjArr = [];

function scrollComputed(obj, scroll, length, width) {
    // 计算左右滑动最大宽度
    document.querySelector(scroll).style.width = length * width + "px";
    var myScroll;
    myScroll = new iScroll(obj, {
        hScrollbar: false,
        onBeforeScrollStart: function(event) {
            // console.log(event.target)
        }
    });
    scrollComputedObjArr.push(myScroll);
    var wrapper = document.querySelector("#" + obj);
    wrapper.parentElement.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, {
        passive: false
    });
}
// ****************************** swiper start ******************************
// tabsSwiperObjArr 选项卡数据集合
var tabsSwiperObjArr = [];
var changState = true;
var tabsSwiper;

function runTabSwiper() {
    // 启动swiper
    var beforeIndex = 0;
    tabsSwiper = new Swiper('.swiper-container', {
        speed: 500,
        moveStartThreshold: 50,
        onSlideChangeStart: function(event) {
            // 切换tab后触发事件
            // 设置tab切换后样式
            var index = tabsSwiper.activeIndex;
            var thisWrapper = $("[id*='wrapper_page_']").eq(index);
            $(".tabs .active").removeClass('active');
            $(".tabs a").eq(index).addClass('active');
            scrollState = true;
            // 判断当前tab内的li 长度，如果没有，则加载；
            if (thisWrapper.find("li").length <= 0) {
                $(".smart-loading").show(0);
                // 加载列表
                if (tabsSwiperObjArr["tab" + index]) {
                    console.log(true);

                } else {
                    console.log(false);
                    app.tabActive = index;
                    app.postTabList({ type: "slides1" });
                }
            }
            // scrollObjArr[index].refresh();
            // 左右滚动
            var x = 0;
            if ($(".tabs .active").offset().left >= app.WinW) {
                // console.log(`当前是第${index}页`);                
                x = -$(".tabs a").width() * (index - 3);
            } else if ($(".tabs .active").offset().left < 0) {
                // console.log(`!当前是第${index}页`);
                x = -$(".tabs a").width() * index;
            }
            $.each(scrollComputedObjArr, function(i, e) {
                if (e.wrapper.id === 'wrapper-tabs') {
                    e.scrollTo(x, 0, 500);
                }
            });
        }
    });
    $(".tabs a").eq(0).addClass("active");
    // tab点击切换事件
    $(".tabs a").on('click', function(e) {
        e.preventDefault();
        $(".tabs .active").removeClass('active');
        $(this).addClass('active');
        tabsSwiper.swipeTo($(this).index(), false);
        scrollState = true;
    });
}

// ****************************** scroll 事件 ******************************
var scrollObjArr = [];
var scrollState = true;

function runWrapperPages() {
    $.each($('[id*="wrapper_page_"]'), function(i, e) {
        var _this = $("#" + e.id);
        // 初始化为每个tab添加滑动的页数
        // _this.attr("pages", 1);
        // 启动页面滑动
        var scrolls = new iScroll(e.id, {
            hScrollbar: false,
            onBeforeScrollStart: function(event) {
                var el = event.target;
                console.log(el)
            }
        });
        var scrollsId = document.querySelector("#" + e.id);
        scrollsId.parentElement.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, {
            passive: false
        });

        scrollObjArr.push(scrolls);
    });
}