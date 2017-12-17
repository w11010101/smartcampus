// ****************************** swiper start ******************************
var tabsSwiper = new Swiper('.swiper-container', {
    speed: 500,
    onSlideChangeStart: function(event) {
        // 切换tab后触发事件
        // 设置tab切换后样式
        
        let index = tabsSwiper.activeIndex;
        let thisWrapper = $("[id*='wrapper_page_']").eq(index);
        $(".tabs .active").removeClass('active');
        $(".tabs a").eq(index).addClass('active');
        scrollState = true;
        // 判断当前tab内的li 长度，如果没有，则加载；
        if(thisWrapper.find("li").length <=0){
            // 加载列表
            ajaxList({
                wrapper:thisWrapper,   // thisWrapper ：当前iscroll的dom
                pages:1,
                scroll:scrollObj[index],    // 当前tab的滑动对象
            });
        }
    }
})
// tab点击切换事件
$(".tabs a").on('click', function(e) {
    e.preventDefault()
    $(".tabs .active").removeClass('active');
    $(this).addClass('active');
    tabsSwiper.swipeTo($(this).index());
    scrollState = true;
 
})
// $(".tabs a").click(function(e) {
//     e.preventDefault()
// })
// ****************************** scroll start ******************************
// scroll 事件
var scrollObj = [];
var scrollState = true;
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
                var pages = parseInt(_this.attr("pages"));
                scrollState = false;
                console.log($(".tabs a").eq(i).attr("tabname"));
                setTimeout(function() {
                    console.log("加载...");
                    ajaxList({
                        wrapper:_this,
                        pages:++pages,
                        scroll:scrollObj[i],
                    });
                    
                    scrollState = true;
                }, 2000);
            }
        },
        preventDefault: false
    });
    scrollObj.push(scrolls);
});
// 
function ajaxList(option) {
    var last = parseInt(option.wrapper.find("li:last-child .list-num").text() || 0);
    if (option.wrapper.find("li").length < 50) { // 最多加载50条
        // 删除加载中图标
        option.wrapper.find(".smart-loading").remove();
        // 每次加载5条
        for (let i = 1; i < 6; i++) {
            option.wrapper.find("ul").append(html(i + last));
        }
        option.wrapper.attr("pages", option.pages ||1);
        option.scroll.refresh();
    } else {
        console.log("最多加载50条");
        option.scroll.refresh();
    }

}
// 所要加载的列表内容
function html(num) {
    return `<li class="smart-list-item">
                <h3><p>时光隧道</p><em class="list-num ${num>3?'':'list-num-'+num}">${num}</em></h3>
                <h4>史蒂芬 ● 霍金<i>借阅次数：100次</i></h4>
            </li>`;
}
// 加载中
function loading() {
    return '<!-- 加载中 --><div class="smart-loading"><div class="smart-waiting"></div></div>';
}
