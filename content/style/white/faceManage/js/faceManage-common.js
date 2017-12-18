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
                    ajaxList()
                    // ajaxList({
                    //     wrapper:_this,
                    //     pages:++pages,
                    //     scroll:scrollObj[i],
                    // });
                    scrollObj.refresh();
                    scrollState = true;
                }, 2000);
            }
        },
        // preventDefault: false
    });
    scrollObj.options.onBeforeScrollStart = function(e) {
        console.log(e)
    }
});