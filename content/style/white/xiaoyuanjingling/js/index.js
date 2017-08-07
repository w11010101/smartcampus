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
    var box = $('.smart-search-box');
    var input = box.find("input");
    var searchName = "smart-search-box-search";
    input.on("keyup", function() {
        this.value.length? box.addClass(searchName):box.removeClass(searchName);
    });
    // 取消按钮
    box.find(".cancelBtn").on("click",function (){
        if($("body").hasClass("smart-xyjl-search")){
            // 如果是 search.html（搜索页），就返回上一页
            window.history.back();
        }else{
            // 否则就隐藏搜索框
            $(".smart-screen-mask").hide();
            $(".smart-search-container").slideUp(200).removeClass("smart-search-container-show");
        }
    })
    // 搜索按钮
    box.find(".searchBtn").on("click",function (){
        if(!getUrlVal()){
            // 如果是 search.html（搜索页），发送文本框内容到char.html
            window.location.href = 'chat.html?val='+input.val().trim();
        }else{
            // 否则就隐藏搜索框
            if($("body").hasClass("smart-xyjl-chat")){
                // 当在char.html也是，重新发送问题内容到本页面； 
                window.location.href = 'chat.html?val='+input.val().trim();
            }else{
                // 搜索关键字列表
                $(".smart-xyjl-questionsType").show();
                $(".smart-screen-mask").hide();
                listClick();
            }
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

