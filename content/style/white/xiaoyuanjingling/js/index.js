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
                $(".smart-screen-mask").show()
            }
        },
        onSearchStart:function(){
            // console.log("onSearchStart");
        },
        onSearchError:function(){
            // console.log("onSearchError");
        }
        
        // onSelect: function(suggestion) {
        //     alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        // }
    });
    refresher.init({
        id: "wrapper",
        pullDownAction: Refresh,
        pullUpAction: Load
    });
}
// 遮罩层的隐藏
$(".smart-screen-mask").on("click",function(){
    $(this).hide();
})
var generatedCount = 0;
// 下拉刷新
function Refresh() {
    wrapper.refresh();
    // setTimeout(function() {
    //     var el, li, i;
    //     el = document.querySelector("#wrapper ul");
    //     el.innerHTML = '';
    //     for (i = 0; i < 11; i++) {
    //         li = document.createElement('li');
    //         li.appendChild(document.createTextNode('top row ' + (++generatedCount)));
    //         el.insertBefore(li, el.childNodes[0]);
    //     }
    //     wrapper.refresh();
    // }, 1000);
}
// 上拉加载
function Load() {
    setTimeout(function() {
        var li, i;
        for (i = 0; i < 3; i++) {
            li = `<li class="smart-list-item">实验室上网问题？
                     <em class="smart-list-end-icon">
                        <img src="../../content/style/common/images/continue.png" alt="">
                     </em>
                  </li>`;
            $("#wrapper ul").append(li);
        }
        wrapper.refresh();
    }, 1000);
}
// 列表点击
$(".smart-list li").on("click", function() {
    window.location.href = 'chat.html?val='+$(this).text().trim();
})
// 提问分类

