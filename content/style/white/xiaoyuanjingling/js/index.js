// index.html
function scollComputed() {
    function runMyScroll(obj) {
        var myScroll;
        myScroll = new IScroll(obj, {
            scrollX: true,
            scrollY: false,
            mouseWheel: true,
            preventDefault:false
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
// autocomplete 自动完成提示；是再body onload里执行；
function searchComplete() {
    $.ajax({
        url: 'http://localhost:3001/',
        data: {
            type:"queries",
            
        },
        type: 'post',
        dataType: 'json'
    }).done(function (data) {
        runAutoconplete(data);
    }).fail(function(err){
        console.log("fail");
        runAutoconplete(queries);
    })
    // 
    function runAutoconplete(data){
        // success 
        console.log(data);
        var queriesArr = $.map(data, function (value, key) { return { value: value, data: key }; }),
            queries = $.map(data, function (value) { return value; });
        var options = {
            lookup: queriesArr,
            minChars: 2,
            maxHeight: 200,
            width: "100%",
            // noCache:true,
            preserveInput: true,
            appendTo: '#scroller-3',
            // 搜索完成后的操作
            onSearchComplete: searchVal,
            // 选择操作
            onSelect: selectVal
        }
        // 创建 autocomplete 组件
        $('.smart-search-box input').autocomplete(options);
        var myScroll3 = new iScroll('wrapper-3',{
                onBeforeScrollStart:function (){
                    myScroll3.refresh(true);
                }
        	});
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        },{
        	passive:false
        });
    }
    
    //输入两个字节后开始查询
    function searchVal(value, Complete) {
        // 搜索完成        
        if (Complete.length) {
            // 遮罩层显示
            $(".smart-screen-mask,.closeBtn").show();
            $("#suggestions-container").css("z-index",3);
            $(".smart-screen-mask")[0].addEventListener('touchmove', function(e) {
                e.preventDefault();
            },{
            	passive:false
            });
        }
    }
    // 选择
    function selectVal(suggestion) { // 选择
        $(".smart-screen-mask,.closeBtn").hide();
        $("#suggestions-container").css("z-index","-1");
        window.location.href = "chat.html?val=" + suggestion.value + "&id=" + (suggestion.data || "");
    }
    
    // 监听input keyup
    var box = $('.smart-search-box');
    var input = box.find("input");
    var searchName = "smart-search-box-search";
    input.on("keyup", function() {
        this.value.length ? box.addClass(searchName) : box.removeClass(searchName);
    });
    // 取消按钮
    box.find(".cancelBtn").on("click", function() {
        if ($("body").hasClass("smart-xyjl-search")) {
            // 如果是 search.html（搜索页），就返回上一页
            window.history.back();

        } else {
            // 否则就隐藏搜索框
            $(".smart-screen-mask,.closeBtn").hide();
            $("#suggestions-container").css("z-index","-1");
			$(".smart-search-box").slideUp(200,function(){
	        	$("#suggestions-container").hide(0);
	        }).next().removeClass("smart-search-container-show");
        }
    })
    // 返回按钮
    box.find(".backBtn").on("click", function() {
        window.history.back();
    })
    // 搜索按钮
    box.find(".searchBtn").on("click", function() {
        if (input.val()) {
            window.location.href = 'chat.html?val=' + input.val().trim();
        }
    });
    // 清空按钮
    box.find(".inputClear").on("click", function() {
        input.val("").focus();
    });

}

// 遮罩层的隐藏
$(".smart-screen-mask,.closeBtn").on("click", function() {
    $(".smart-screen-mask,.closeBtn").hide();
    $("#suggestions-container").css("z-index","-1");
})


// 列表点击
function listClick() {
    $(".smart-list li").off("click").on("click", function() {
        window.location.href = 'chat.html?val=' + $(this).text().trim();
    })
}
