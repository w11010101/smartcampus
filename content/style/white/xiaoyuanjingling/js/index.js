// index.html
function scollComputed() {
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
// var queriesArr = $.map(queries, function(value, key) { return { value: value, id: key }; });
// console.log(queriesArr);

function searchComplete() {
    var options = {
        // lookup: queriesArr,
        // lookup:onSource,
        serviceUrl: "http://localhost:3000/",
        type:"POST",
        dataType:"json",
        param:{},
        minChars: 2,
        maxHeight: 200,
        width: "100%",
        noCache:true,
        preserveInput: true,
        appendTo: '#suggestions-container',
        onSearchComplete: searchVal,
        onSelect: selectVal,
        // transformResult:transformResult

    }
    //输入两个字节后开始查询
    function searchVal(value, Complete) {
        console.log(Complete);
        // 搜索完成        
        if (Complete.length) {
            // 遮罩层显示
            $(".smart-screen-mask,.closeBtn").show();
            $(".smart-screen-mask")[0].addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, {
                passive: false
            });
        }
    }
    // function onSource(request, response){
    //     $.ajax({
    //         type:"POST",
    //         url: "http://localhost:3000/queries.json",
    //         dataType: "json",
    //         data: {
    //             // term: request.term
    //         },
    //         success: function(data) {
    //             response(data);
    //         }
    //     });
    // }
    // 不符合数据格式的情况
    function transformResult(response){
        console.log(response);
        return $.map(response.suggestions, function(dataItem) {
            return {value: dataItem.valueField, data: dataItem.dataField};
        });
    }
    // 选择
    function selectVal(suggestion) { // 选择
        $(".smart-screen-mask,.closeBtn").hide();
        window.location.href = "chat.html?val=" + suggestion.value + "&id=" + (suggestion.id || "");
    }
    // 创建 autocomplete 组件
    $('.smart-search-box input').autocomplete(options);


    // $('.smart-search-box input').autocomplete({
    //     width:"100%",
    //     source: onSource,
    //     minLength: 2,
    //     select: selectVal
    // });
    
    
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
            $(".smart-search-container").slideUp(200).removeClass("smart-search-container-show");
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
// 获取data
function getQueries() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/",
        data: {
            "type": "queries"
        },
        dataType: "json",
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.log(err);
        }
    })
}
// 遮罩层的隐藏
$(".smart-screen-mask,.closeBtn").on("click", function() {
    $(".smart-screen-mask,.closeBtn").hide();
})


// 列表点击
function listClick() {
    $(".smart-list li").off("click").on("click", function() {
        window.location.href = 'chat.html?val=' + $(this).text().trim();
    })
}
// 提问分类