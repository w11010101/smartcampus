$(function() {
    // 上下拉加载
    var scrollState = true;
    /**
     * [iscroll4.js 上下拉加载]
     * @param  {String}   id             [滑动dom的id]
     * @param  {Function} pullUpAction   [下拉]
     * @param  {Function} pullUpAction   [上拉]
     * @return {Objext}   scrollObj      [返回实例对象]
     */
    var scrollObj = refresher.init({
         id: "wrapper",
        pullDownAction: function() {
            scrollObj.refresh();
        },
        pullUpAction: function() {
          
            if (scrollState) {
                scrollState = false;
                setTimeout(function() {
                    console.log("加载...");
                    // ajaxList({
                    //     wrapper:_this,
                    //     pages:++pages,
                    //     scroll:scrollObj[i],
                    // });
                    
                    $(".smart-list li").remove();
                    for(var i = 0; i<10;i++){
                      $(".smart-list").append(getHtml());
                    }
                    scrollObj.refresh();
                    scrollState = true;
                }, 2000);
            }
        },
        // preventDefault: false
    });
    scrollObj.options.onBeforeScrollStart = function(e) {
        // console.log(e)
    }
});

// 展示无数据 和 重新获取 的点击事件 
function nothing(){
  $(".smart-list-nothing").show(0);
  // 重新获取
  $(".smart-list-nothing").off().on("click","button",function(){
    $(".smart-list-nothing").hide(0);
      ajaxList()
  });
}
// 提示信息 jquery.toast.js
function myTips(val) {
        $.toast({
            text: val,
            allowToastClose: false, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number 
            position: 'bottom-center',
            textAlign: 'center',
            loader: false
        });
    }