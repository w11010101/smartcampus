// ****************************** picker start ******************************
// 向下展开筛选
var picker_list = {
    lang: ["全部", "中文", "外文"],
    date: ["上架一周", "上架一个月", "上架一个季度"],
    time: ["上架日期", "按出版年份", "按书名", "按书号"]
};
var picker;
var pickerBtns = $(".smart-screen div[class^=col-xs]");

pickerBtns.off().on("click", onClick);
// 条件筛选点击事件
function onClick() {

    var type = $(this).attr("setType");
    var index = $(this).index();
    if (!picker) {
        picker = new mui.PopPicker({
            layer: 1,
        });
    }

    // picker.setData： 配置picker插件
    picker.setData(picker_list[type]);
    $(this).toggleClass("smart-active");
    var that = $(this);
    pickerShow(that, index, type);
    state = false;
    // 遮罩层 和 取消按钮 绑定点击事件，取消smart-active样式
    $(".mui-backdrop,.mui-poppicker-btn-cancel").off().on("tap", function() {
        pickerHide();
    });
}
// picker组件显示
function pickerShow(obj, index, type) {
    picker.show(function(items) {
        console.log("items[0] = ", items[0]);
    });
}
// picker组件隐藏
function pickerHide() {
    pickerBtns.removeClass("smart-active");
    state = true;
}
// ****************************** picker end ******************************

// ****************************** scroll start ******************************
// scroll 事件
var scrollState = true;
var scrolls = refresher.init({
    id: "wrapper",
    pullDownAction: function() {

        wrapper.refresh();
    },
    pullUpAction: function() {
        if (scrollState) {
            scrollState = false;
            setTimeout(function() {
                console.log("加载2...");
                // ajaxList({
                //     wrapper: _this,
                //     pates: ++pages,
                //     scroll: scrollObj[i],
                // });
                wrapper.refresh();
                scrollState = true;
            }, 2000);
        }
    },
    preventDefault: false
});