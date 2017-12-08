// 横向滚动
scrollPorbe('#wrapper-probe',30);
scrollPorbe('#wrapper-probe-1',30);
function scrollPorbe(obj,n) {
    function runMyScroll(obj,n) {
        var myScroll;
        myScroll = new IScroll(obj, {
            scrollX: true,
            scrollY: false,
            mouseWheel: true,
            preventDefault: false
        });
        $(obj).parent()[0].addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, {
            passive: false
        });
    }; 
    // 计算 提问分类 的width；
    var classifyLength = $(obj + " li").length;
    var classifyWidth = $(obj + " li")[0].offsetWidth;
    $(obj+"> div").css("width", (classifyLength * classifyWidth+ parseInt(n)*(classifyLength-1)) + "px");
    runMyScroll(obj,n);
    //  点击事件
    $(".tushuBtn").off().on("click",onclick);

}

function onclick(){
    alertBox()
}


