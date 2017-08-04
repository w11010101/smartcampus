// index.html
function scollComputed(){
    function runMyScroll(obj) {
        var myScroll;
        myScroll = new IScroll(obj, {
            // probeType: 3,
            // mouseWheel: true
            scrollX: true,
            scrollY: false,
            mouseWheel: true
        });
        $(obj).parent()[0].addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, {
            passive: false
        });
    }

    // 计算 提问分类 的width；
    var classifyLength = $(".smart-xyjl-classify li").length;
    $("#scroller-1").css("width", classifyLength * 100 + "px");
    runMyScroll('#wrapper-1');
    // 计算 热门活动 的width；
    var activityLength = $(".smart-xyjl-activity li").length;
    $("#scroller-2").css("width", activityLength * 146 + "px");
    runMyScroll('#wrapper-2');
}
// queries
function searchComplete(){
    $('.smart-search-box input ').autocomplete({
        lookup: queries,
        minChars: 2,
        width: "100%",
        appendTo: '#suggestions-container',
        onSearchComplete: function (value,Complete){    
            // 搜索完成        
            if(Complete.length){
                console.log(Complete);
                // 遮罩层显示
                $(".smart-screen-mask").show();
                $(".smart-screen-mask")[0].addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, {
                    passive: false
                });
            }
        },
        onSelect: function(suggestion) {
            console.log(suggestion);
            $(".smart-screen-mask").hide();
            window.location.href = "chat.html?val="+suggestion.value;
        }
    });
    // 监听input keyup
    var searchBtn = $('.smart-search-box input').next();
    var input = $('.smart-search-box input');
    input.on("keyup", function() {
        this.value ? searchBtn.text("搜索") : searchBtn.text("取消");
    });
    // 监听input blur
    // input.on("blur", function() {
    //     this.value ? searchBtn.text("取消") : searchBtn.text("搜索");
    // });

    // 搜索按钮的判断
    $(".smart-search-box button").on("click",function (){

        if(!input.val().length){
            window.location.href = "index.html";
        }else{
            // 显示列表容器
            $(".smart-xyjl-questionsType").show();
            $(".smart-screen-mask").hide();
        }
    })
}
// 遮罩层的隐藏
$(".smart-screen-mask").on("click",function(){
    $(this).hide();
})


// 列表点击
function listClick(){
    $(".smart-list li").off("click").on("click", function() {
        window.location.href = 'chat.html?val='+$(this).text().trim();
    })
}
// 提问分类

